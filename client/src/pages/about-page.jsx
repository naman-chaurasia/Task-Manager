import React from "react";
import Navbar from "../components/layout/navbar.jsx";
import Footer from "../components/layout/footer.jsx";
import { CheckSquare, Github, Mail, Code, Database, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6FE] text-[#1E1B4B]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl sm:text-5xl font-extrabold text-[#1E1B4B] tracking-tight mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            About TaskFlow
          </h1>
          <p className="text-lg text-[#6B6396] max-w-xl mx-auto">
            A daily task management application designed for calm productivity, clear aesthetics, and responsive performance.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8E5F7] shadow-[0_10px_35px_rgba(124,92,255,0.06)]">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-center md:text-left">
              <div className="w-20 h-20 rounded-2xl bg-[#7C5CFF] text-white text-2xl font-bold flex items-center justify-center mx-auto md:mx-0 mb-4 shadow-[0_4px_14px_rgba(124,92,255,0.35)]">
                NC
              </div>
              <h3 className="text-2xl font-bold text-[#1E1B4B] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                Naman Chaurasia
              </h3>
              <p className="text-[#7C5CFF] font-semibold text-sm mb-4">Full Stack Software Developer</p>
              <p className="text-[#6B6396] text-sm leading-relaxed mb-6">
                Passionate software developer specializing in React, Node.js, Express, and MongoDB. Dedicated to building clean, accessible, and responsive user experiences.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm">
                <a 
                  href="https://github.com/naman-chaurasia/Task-Manager" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#F3F0FC] text-[#7C5CFF] font-semibold rounded-xl border border-[#E8E5F7] hover:bg-[#7C5CFF] hover:text-white transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
                <a 
                  href="mailto:naman.chaurasia0311@gmail.com" 
                  className="flex items-center gap-2 px-4 py-2 bg-[#F3F0FC] text-[#7C5CFF] font-semibold rounded-xl border border-[#E8E5F7] hover:bg-[#7C5CFF] hover:text-white transition-colors"
                >
                  <Mail size={16} />
                  <span>Email Contact</span>
                </a>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="bg-[#F8F6FE] p-5 rounded-2xl border border-[#E8E5F7]">
                <h4 className="font-bold text-[#1E1B4B] mb-1 flex items-center gap-2">
                  <Code size={18} className="text-[#7C5CFF]" />
                  Frontend Architecture
                </h4>
                <p className="text-xs text-[#6B6396]">
                  React (Vite), Tailwind CSS, Framer Motion, Axios, 3D Particle Canvas
                </p>
              </div>

              <div className="bg-[#F8F6FE] p-5 rounded-2xl border border-[#E8E5F7]">
                <h4 className="font-bold text-[#1E1B4B] mb-1 flex items-center gap-2">
                  <Database size={18} className="text-[#7C5CFF]" />
                  Backend Architecture
                </h4>
                <p className="text-xs text-[#6B6396]">
                  Node.js, Express.js, MongoDB Atlas, Mongoose, JWT httpOnly cookies
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}