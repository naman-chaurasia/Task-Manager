import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckSquare } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-animated-mesh border-t border-[#E8E5F7]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#7C5CFF] text-white flex items-center justify-center mx-auto mb-6 shadow-[0_8px_25px_rgba(124,92,255,0.35)]">
          <CheckSquare size={32} />
        </div>

        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1B4B] tracking-tight mb-4"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Ready to boost your <span className="text-[#7C5CFF]">productivity</span>?
        </h2>

        <p className="text-base sm:text-lg text-[#6B6396] max-w-xl mx-auto mb-8">
          Join users who have transformed their task management with TaskFlow. Start organizing your daily focus today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-[#7C5CFF] hover:bg-[#6366F1] text-white font-semibold py-4 px-8 rounded-2xl shadow-[0_8px_25px_rgba(124,92,255,0.35)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-base"
          >
            <span>Get Started Free</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <p className="text-xs text-[#6B6396] mt-6">
          No credit card required • 100% Free • Secure httpOnly cookies
        </p>
      </div>
    </section>
  );
}
