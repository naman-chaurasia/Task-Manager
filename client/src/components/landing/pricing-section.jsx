import React from "react";
import { Link } from "react-router-dom";
import { Check, Star, Zap, Shield, Smartphone } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 bg-[#F3F0FC] text-[#7C5CFF] text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <Star size={14} />
          <span>100% Free Forever</span>
        </div>

        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1B4B] tracking-tight mb-4"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          No premium tiers. No paywalls.
        </h2>

        <p className="text-base sm:text-lg text-[#6B6396] max-w-xl mx-auto mb-12">
          Everything you need to organize your daily tasks is completely free.
        </p>

        <div className="bg-[#F8F6FE] rounded-3xl p-8 sm:p-12 border border-[#E8E5F7] shadow-[0_10px_30px_rgba(124,92,255,0.06)] relative overflow-hidden">
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-5xl font-extrabold text-[#1E1B4B]" style={{ fontFamily: "'Fraunces', serif" }}>$0</span>
            <span className="text-[#6B6396] font-medium text-lg">/ forever</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
            {[
              "Unlimited tasks and categories",
              "Real-time task completion statistics",
              "Priority levels & category tags",
              "httpOnly cookie JWT security",
              "Framer Motion staggered list animations",
              "100% Mobile responsive layout"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E8E5F7]">
                <div className="w-5 h-5 rounded-full bg-[#7C5CFF] text-white flex items-center justify-center text-xs flex-shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-[#1E1B4B]">{item}</span>
              </div>
            ))}
          </div>

          <Link
            to="/register"
            className="inline-block bg-[#7C5CFF] hover:bg-[#6366F1] text-white font-semibold py-4 px-10 rounded-2xl shadow-[0_8px_25px_rgba(124,92,255,0.35)] transition-all hover:scale-[1.02]"
          >
            Create Your Free Account
          </Link>
        </div>
      </div>
    </section>
  );
}
