import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, CheckSquare } from "lucide-react";
import { MacbookScroll } from "./macbook-scroll.jsx";
import dashboardPreview from "../../assets/image.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 bg-animated-mesh">
      {/* Soft Ambient Floating Lavender Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7C5CFF]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#7C5CFF] text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 shadow-[0_4px_14px_rgba(124,92,255,0.35)]"
        >
          <Star size={14} className="fill-white" />
          <span>Completely Free Forever</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#1E1B4B] tracking-tight leading-[1.15] mb-6"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Organize your tasks.{" "}
          <span className="text-[#7C5CFF] bg-clip-text text-transparent bg-gradient-to-r from-[#7C5CFF] to-[#6366F1]">
            Boost productivity.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#6B6396] leading-relaxed mb-8"
        >
          TaskFlow helps you manage your daily tasks, set priorities, and achieve your goals with a beautiful and intuitive interface. No hidden costs, no limitations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto bg-[#7C5CFF] hover:bg-[#6366F1] text-white font-semibold py-4 px-8 rounded-2xl shadow-[0_8px_25px_rgba(124,92,255,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-base"
          >
            <span>Get Started Free</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto bg-white border border-[#E8E5F7] hover:border-[#7C5CFF] text-[#1E1B4B] font-semibold py-4 px-8 rounded-2xl shadow-sm hover:shadow-[0_4px_20px_rgba(124,92,255,0.08)] transition-all flex items-center justify-center gap-2 text-base"
          >
            <Heart size={18} className="text-[#7C5CFF]" />
            <span>Learn More</span>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm text-[#6B6396] mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1E1B4B] text-lg">10K+</span>
            <span>Active Users</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#7C5CFF] text-lg">1M+</span>
            <span>Tasks Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1E1B4B] text-lg">100%</span>
            <span>Free Forever</span>
          </div>
        </motion.div>
      </div>

      {/* 3D Macbook Scroll Demo Section */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-4">
        <div className="rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-[#E8E5F7] shadow-[0_20px_50px_rgba(124,92,255,0.08)] p-2 sm:p-6">
          <MacbookScroll
            title={
              <span className="text-[#1E1B4B] text-2xl sm:text-4xl font-bold tracking-tight">
                TaskFlow: Modern Task Management for Everyone.<br />
                Built with ❤️ using Tailwind CSS.
              </span>
            }
            badge={
              <div className="h-12 w-12 -rotate-12 transform flex items-center justify-center bg-[#7C5CFF] rounded-2xl shadow-xl border-4 border-white text-white">
                <CheckSquare size={26} strokeWidth={2.5} />
              </div>
            }
            src={dashboardPreview}
            showGradient={false}
          />
        </div>
      </div>
    </section>
  );
}
