import React from "react";
import Navbar from "../components/layout/navbar.jsx";
import Footer from "../components/layout/footer.jsx";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6FE] text-[#1E1B4B]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8E5F7] shadow-[0_10px_35px_rgba(124,92,255,0.06)]">
          <h1 
            className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mb-6"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Privacy Policy
          </h1>

          <div className="space-y-6 text-sm text-[#6B6396] leading-relaxed">
            <p>
              Your privacy is extremely important to us. TaskFlow is designed to protect your personal information and task data.
            </p>

            <h3 className="text-base font-bold text-[#1E1B4B]">1. Data Collection & Isolation</h3>
            <p>
              We only store necessary account details (name, email address, and hashed passwords) along with your tasks. Every user account operates in complete isolation.
            </p>

            <h3 className="text-base font-bold text-[#1E1B4B]">2. httpOnly Cookie Security</h3>
            <p>
              Authentication tokens are stored inside httpOnly, SameSite cookies to protect your login session against cross-site scripting (XSS) attacks.
            </p>

            <h3 className="text-base font-bold text-[#1E1B4B]">3. Contact</h3>
            <p>
              If you have any questions regarding privacy, please email <a href="mailto:naman.chaurasia0311@gmail.com" className="text-[#7C5CFF] font-semibold hover:underline">naman.chaurasia0311@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
