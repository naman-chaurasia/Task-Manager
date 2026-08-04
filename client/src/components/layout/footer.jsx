import React from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Github, Mail, Home, LayoutDashboard, Info, UserPlus, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F8F6FE] border-t border-[#E8E5F7] text-[#1E1B4B] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E5F7] shadow-[0_10px_35px_rgba(124,92,255,0.06)] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Brand & Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7C5CFF] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(124,92,255,0.3)]">
                  <CheckSquare size={20} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold text-[#1E1B4B]" style={{ fontFamily: "'Fraunces', serif" }}>
                  TaskFlow
                </span>
                <span className="text-xs bg-[#F3F0FC] text-[#7C5CFF] border border-[#E8E5F7] px-2.5 py-0.5 rounded-full font-semibold">
                  Beta
                </span>
              </div>

              <p className="text-sm text-[#6B6396] leading-relaxed max-w-sm">
                Empowering individuals with a comprehensive platform for task management, productivity tracking, and collaborative planning.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/naman-chaurasia/Task-Manager"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-[#F3F0FC] text-[#7C5CFF] border border-[#E8E5F7] hover:bg-[#7C5CFF] hover:text-white transition-all"
                >
                  <Github size={14} />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </div>

            {/* Middle Column: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="text-[#6B6396] hover:text-[#7C5CFF] transition-colors flex items-center gap-2">
                    <Home size={15} />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-[#6B6396] hover:text-[#7C5CFF] transition-colors flex items-center gap-2">
                    <LayoutDashboard size={15} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-[#6B6396] hover:text-[#7C5CFF] transition-colors flex items-center gap-2">
                    <Info size={15} />
                    <span>About</span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-[#6B6396] hover:text-[#7C5CFF] transition-colors flex items-center gap-2">
                    <UserPlus size={15} />
                    <span>Sign Up</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Column: Connect */}
            <div>
              <h4 className="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider mb-4">
                Connect
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://github.com/naman-chaurasia/Task-Manager"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#6B6396] hover:text-[#7C5CFF] transition-colors flex items-center gap-2"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                    <ExternalLink size={12} className="ml-auto opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:naman.chaurasia0311@gmail.com"
                    className="text-[#6B6396] hover:text-[#7C5CFF] transition-colors flex items-center gap-2"
                  >
                    <Mail size={15} />
                    <span>Email</span>
                    <ExternalLink size={12} className="ml-auto opacity-50" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8E5F7] flex flex-col sm:flex-row justify-between items-center text-xs text-[#6B6396] gap-4">
            <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-[#7C5CFF] transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-[#7C5CFF] transition-colors">Terms of Service</Link>
            </div>
            <p className="flex items-center gap-1">
              Crafted with <Heart size={12} className="text-[#7C5CFF] fill-[#7C5CFF]" /> by <span className="font-semibold text-[#1E1B4B]">Naman Chaurasia</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
