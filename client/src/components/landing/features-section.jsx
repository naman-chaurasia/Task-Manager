import React from "react";
import { 
  CheckSquare, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Folder, 
  List, 
  Calendar, 
  Lock, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    icon: CheckSquare,
    title: "Smart Task Management",
    description: "Create, edit, and organize tasks with priorities, categories, and due dates. Complete tasks with one click.",
    badge: "Core"
  },
  {
    icon: List,
    title: "Real-Time Animated List",
    description: "Natural staggered entrances, interactive check animations, and smooth slide-out deletions.",
    badge: "Interactive"
  },
  {
    icon: BarChart3,
    title: "Dashboard Metrics",
    description: "Track your progress with a calm animated progress bar and live completion counter.",
    badge: "Analytics"
  },
  {
    icon: Folder,
    title: "Category Tags",
    description: "Organize tasks with categories like Work, Personal, Urgent, and General for quick filtering.",
    badge: "Core"
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Designed intentionally for all screen sizes — mobile, tablet, and desktop.",
    badge: "Design"
  },
  {
    icon: Shield,
    title: "httpOnly Cookie Security",
    description: "JWT-based authentication stored in httpOnly, SameSite cookies to protect against token theft.",
    badge: "Security"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-[#F3F0FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Everything you need to stay <span className="text-[#7C5CFF]">organized</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B6396]">
            TaskFlow comes with all the features you need to manage your tasks efficiently in a calm, focused environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 border border-[#E8E5F7] shadow-[0_8px_25px_rgba(124,92,255,0.05)] hover:shadow-[0_12px_35px_rgba(124,92,255,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#F3F0FC] text-[#7C5CFF] flex items-center justify-center border border-[#E8E5F7]">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F3F0FC] text-[#7C5CFF] border border-[#E8E5F7]">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 
                    className="text-xl font-bold text-[#1E1B4B] mb-2"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-sm text-[#6B6396] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
