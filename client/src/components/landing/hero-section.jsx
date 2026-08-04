import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-animated-mesh">
      {/* Soft Ambient Lavender Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C5CFF]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#F3F0FC] border border-[#E8E5F7] text-[#7C5CFF] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm"
        >
          <Sparkles size={14} />
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
          Organize your tasks. <br className="hidden sm:inline" />
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
          TaskFlow helps you manage your daily tasks, set priorities, and achieve your goals with a calm, beautiful lavender interface. No hidden costs, no limitations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
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
            <span>Learn More</span>
          </Link>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-[#E8E5F7]"
        >
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#E8E5F7] shadow-[0_4px_15px_rgba(124,92,255,0.04)] text-center">
            <div className="text-2xl font-bold text-[#1E1B4B]">10K+</div>
            <div className="text-xs text-[#6B6396] font-medium mt-0.5">Active Focusers</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#E8E5F7] shadow-[0_4px_15px_rgba(124,92,255,0.04)] text-center">
            <div className="text-2xl font-bold text-[#7C5CFF]">1M+</div>
            <div className="text-xs text-[#6B6396] font-medium mt-0.5">Tasks Completed</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#E8E5F7] shadow-[0_4px_15px_rgba(124,92,255,0.04)] text-center">
            <div className="text-2xl font-bold text-[#1E1B4B]">100%</div>
            <div className="text-xs text-[#6B6396] font-medium mt-0.5">Free Forever</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
