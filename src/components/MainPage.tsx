"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { ArrowRight, Award, Brain, Globe, Lightbulb, Play, Rocket, Zap } from "lucide-react";
import { Button } from "./ui/button";
;
export const MainPage = () => {
  const [scrollY, setScrollY] = useState(0); // scrollY state

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-emerald-900/10 to-amber-900/20"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>

        {/* Enhanced Floating Elements - Mobile optimized */}
        <div
          className="absolute top-16 left-4 sm:top-20 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-400/20 rounded-full animate-float"
          style={{
            animationDelay: "0s",
            animationDuration: "3s",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>
        <div
          className="absolute top-32 right-4 sm:top-40 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-emerald-400/20 rounded-full animate-float"
          style={{
            animationDelay: "1s",
            animationDuration: "4s",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        ></div>
        <div
          className="absolute bottom-32 left-4 sm:bottom-40 sm:left-20 w-8 h-8 sm:w-12 sm:h-12 bg-amber-400/20 rounded-full animate-float"
          style={{
            animationDelay: "2s",
            animationDuration: "5s",
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        ></div>

        {/* New floating elements - Hidden on mobile for cleaner look */}
        <div
          className="hidden sm:block absolute top-60 left-1/3 w-8 h-8 bg-purple-400/20 rounded-full animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.6}px)` }}
        ></div>
        <div
          className="hidden sm:block absolute bottom-60 right-1/3 w-14 h-14 bg-pink-400/20 rounded-full animate-bounce"
          style={{
            animationDuration: "2s",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        ></div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 sm:py-20">
        <div className="text-center lg:text-left space-y-6 sm:space-y-8">
          <div className="animate-fade-in-down">
            <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border-blue-200 hover:scale-105 transition-transform duration-300 text-xs sm:text-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Дижитал боловсролын платформ
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            <span className="text-gray-900 inline-block animate-slide-in-left hover:scale-105 transition-transform duration-300">
              Хонины Хотноос
            </span>
            <br />
            <span
              className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent inline-block animate-slide-in-right hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              Дэлхийн Шилдэг
            </span>
            <br />
            <span
              className="text-gray-900 inline-block animate-slide-in-left hover:scale-105 transition-transform duration-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
              style={{ animationDelay: "0.4s" }}
            >
              Их Сургуульд хүрэх гүүр  тань         
            </span>
          </h1>

          <p
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl animate-fade-in-up leading-relaxed mx-auto lg:mx-0"
            style={{ animationDelay: "0.6s" }}
          >
            EduLab School Platform – Таны хүүхдийн ирээдүйн гүүр, амжилтын
            түлхүүр. Ирээдүйн боловсрол эхэлж байна.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up justify-center lg:justify-start"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group w-full sm:w-auto"
            >
              <Rocket className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
              <span className="truncate">Платформтой Танилцах</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 transform hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
            >
              <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="truncate">Танилцуулга үзэх</span>
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-in-right order-first lg:order-last">
          <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 transform hover:scale-105 transition-all duration-500 group mx-auto max-w-md lg:max-w-none">
            <Image
              src="/main-page.jpeg"
              alt="Mongolian student learning with modern technology"
              width={500}
              height={600}
              className="rounded-xl sm:rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500 w-full h-auto"
            />

            {/* Enhanced overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-emerald-500/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Enhanced Floating Elements - Responsive positioning */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full p-2 sm:p-3 lg:p-4 shadow-lg animate-float hover:scale-110 transition-transform duration-300">
            <Award className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-gradient-to-r from-emerald-500 to-blue-400 rounded-full p-2 sm:p-3 lg:p-4 shadow-lg animate-float-delayed hover:scale-110 transition-transform duration-300">
            <Globe className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div className="absolute top-1/2 -left-4 sm:-left-6 lg:-left-8 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full p-2 sm:p-3 shadow-lg animate-pulse hover:scale-110 transition-transform duration-300">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="absolute top-1/4 -right-3 sm:-right-4 lg:-right-6 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full p-2 sm:p-3 shadow-lg animate-bounce hover:scale-110 transition-transform duration-300">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};
