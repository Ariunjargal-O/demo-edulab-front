"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/Header";



export const Footer = () => {
function useScrollAnimation(threshold = 0.1, rootMargin = "0px") {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return [setRef, isVisible] as const;
}

  function AnimatedCard({
    children,
    delay = 0,
    className = "",
  }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }) {
    const [ref, isVisible] = useScrollAnimation(0.1, "-50px");
  
    return (
      <div
        ref={ref}
        className={`transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
  
  return (
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-emerald-600/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedCard>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    EduLab
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Монголын хүүхдүүдийн ирээдүйг бүтээж буй боловсролын платформ
                </p>
              </div>
            </AnimatedCard>

            {[
              {
                title: "Платформ",
                links: ["Онцлогууд", "Үнийн төлөвлөгөө", "Туршилт"],
                delay: 100,
              },
              {
                title: "Дэмжлэг",
                links: ["Тусламж", "Холбоо барих", "FAQ"],
                delay: 200,
              },
              {
                title: "Компани",
                links: ["Бидний тухай", "Карьер", "Мэдээ"],
                delay: 300,
              },
            ].map((section, index) => (
              <AnimatedCard key={index} delay={section.delay}>
                <div>
                  <h4 className="font-semibold mb-4 text-lg">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block transform hover:scale-105"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard delay={400}>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2025 EduLab Inc. Бүх эрх хуулиар хамгаалагдсан.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 transform"
                >
                  Нууцлалын бодлого
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 transform"
                >
                  Үйлчилгээний нөхцөл
                </Link>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </footer>
  );
}
