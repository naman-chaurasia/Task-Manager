import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, CheckSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-animated-mesh text-[#1E1B4B] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Soft Floating Lavender Orbs */}
      <div className="absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7C5CFF]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <main className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#7C5CFF] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(124,92,255,0.35)]">
              <CheckSquare size={22} strokeWidth={2.5} />
            </div>
          </Link>

          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1E1B4B] tracking-tight mb-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#6B6396] text-sm md:text-base"
          >
            Join TaskFlow to organize your daily productivity
          </motion.p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_12px_40px_rgba(124,92,255,0.08)] border border-[#E8E5F7]"
        >
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFF5F7] border border-[#FF6B6B]/20 text-[#D93838] text-sm font-medium flex items-center justify-between">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6396]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Naman Chaurasia"
                className="w-full bg-transparent border-b border-[#E8E5F7] focus:border-[#7C5CFF] py-2 text-[#1E1B4B] placeholder-[#6B6396]/40 outline-none transition-colors text-sm"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6396]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="naman@example.com"
                className="w-full bg-transparent border-b border-[#E8E5F7] focus:border-[#7C5CFF] py-2 text-[#1E1B4B] placeholder-[#6B6396]/40 outline-none transition-colors text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6396]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-transparent border-b border-[#E8E5F7] focus:border-[#7C5CFF] py-2 pr-10 text-[#1E1B4B] placeholder-[#6B6396]/40 outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6B6396] hover:text-[#7C5CFF] transition-colors p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6396]">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-transparent border-b border-[#E8E5F7] focus:border-[#7C5CFF] py-2 text-[#1E1B4B] placeholder-[#6B6396]/40 outline-none transition-colors text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7C5CFF] hover:bg-[#6366F1] text-white font-semibold py-3.5 px-6 rounded-2xl shadow-[0_8px_25px_rgba(124,92,255,0.35)] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-[#E8E5F7] text-center">
            <p className="text-sm text-[#6B6396]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#7C5CFF] font-semibold hover:underline decoration-dotted underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
