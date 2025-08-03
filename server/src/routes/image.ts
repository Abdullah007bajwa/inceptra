// server/src/routes/image.ts

import express, { Request, Response } from "express";
import { InferenceClient } from "@huggingface/inference";
import { requireAuth } from "../middleware/clerkAuth.js";
import { prisma } from "../utils/db.js";
import { enforceDailyLimit } from "../middleware/rateLimit.js";
type AuthedRequest = Request & { auth?: { userId?: string } };
const router = express.Router();

if (!process.env.HF_TOKEN) {
  console.warn("⚠️ Hugging Face token (HF_TOKEN) is not set. Image generation will fail.");
}
const hfClient = new InferenceClient(process.env.HF_TOKEN!);

interface ImageGenInput {
  prompt: string;
  style?: string;
  size?: string;
}

// Helper to build prompt
const buildFullPrompt = ({ prompt, style, size }: ImageGenInput): string => {
  let full = prompt.trim();
  if (style) full += `, style: ${style}`;
  if (size) full += `, size: ${size}`;
  return full;
};

// Helper function to convert response to base64
const convertToBase64 = async (response: any): Promise<string> => {
  try {
    // If response is already a string, return it
    if (typeof response === 'string') {
      return response;
    }

    // If response is a Blob or ArrayBuffer, convert to base64
    if (response instanceof Blob) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer.toString('base64');
    }

    // If response is an ArrayBuffer
    if (response instanceof ArrayBuffer) {
      const buffer = Buffer.from(response);
      return buffer.toString('base64');
    }

    // If response has a data property
    if (response && typeof response.data === 'string') {
      return response.data;
    }

    // If response has a buffer property
    if (response && response.buffer) {
      return Buffer.from(response.buffer).toString('base64');
    }

    // If response is an object with base64 property
    if (response && typeof response.base64 === 'string') {
      return response.base64;
    }

    // If response is an object with image property
    if (response && typeof response.image === 'string') {
      return response.image;
    }

    // Log the response structure for debugging
    console.log('Unexpected response format:', typeof response, response);
    throw new Error('Unsupported response format from HuggingFace API');
  } catch (error) {
    console.error('Error converting response to base64:', error);
    throw error;
  }
};

router.post(
  "/",
  requireAuth,
  enforceDailyLimit("image-generator"),
  async (req: Request, res: Response) => {
    const { prompt, style, size } = req.body as ImageGenInput;
    const userId = (req as AuthedRequest).auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID" });
    }

    if (!prompt || prompt.trim().length < 3) {
      return res.status(400).json({ error: "Prompt must be at least 3 characters." });
    }

    const fullPrompt = buildFullPrompt({ prompt, style, size });

    try {
      // Add timeout wrapper for the API call
      const imagePromise = hfClient.textToImage({
        provider: "auto",
        model: "black-forest-labs/FLUX.1-dev",
        inputs: fullPrompt,
        parameters: { num_inference_steps: 5 },
      });

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 60000); // 60s for image generation
      });

      // Race between image generation and timeout
      const imageResponse = await Promise.race([imagePromise, timeoutPromise]);

      // Log the raw response for debugging
      console.log('🧪 Raw HuggingFace response type:', typeof imageResponse);
      console.log('🧪 Raw HuggingFace response:', imageResponse);
      if (imageResponse && typeof imageResponse === 'object') {
        console.log('🧪 Response object keys:', Object.keys(imageResponse));
        console.log('🧪 Response object prototype:', Object.getPrototypeOf(imageResponse));
      }

      // Convert response to base64
      const imageBase64 = await convertToBase64(imageResponse);

      // Validate base64 string
      if (!imageBase64 || imageBase64.length === 0) {
        throw new Error('Empty or invalid image data received');
      }

      console.log('🧪 Converted base64 length:', imageBase64.length);
      console.log('🧪 Base64 preview:', imageBase64.substring(0, 100));

      await prisma.generationHistory.create({
        data: {
          userId,
          feature: "image-generator",
          input: { prompt, style, size },
          output: { image: imageBase64 },
        },
      });

      console.log(`✅ Image generated for user: ${userId}`);
      return res.json({ image: imageBase64 });

    } catch (err: any) {
      console.error("🧨 Image generation failed:", err?.response?.data || err.message || err);
      
      // Provide user-friendly error messages
      let errorMessage = "Image generation failed";
      if (err.message === "Request timeout") {
        errorMessage = "Image generation timed out. Please try again.";
      } else if (err?.response?.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again later.";
      } else if (err.message.includes('Unsupported response format')) {
        errorMessage = "Image generation service temporarily unavailable.";
      }

      return res.status(500).json({
        error: errorMessage,
      });
    }
  }
);

export default router;
