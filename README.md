# 🚀 Inceptra AI - Full-Stack AI Creation Platform

A modern, production-ready AI platform built with React, Node.js, and TypeScript. Features intelligent content generation, image creation, background removal, and resume analysis with robust error handling and fallback systems.

**🌐 Live Demo:** [https://frontend-lake-zeta-90.vercel.app/](https://frontend-lake-zeta-90.vercel.app/)  
**🔧 API Endpoint:** [https://inceptra-server.onrender.com/](https://inceptra-server.onrender.com/)

![Inceptra AI](https://img.shields.io/badge/Inceptra-AI%20Platform-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Production](https://img.shields.io/badge/Production-Ready-green?style=for-the-badge&logo=vercel)

## ✨ Features

### 🤖 AI-Powered Tools
- **Article Generator** - Create engaging blog posts with multiple AI models and fallback systems
- **Image Generator** - Generate stunning visuals from text prompts with style customization
- **Background Remover** - Remove backgrounds from images with advanced segmentation
- **Resume Analyzer** - Get professional feedback and insights on your resume

### 🔐 Security & Authentication
- **Clerk Integration** - Secure JWT-based authentication
- **Protected Routes** - Role-based access control
- **Rate Limiting** - Daily usage limits for free users
- **CORS Protection** - Multi-origin support with security

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - Theme switching with system preference detection
- **Real-time Feedback** - Progress indicators and loading states
- **Error Handling** - User-friendly error messages and retry mechanisms

### ⚡ Performance & Reliability
- **Fallback Systems** - Multiple AI models for high availability
- **Timeout Management** - Configurable timeouts for all operations
- **Memory Optimization** - Efficient image handling and cleanup
- **Graceful Degradation** - Service continues working even if some features fail

## 🏗️ Architecture

```
inceptra/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── lib/            # API and utilities
│   │   └── hooks/          # Custom React hooks
│   └── public/             # Static assets
├── server/                  # Node.js + Express backend
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth and rate limiting
│   │   ├── utils/          # Database and utilities
│   │   └── types/          # TypeScript definitions
│   └── prisma/             # Database schema and migrations
└── docs/                   # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **HuggingFace** - AI model inference
- **Clerk** - Authentication service
- **Sharp** - Image processing

### DevOps & Tools
- **pnpm** - Fast package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm
- PostgreSQL database
- HuggingFace API token
- Clerk account

### 1. Clone Repository
```bash
git clone <repository-url>
cd inceptra
```

### 2. Install Dependencies
```bash
# Install root dependencies
pnpm install

# Install frontend dependencies
cd frontend
pnpm install

# Install backend dependencies
cd ../server
pnpm install
```

### 3. Environment Setup

**Frontend (`frontend/.env`):**
```env
# Development
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
VITE_CLIENT_URL=http://localhost:5173

# Production
# VITE_API_BASE_URL=https://inceptra-server.onrender.com/api
# VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_key_here
# VITE_CLIENT_URL=https://frontend-lake-zeta-90.vercel.app
```

**Backend (`server/.env`):**
```env
# Development
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Production
# PORT=10000
# NODE_ENV=production
# CLIENT_URL=https://frontend-lake-zeta-90.vercel.app

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/inceptra"

# Authentication
CLERK_SECRET_KEY=sk_test_your_clerk_secret_here

# AI Services
HF_TOKEN=your_huggingface_token_here

# Payment (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 4. Database Setup
```bash
cd server
npx prisma generate
npx prisma db push
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
pnpm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
pnpm run dev
```

Visit `http://localhost:5173` to see the application!

**🌐 Or check out the live demo:** [https://frontend-lake-zeta-90.vercel.app/](https://frontend-lake-zeta-90.vercel.app/)

## 📡 API Endpoints

### Authentication Required
All endpoints require a valid JWT token in the `Authorization: Bearer <token>` header.

### Article Generation
```http
POST /api/article
Content-Type: application/json

{
  "title": "Your Article Title",
  "length": "medium" // short, medium, long
}
```

### Image Generation
```http
POST /api/image
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains",
  "style": "realistic", // realistic, artistic, cartoon
  "size": "1024x1024" // 512x512, 1024x1024, 1024x768
}
```

### Background Removal
```http
POST /api/bg-remove
Content-Type: multipart/form-data

FormData: image file
```

### Resume Analysis
```http
POST /api/resume
Content-Type: multipart/form-data

FormData: PDF file
```

### History & Usage
```http
GET /api/history?limit=20&page=1
GET /api/history/usage
```

## 🔧 Configuration

### Timeout Settings
The application uses configurable timeouts for different operations:

- **Article Generation**: 45s primary, 40s secondary, 35s tertiary
- **Image Generation**: 90s primary, 75s secondary, 60s tertiary  
- **Resume Analysis**: 45s primary, 40s secondary, 35s tertiary
- **Background Removal**: 180s (3 minutes)
- **Frontend Requests**: 120s (2 minutes)

### Rate Limiting
Free users have daily limits:
- Article Generator: 10 articles/day
- Image Generator: 10 images/day
- Background Remover: 10 images/day
- Resume Analyzer: 10 analyses/day

### CORS Configuration
The server accepts requests from:
- **Production**: `https://frontend-lake-zeta-90.vercel.app`
- **Development**: `http://localhost:5173`, `http://127.0.0.1:5173`
- **Custom**: Any origin specified in `CLIENT_URL`

## 🎯 Key Features

### Fallback Systems
All AI operations use multiple models with automatic fallback:
1. **Primary Model** - Best quality, longer timeout
2. **Secondary Model** - Good quality, medium timeout
3. **Tertiary Model** - Basic quality, shorter timeout

### Error Handling
- **Timeout Recovery** - Automatic retry with different models
- **Rate Limit Handling** - User-friendly messages and retry suggestions
- **Network Resilience** - Graceful degradation on connection issues
- **Input Validation** - Comprehensive validation with helpful error messages

### Performance Optimizations
- **Image Compression** - Automatic resizing and compression
- **Memory Management** - Object URL cleanup and garbage collection
- **Caching** - React Query for efficient data fetching
- **Lazy Loading** - Component and route-based code splitting

## 🚀 Deployment

### Production URLs
- **Frontend**: [https://frontend-lake-zeta-90.vercel.app/](https://frontend-lake-zeta-90.vercel.app/)
- **Backend API**: [https://inceptra-server.onrender.com/](https://inceptra-server.onrender.com/)

### Frontend (Vercel)
```bash
cd frontend
pnpm run build
# Deploy dist/ folder to Vercel
```

### Backend (Render)
```bash
cd server
pnpm run build
# Deploy with environment variables to Render
```

### Environment Variables for Production
**Frontend (Vercel):**
```env
VITE_API_BASE_URL=https://inceptra-server.onrender.com/api
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_key_here
VITE_CLIENT_URL=https://frontend-lake-zeta-90.vercel.app
```

**Backend (Render):**
```env
PORT=10000
NODE_ENV=production
CLIENT_URL=https://frontend-lake-zeta-90.vercel.app
CLERK_SECRET_KEY=sk_live_your_clerk_key_here
DATABASE_URL=your_postgresql_connection_string
HF_TOKEN=your_huggingface_token_here
```

### Database
- Use managed PostgreSQL service (Railway, Supabase, etc.)
- Run migrations: `npx prisma db push`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test all features before submitting PRs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Live Demo**: [https://frontend-lake-zeta-90.vercel.app/](https://frontend-lake-zeta-90.vercel.app/)
- **API Status**: [https://inceptra-server.onrender.com/](https://inceptra-server.onrender.com/)
- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join community discussions on GitHub
- **Email**: Contact the development team

## 🔮 Roadmap

- [ ] **Advanced Analytics** - Usage tracking and insights
- [ ] **Team Collaboration** - Shared workspaces and permissions
- [ ] **API Rate Limiting** - Advanced quota management
- [ ] **Mobile App** - React Native companion app
- [ ] **Plugin System** - Extensible architecture
- [ ] **Real-time Features** - WebSocket integration
- [ ] **Advanced AI Models** - Custom fine-tuned models

---

Open an issue or contact the dev team via abdullah.bajwa.co@gmail.com.
---
**Built with ❤️ by the Inceptra Team**
