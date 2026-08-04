# 🚀 TaskFlow — Full-Stack Task Management Application

<div align="center">

**A beautiful, modern task manager built with React (Vite), Express.js, and MongoDB.**  
*Featuring warm editorial design identity, httpOnly cookie authentication, ownership-checked REST endpoints, and smooth micro-interactions.*

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📖 Overview

TaskFlow is a production-ready full-stack task manager app designed with a warm, editorial visual identity. It allows users to securely register, log in, and manage personal daily tasks in real-time.

### ✨ Design System & Visual Identity
- **Typography:** Display & headings in **Fraunces** (Google Font, serif); body text in **Inter** (Google Font, sans-serif).
- **Color Palette:**
  - Background: Warm Ivory (`#FAF7F2`)
  - Cards & Surfaces: Pure White (`#FFFFFF`)
  - Primary / Brand Header: Deep Forest Ink (`#2D3B36`)
  - Accent / CTA: Terracotta (`#E8603C`)
  - Success & Progress Fill: Sage Green (`#7A9B76`)
  - Text Primary: Ink (`#1C1B1A`)
  - Text Muted: Warm Slate (`#6B6560`)
  - Border: Soft Cream (`#E5DFD6`)
- **Micro-Interactions & Animations:**
  - Staggered list entrance/reorder/exit using Framer Motion.
  - Custom Motion checkbox fill animation in Sage Green.
  - Strikethrough & fade transition on task completion.
  - Slide-out + collapse exit animation on task deletion closing gaps smoothly.
  - Animated progress bar fill for daily task completion metrics.

---

## 🔒 Security Features

1. **httpOnly Cookie Auth:** JWT tokens are issued and stored as `httpOnly`, `sameSite` cookies on login/register. Client-side JavaScript cannot read or mutate the token, preventing XSS token theft.
2. **Strict Task Ownership Verification:** Every task update (`PUT /api/tasks/:id`) and deletion (`DELETE /api/tasks/:id`) checks that `task.user === req.userId` before executing.
3. **Password Security:** Hashed with `bcryptjs` (salt rounds: 12).
4. **Rate Limiting:** Auth endpoints (`/api/auth/*`) are protected with `express-rate-limit` to prevent brute-force attacks.
5. **CORS Locking:** Configured with `credentials: true` restricted to deployed frontend origin.

---

## 📡 REST API Reference

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user & set httpOnly cookie | No |
| POST | `/api/auth/login` | Authenticate user & set httpOnly cookie | No |
| GET | `/api/auth/me` | Fetch currently authenticated user profile | Yes |
| POST | `/api/auth/logout` | Clear authentication cookie | Yes |

### Task Routes (`/api/tasks`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/tasks` | Get all tasks for logged-in user | Yes |
| POST | `/api/tasks` | Create a new task for logged-in user | Yes |
| PUT | `/api/tasks/:id` | Update task title, completed status, or category | Yes (Owner) |
| DELETE | `/api/tasks/:id` | Permanently delete task | Yes (Owner) |

---

## ⚙️ Environment Variables

### Server (`server/.env`)
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas URI)

### Quick Start
```bash
# 1. Clone repo
git clone https://github.com/naman-chaurasia/Task-Manager.git
cd Task-Manager

# 2. Setup Server
cd server
npm install
npm run dev

# 3. Setup Client (in a separate terminal)
cd ../client
npm install
npm run dev
```

Visit the app in your browser at `http://localhost:5173`.

---

## 🌐 Deployment Instructions

### Backend (Render)
1. Create a Web Service on Render pointing to your repository `server/` directory.
2. Set Build Command to `npm install` and Start Command to `node src/index.js`.
3. Configure environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL=https://<your-app>.vercel.app`).
4. Set health check path to `/api/health`.

### Frontend (Vercel)
1. Create a Project on Vercel pointing to `client/`.
2. Set Framework Preset to `Vite`.
3. Set environment variable `VITE_API_URL` to your live Render backend URL (`https://<your-render-app>.onrender.com/api`).
4. Deploy!

---

## 📄 License
MIT License © Naman Chaurasia