import { CheckSquare, Github, Mail, Star, Zap, ExternalLink, Home, Monitor, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleContribute = () => {
    window.open('https://github.com/naman-chaurasia/Task-Manager', '_blank');
  };

  return (
    <footer className="bg-[#2D3B36] text-white">
      <div className="container px-4 py-12 mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Fraunces', serif" }}>TaskFlow</span>
            <span className="text-xs bg-[#E8603C] text-white px-2.5 py-0.5 rounded-full font-medium">v1.0</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/80">
            <a 
              href="https://github.com/naman-chaurasia/Task-Manager" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a 
              href="mailto:naman.chaurasia0311@gmail.com" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white/70 gap-4">
          <p>© {new Date().getFullYear()} TaskFlow. Built by Naman Chaurasia.</p>
          <p>Designed with warm editorial aesthetics & modern full-stack architecture.</p>
        </div>
      </div>
    </footer>
  );
}
