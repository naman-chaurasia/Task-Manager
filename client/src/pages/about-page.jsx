import { CheckSquare, Github, Mail, ExternalLink, Code, Database, Smartphone, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1B1A]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3B36]" style={{ fontFamily: "'Fraunces', serif" }}>
            About TaskFlow
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-[#6B6560] mb-8 max-w-2xl mx-auto">
          A focused daily task management application designed to bring calm productivity, elegant aesthetics, and clear task organization.
        </p>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#E8603C] hover:bg-[#d05230] text-white font-medium py-3 px-6 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Go to Dashboard
          </button>
        </div>
      </section>

      {/* Developer Section */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl border border-[#E5DFD6] p-8 md:p-12 shadow-[0_4px_20px_rgba(45,59,54,0.04)]">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-[#2D3B36] text-white text-2xl font-bold flex items-center justify-center mx-auto md:mx-0 mb-4 shadow-sm">
                NC
              </div>
              <h3 className="text-2xl font-bold text-[#2D3B36] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                Naman Chaurasia
              </h3>
              <p className="text-[#E8603C] font-medium text-sm mb-4">Full Stack Software Developer</p>
              <p className="text-[#6B6560] text-sm leading-relaxed mb-6">
                Passionate software developer specializing in React, Node.js, Express, and MongoDB. Focused on clean architecture, security, and responsive UI design.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm">
                <a 
                  href="https://github.com/naman-chaurasia/Task-Manager" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#FAF7F2] border border-[#E5DFD6] rounded-xl hover:border-[#2D3B36] transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </a>
                <a 
                  href="mailto:naman.chaurasia0311@gmail.com" 
                  className="flex items-center gap-2 px-4 py-2 bg-[#FAF7F2] border border-[#E5DFD6] rounded-xl hover:border-[#2D3B36] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E5DFD6]">
                <h4 className="font-semibold text-[#2D3B36] mb-1 flex items-center gap-2">
                  <Code className="h-4 w-4 text-[#E8603C]" />
                  Frontend Stack
                </h4>
                <p className="text-xs text-[#6B6560]">
                  React (Vite), React Router, Tailwind CSS, Framer Motion, Axios
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E5DFD6]">
                <h4 className="font-semibold text-[#2D3B36] mb-1 flex items-center gap-2">
                  <Database className="h-4 w-4 text-[#7A9B76]" />
                  Backend Stack
                </h4>
                <p className="text-xs text-[#6B6560]">
                  Node.js, Express.js, MongoDB, Mongoose, JWT httpOnly cookies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}