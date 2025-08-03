# 🚀 Inceptra AI - Advanced AI Creation Platform

A full-stack monorepo containing the complete Inceptra AI platform with React frontend and Express backend, featuring AI-powered article generation, image creation, background removal, and resume analysis.

## 🏗️ Project Structure

```
inceptra/
├── frontend/                 # React + Vite frontend (Port 5173)
│   ├── src/
│   │   ├── components/       # UI components & layouts
│   │   ├── pages/           # Route pages
│   │   ├── lib/             # API utilities
│   │   └── main.tsx         # Entry point
│   └── package.json         # Frontend dependencies
├── server/                  # Express + TypeScript backend (Port 5000)
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & rate limiting
│   │   ├── utils/           # Database & utilities
│   │   └── server.ts        # Main server file
│   ├── prisma/              # Database schema & migrations
│   └── package.json         # Backend dependencies
└── package.json             # Root workspace configuration
```

## ✨ Features

- **🤖 AI Article Generator** - Create compelling articles from titles
- **🎨 AI Image Generator** - Generate stunning visuals from text prompts
- **✂️ Background Remover** - Remove backgrounds from images instantly
- **📄 Resume Analyzer** - Get AI-powered resume insights and recommendations
- **🔐 Secure Authentication** - Powered by Clerk
- **📊 Usage Tracking** - Monitor daily API usage and limits
- **📱 Responsive Design** - Works on all devices
- **🌙 Dark/Light Mode** - Beautiful UI with theme support

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** + SWC for fast builds
- **Tailwind CSS** + shadcn/ui components
- **Clerk** for authentication
- **TanStack React Query** for data fetching
- **Axios** for API communication

### Backend
- **Express.js** + TypeScript
- **Prisma ORM** with PostgreSQL
- **Clerk Backend** for authentication
- **HuggingFace Inference** for AI services
- **Sharp** for image processing
- **Multer** for file uploads

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd inceptra
pnpm install
```

### 2. Environment Setup

#### Frontend Environment
```bash
cd frontend
cp env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
VITE_CLIENT_URL=http://localhost:5173
```

#### Backend Environment
```bash
cd server
cp env.example .env
```

Edit `server/.env`:
```env
CLIENT_URL=http://localhost:5173
HF_TOKEN=your_huggingface_token_here
DATABASE_URL=your_database_url_here
CLERK_SECRET_KEY=your_clerk_secret_here
```

### 3. Database Setup
```bash
cd server
npx prisma generate
npx prisma db push
```

### 4. Start Development Servers

#### Terminal 1 - Backend
```bash
cd server
pnpm run dev
```
Server runs on: http://localhost:5000

#### Terminal 2 - Frontend
```bash
cd frontend
pnpm run dev
```
Frontend runs on: http://localhost:5173

## 🔧 Development

### Available Scripts

#### Frontend
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

#### Backend
- `pnpm run dev` - Start development server with nodemon
- `pnpm run build` - Build TypeScript
- `pnpm run start` - Start production server

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/article` | Generate articles |
| `POST` | `/api/image` | Generate images |
| `POST` | `/api/bg-remove` | Remove image backgrounds |
| `POST` | `/api/resume` | Analyze resumes |
| `GET` | `/api/history` | Get generation history |
| `GET` | `/api/history/usage` | Get usage statistics |

## 🔐 Authentication

The platform uses **Clerk** for authentication:
- JWT-based authentication
- Protected routes and API endpoints
- User session management
- Automatic token refresh

## 📊 Database Schema

The application uses **PostgreSQL** with **Prisma ORM**:

### Main Tables
- `User` - User accounts and preferences
- `GenerationHistory` - Track all AI generations
- Rate limiting and usage tracking

## 🎯 Environment Variables

### Required Services
1. **Clerk** - Authentication service
2. **HuggingFace** - AI inference API
3. **PostgreSQL** - Database
4. **Stripe** - Payments (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email abdullah.bajwa.co@gmail.com or open an issue in the repository.

---

**Built with ❤️ by the Inceptra Team**
