import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckSquare, LogOut, LayoutDashboard, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#E8E5F7] shadow-[0_4px_20px_rgba(124,92,255,0.03)] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-xl bg-[#7C5CFF] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(124,92,255,0.3)]">
              <CheckSquare size={20} strokeWidth={2.5} />
            </div>
            <span 
              className="text-2xl font-bold text-[#1E1B4B] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              TaskFlow
            </span>
          </Link>

          {/* Right Action Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-[#1E1B4B] hover:text-[#7C5CFF] px-3 py-2 rounded-xl transition-colors"
                >
                  <LayoutDashboard size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>

                <div className="flex items-center gap-2 bg-[#F3F0FC] border border-[#E8E5F7] rounded-full pl-1.5 pr-3 py-1">
                  <div className="w-7 h-7 rounded-full bg-[#7C5CFF] text-white text-xs font-semibold flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs font-medium text-[#1E1B4B] hidden sm:inline">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6B6396] hover:text-[#1E1B4B] hover:bg-[#F3F0FC] px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  title="Log out"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="text-[#1E1B4B] hover:text-[#7C5CFF] font-medium text-sm sm:text-base px-4 py-2 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-[#7C5CFF] hover:bg-[#6366F1] text-white font-medium text-sm sm:text-base px-5 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(124,92,255,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
