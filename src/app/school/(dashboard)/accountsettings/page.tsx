"use client";
import { PersonalInfo } from "./components/PersonalInfo";
import { EduInfo } from "./components/EduInfo";
import { ExperienceInfo } from "./components/ExperienceInfo";
import { useEffect, useState } from "react";
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-150 via-blue-100 to-indigo-50 relative overflow-hidden pt-30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-emerald-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-amber-200/20 rounded-full animate-bounce"></div>
      </div>

      <div className="pt-8 px-4 md:px-10 pb-10 relative z-10 flex gap-10 flex-col">
        <AnimatedCard>
          {" "}
          <PersonalInfo />{" "}
        </AnimatedCard>
        <div className="grid grid-cols-2 gap-10">
          <AnimatedCard>
            {" "}
            <EduInfo />{" "}
          </AnimatedCard>
          <AnimatedCard>
            {" "}
            <ExperienceInfo />{" "}
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
