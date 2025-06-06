"use client";
import { PersonalInfo } from "./components/PersonalInfo";
import { EduInfo } from "./components/EduInfo";
import { ExperienceInfo } from "./components/ExperienceInfo";

export default function ResumePage() {
  // sds?
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
      </div>
      <div className="pt-8 px-4 md:px-10 pb-10 relative gap-10 flex flex-col">
      <PersonalInfo />
      <div className="grid grid-cols-2 gap-10">
        <EduInfo />
        <ExperienceInfo />
        </div>
      </div>
    </div>
  );
}
