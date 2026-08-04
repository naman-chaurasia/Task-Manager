import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1B1A] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Soft Ambient Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2D3B36]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#E8603C]/10 rounded-full blur-3xl"></div>
      </div>

      <main className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-serif text-4xl md:text-5xl font-bold text-[#2D3B36] tracking-tight mb-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            TaskFlow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#6B6560] text-sm md:text-base"
          >
            Create your account to start managing tasks
          </motion.p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgb(45,59,54,0.06)] border border-[#E5DFD6]"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#FFF5F2] border border-[#E8603C]/20 text-[#E8603C] text-sm flex items-center justify-between">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6560]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-transparent border-b border-[#2D3B36]/30 focus:border-[#E8603C] py-2 text-[#1C1B1A] placeholder-[#6B6560]/40 outline-none transition-colors text-sm"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6560]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full bg-transparent border-b border-[#2D3B36]/30 focus:border-[#E8603C] py-2 text-[#1C1B1A] placeholder-[#6B6560]/40 outline-none transition-colors text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6560]">
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
                  className="w-full bg-transparent border-b border-[#2D3B36]/30 focus:border-[#E8603C] py-2 pr-10 text-[#1C1B1A] placeholder-[#6B6560]/40 outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6B6560] hover:text-[#2D3B36] transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-[#6B6560]">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-transparent border-b border-[#2D3B36]/30 focus:border-[#E8603C] py-2 text-[#1C1B1A] placeholder-[#6B6560]/40 outline-none transition-colors text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E8603C] hover:bg-[#d05230] text-white font-medium py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99] disabled:opacity-70 cursor-pointer"
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
          <div className="mt-8 pt-6 border-t border-[#E5DFD6]/60 text-center">
            <p className="text-sm text-[#6B6560]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#2D3B36] font-semibold hover:text-[#E8603C] transition-colors underline decoration-dotted underline-offset-4">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
