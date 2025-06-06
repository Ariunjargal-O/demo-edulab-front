"use client";

import { EduInfo } from "./components/EduInfo";
import { ExperienceInfo } from "./components/ExperienceInfo";
import { PersonalInfo } from "./components/PersonalInfo";

export default function ResumePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative h-full">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>

      <div className="pt-32 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10">
        <PersonalInfo />
        <div className="grid grid-cols-2 gap-10">
          <EduInfo />
          <ExperienceInfo />
        </div>
      </div>
    </div>
  );
}
