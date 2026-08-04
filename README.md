# 💜 TaskFlow — Full-Stack Task Management Application

<div align="center">

**A state-of-the-art Task Management web application built with React (Vite), Express.js, and MongoDB Atlas.**  
*Featuring an elegant Lavender & Pure White visual architecture, 3D Particle Canvas Background, 3D MacBook Scroll Showcase, Circular SVG Analytics Progress Chart, Interactive 3-Column Kanban Board, and httpOnly cookie authentication.*

[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

TaskFlow is a production-ready, full-stack productivity web application designed with a serene, modern **Lavender & Pure White** visual architecture. It empowers users to track, organize, and manage daily goals with high-contrast readability, 3D dynamic backgrounds, and real-time interactive views.

---

## ✨ Features & Architecture Highlights

### 🎨 1. Lavender & Pure White Design Architecture
- **60% Dominance (Pure White `#FFFFFF`):** Applied to content cards, forms, and containers for an airy physical depth.
- **30% Structure (Soft Lavender `#F3F0FC` / `#F8F6FE`):** Used for subtle section background tints and UI containers.
- **10% Action Accent (Vibrant Lavender `#7C5CFF`):** Applied to primary CTAs, active status indicators, progress rings, and brand accents.
- **High-Contrast Readability (Deep Purple `#1E1B4B` & `#6B6396`):** Enforces WCAG 2.1 AA accessibility for text readability without harsh pure black.

### 🌌 2. Interactive 3D Canvas Background & 3D MacBook Showcase
- **3D Particle Canvas (`ThreeParticles.jsx`):** Interactive 3D particle mesh that floats and reacts dynamically to user cursor movements.
- **3D MacBook Scroll Showcase (`macbook-scroll.jsx`):** 3D laptop model that tilts and scrolls dynamically to display the live dashboard.

### 📊 3. Circular SVG Analytics Chart & 3-Column Kanban Board
- **Circular Progress Ring:** SVG animated circular progress chart calculating real-time task completion percentage.
- **3-Column Kanban Board:** Organize tasks into **To Do**, **In Progress**, and **Completed** columns with 1-click status transitions.
- **Animated List View:** Staggered list entrances, custom check mark fills, and smooth slide-out deletion transitions via Framer Motion.
- **Task Archiving & Filters:** Search bar, category filters (*Work, Personal, Shopping, Health, General*), and task archiving capabilities.

---

## 🔒 Security Features

1. **httpOnly Cookie Authentication:** JWT tokens are issued and stored as `httpOnly`, `SameSite: None`, `Secure` cookies to protect against XSS token theft.
2. **Strict Ownership Verification:** Task CRUD endpoints verify that `task.user === req.userId` before modifying data.
3. **Password Hashing:** Passwords secured with `bcryptjs` (salt rounds: 12).
4. **Rate Limiting:** Auth routes (`/api/auth/*`) protected with `express-rate-limit`.

---

## 📡 REST API Reference

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user & issue httpOnly cookie | No |
| POST | `/api/auth/login` | Authenticate user & issue httpOnly cookie | No |
| GET | `/api/auth/profile` | Fetch logged-in user profile | Yes |
| POST | `/api/auth/logout` | Clear authentication cookie | Yes |

### Task Endpoints (`/api/tasks`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/tasks` | Get all tasks for logged-in user | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update task title, status, category, or archiving | Yes (Owner) |
| DELETE | `/api/tasks/:id` | Delete task permanently | Yes (Owner) |

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🚀 Local Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/naman-chaurasia/Task-Manager.git
cd Task-Manager

# 2. Setup & Start Backend Server
cd server
npm install
npm run dev

# 3. Setup & Start Frontend (in a new terminal window)
cd ../client
npm install
npm run dev
```

Visit the app at `http://localhost:5173`.

---

## 🌐 Live Deployment Setup

- **Backend (Render):** Deploy `server/` as a Web Service. Set environment variables `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`. Set Health Check path to `/api/health`.
- **Frontend (Vercel):** Deploy `client/` as a Vite project. Set environment variable `VITE_API_URL` to your live Render backend URL (`https://<your-render-app>.onrender.com/api`).

---

## 👨‍💻 Author

**Naman Chaurasia**
- **GitHub:** [@naman-chaurasia](https://github.com/naman-chaurasia)
- **Email:** `naman.chaurasia0311@gmail.com`

---

## 📄 License

Licensed under the MIT License © Naman Chaurasia