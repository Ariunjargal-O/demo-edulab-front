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
  Target,
  Heart,
  Award,
  Globe,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  School,
  GraduationCap,
  UserCheck,
  Home,
  BarChart3,
  Calendar,
  MessageSquare,
  Video,
  Trophy,
  Clock,
  Shield,
  Lightbulb,
  ChevronUp,
  LogIn,
  Zap,
  Rocket,
  Brain,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AccomplishedTask from "@/components/AccomplishedTask";
import { MainPage } from "@/components/MainPage";
 
// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
 
    if (ref.current) {
      observer.observe(ref.current);
    }
 
    return () => observer.disconnect();
  }, [isVisible]);
 
  useEffect(() => {
    if (!isVisible) return;
 
    let startTime: number;
    let animationFrame: number;
 
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
 
      setCount(Math.floor(progress * end));
 
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
 
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);
 
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
 
// Enhanced Intersection Observer Hook
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
 
// Scroll Progress Component
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
 
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
 
// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-16 opacity-0 scale-0"
      } hover:scale-110 group`}
    >
      <ChevronUp className="w-6 h-6 mx-auto group-hover:animate-bounce" />
    </button>
  );
}
 
// Animated Card Component
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
 
export default function EduLabLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ScrollProgress />
      <BackToTop />
      <Header />
      
      <MainPage />
        {/* Hoslol heseg */}
        <section
        id="about"
        className="py-12 md:py-20 bg-white relative overflow-hidden"
      >
        {/* Background decoration - утсан дээр жижиг болгосон */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 md:top-20 left-4 md:left-10 w-16 md:w-32 h-16 md:h-32 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-12 md:w-24 h-12 md:h-24 bg-emerald-500 rounded-full animate-bounce"></div>
        </div>
 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <AnimatedCard delay={0}>
              <div className="relative group order-2 lg:order-1">
                <Image
                  src="/family.jpeg"
                  alt="Mongolian family using EduLab platform together"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-emerald-500/20 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
 
                {/* Floating stats - утсан дээр жижиг болгосон */}
                <div className="absolute -top-3 md:-top-6 -right-3 md:-right-6 bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg md:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <div className="text-lg md:text-2xl font-bold text-blue-600">
                    98%
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Сэтгэл ханамж
                  </div>
                </div>
              </div>
            </AnimatedCard>
 
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <AnimatedCard delay={200}>
                <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border-blue-200 hover:scale-105 transition-transform duration-300 text-sm md:text-base">
                  <Heart className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Бидний тухай
                </Badge>
              </AnimatedCard>
 
              <AnimatedCard delay={300}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Уламжлал ба{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                    Инновацийн
                  </span>{" "}
                  Хослол
                </h2>
              </AnimatedCard>
 
              <AnimatedCard delay={400}>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  EduLab School Platform нь Монголын өвөрмөц онцлог, хэрэгцээг
                  харгалзан бүтээгдсэн, орчин үеийн боловсролын хамгийн сүүлийн
                  үеийн шийдлүүдийг нэгтгэсэн сургалтын платформ юм.
                </p>
              </AnimatedCard>
 
              <AnimatedCard delay={500}>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Бид таны хүүхдийн мэдлэг боловсролд шинэ хуудсыг нээж, тэднийг
                  дэлхийн өрсөлдөөнд бэлтгэнэ.
                </p>
              </AnimatedCard>
 
              <AnimatedCard delay={600}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl md:rounded-2xl transform hover:scale-105 transition-all duration-300 group">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={10000} suffix="+" />
                    </div>
                    <div className="text-sm md:text-base text-gray-600">
                      Сурагчид
                    </div>
                    <Progress value={85} className="mt-2 h-1.5 md:h-2" />
                  </div>
                  <div className="text-center p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl md:rounded-2xl transform hover:scale-105 transition-all duration-300 group">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter end={500} suffix="+" />
                    </div>
                    <div className="text-sm md:text-base text-gray-600">
                      Багш нар
                    </div>
                    <Progress value={92} className="mt-2 h-1.5 md:h-2" />
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>
 
      {/* Яагаад манайхыг сонгох хэсэг */}
      <section
        id="why-us"
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500 rounded-full animate-bounce"></div>
        </div>
 
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <AnimatedCard>
              <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                <Trophy className="w-4 h-4 mr-2" />
                Ирээдүйд хөрөнгө оруулалт
              </Badge>
            </AnimatedCard>
 
            <AnimatedCard delay={100}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ухаалаг Сонголт:{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  Яагаад EduLab Вэ?
                </span>
              </h2>
            </AnimatedCard>
 
            <AnimatedCard delay={200}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Бид зөвхөн сургалтын платформ биш, бид ирээдүйг бүтээх түнш юм.
              </p>
            </AnimatedCard>
          </div>
 
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Home,
                title: "Үндэсний Онцлогт Тохирсон Шийдэл",
                description:
                  "Монгол хүүхдийн онцлог, боловсролын тогтолцоонд бүрэн нийцсэн, монгол ахуйгаас урган гарсан шийдэл. Бид гадны загварыг хуулбарлалгүй, эх орныхоо хэрэгцээнд тулгуурлан бүтээсэн.",
                gradient: "from-blue-500 to-emerald-400",
                delay: 0,
              },
              {
                icon: BarChart3,
                title: "Цогц Экосистем",
                description:
                  "Зөвхөн хичээл заах биш, сургуулийн менежмент, багшийн хөгжил, сурагчийн гүйцэтгэл, эцэг эхийн оролцоог нэгтгэсэн цогц систем.",
                gradient: "from-emerald-500 to-blue-400",
                delay: 100,
              },
              {
                icon: Globe,
                title: "Уян Хатан, Хүртээмжтэй Боловсрол",
                description:
                  "Алслагдсан орон нутгаас, аймаг, сумын төвөөс эхлээд хотын төв хүртэл, Монголын хүн ам зүйн онцлогт тохирсон хүртээмжтэй байдлыг бид хангана.",
                gradient: "from-blue-500 to-emerald-400",
                delay: 200,
              },
              {
                icon: BarChart3,
                title: "Мэдээлэлд Суурилсан Шийдвэр Гаргалт",
                description:
                  "Сурагчийн гүйцэтгэл, багшийн үнэлгээ, сургуулийн статистик мэдээлэлд тулгуурлан боловсролын чанарыг тасралтгүй сайжруулах боломж.",
                gradient: "from-emerald-500 to-blue-400",
                delay: 300,
              },
            ].map((item, index) => (
              <AnimatedCard key={index} delay={item.delay}>
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm transform hover:-translate-y-2 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      <AccomplishedTask />
      {/* Хэн юу хийж чадах хэсэг*/}
      <section
        id="capabilities"
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedCard>
              <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                <Smartphone className="w-4 h-4 mr-2" />
                EduLab-тай хийх боломжууд
              </Badge>
            </AnimatedCard>
 
            <AnimatedCard delay={100}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Хэн юу{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  хийж чадах вэ?
                </span>
              </h2>
            </AnimatedCard>
          </div>
 
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: School,
                title: "Сургуульд Зориулсан",
                subtitle: "Орчин үеийн боловсролын хувьсгал",
                gradient: "from-blue-50 to-emerald-50",
                iconGradient: "from-blue-500 to-emerald-400",
                features: [
                  {
                    icon: Calendar,
                    text: "Хичээлийн хуваарь, танхимын хуваарилалт",
                    color: "text-blue-600",
                  },
                  {
                    icon: BarChart3,
                    text: "Багшийн ажлын ачаалал, гүйцэтгэлийн хяналт",
                    color: "text-blue-600",
                  },
                  {
                    icon: UserCheck,
                    text: "Элсэлт, бүртгэл, сурагчийн мэдээллийн сан",
                    color: "text-blue-600",
                  },
                  {
                    icon: MessageSquare,
                    text: "Эцэг эхтэй харилцах систем",
                    color: "text-blue-600",
                  },
                  {
                    icon: Trophy,
                    text: "Тайлан, статистик мэдээлэл",
                    color: "text-blue-600",
                  },
                ],
                delay: 0,
              },
              {
                icon: GraduationCap,
                title: "Багшид Зориулсан",
                subtitle: "Хичээл заах урлагийг шинэ түвшинд",
                gradient: "from-emerald-50 to-blue-50",
                iconGradient: "from-emerald-500 to-blue-400",
                features: [
                  {
                    icon: Video,
                    text: "Интерактив хичээл бэлтгэх, удирдах",
                    color: "text-emerald-600",
                  },
                  {
                    icon: BarChart3,
                    text: "Сурагчдын гүйцэтгэлийг үнэлэх, хянах",
                    color: "text-emerald-600",
                  },
                  {
                    icon: MessageSquare,
                    text: "Эцэг эхтэй шууд холбогдох",
                    color: "text-emerald-600",
                  },
                  {
                    icon: Trophy,
                    text: "Багшийн хөгжил, мэргэжил дээшлүүлэх",
                    color: "text-emerald-600",
                  },
                  {
                    icon: Lightbulb,
                    text: "Цахим самбар, хичээлийн хэрэглэгдэхүүн",
                    color: "text-emerald-600",
                  },
                ],
                delay: 100,
              },
              {
                icon: Users,
                title: "Сурагчид Зориулсан",
                subtitle: "Мөрөөдлийнхөө сургуульд хүрэх зам",
                gradient: "from-amber-50 to-orange-50",
                iconGradient: "from-amber-500 to-orange-400",
                features: [
                  {
                    icon: Play,
                    text: "Сонирхолтой, интерактив хичээлүүд",
                    color: "text-amber-600",
                  },
                  {
                    icon: Clock,
                    text: "Хувь хүний хурдаар суралцах",
                    color: "text-amber-600",
                  },
                  {
                    icon: Trophy,
                    text: "Дасгал, шалгалт, сорил",
                    color: "text-amber-600",
                  },
                  {
                    icon: MessageSquare,
                    text: "Багш болон бусад сурагчидтай харилцах",
                    color: "text-amber-600",
                  },
                  {
                    icon: Award,
                    text: "Амжилт, дэвшил хянах",
                    color: "text-amber-600",
                  },
                ],
                delay: 200,
              },
              {
                icon: Heart,
                title: "Эцэг Эхэд Зориулсан",
                subtitle: "Хүүхдийнхээ ирээдүйд итгэлтэй хөрөнгө оруулалт",
                gradient: "from-purple-50 to-pink-50",
                iconGradient: "from-purple-500 to-pink-400",
                features: [
                  {
                    icon: BarChart3,
                    text: "Хүүхдийнхээ хичээлийн явц бодит цагаар хянах",
                    color: "text-purple-600",
                  },
                  {
                    icon: MessageSquare,
                    text: "Багштай шууд холбогдох",
                    color: "text-purple-600",
                  },
                  {
                    icon: Home,
                    text: "Хүүхдийн суралцах орчныг дэмжих",
                    color: "text-purple-600",
                  },
                  {
                    icon: Target,
                    text: "Хүүхдийн сонирхол, авьяасыг тодорхойлох",
                    color: "text-purple-600",
                  },
                  {
                    icon: Shield,
                    text: "Аюулгүй байдал",
                    color: "text-purple-600",
                  },
                ],
                delay: 300,
              },
            ].map((section, index) => (
              <AnimatedCard key={index} delay={section.delay}>
                <Card
                  className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${section.gradient} transform hover:-translate-y-2 hover:scale-105`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${section.iconGradient} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <section.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                          {section.title}
                        </h3>
                        <p className="text-gray-600">{section.subtitle}</p>
                      </div>
                    </div>
 
                    <div className="space-y-4">
                      {section.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 group/item transform hover:translate-x-2 transition-all duration-300"
                          style={{ animationDelay: `${featureIndex * 100}ms` }}
                        >
                          <feature.icon
                            className={`w-5 h-5 ${feature.color} group-hover/item:scale-110 transition-transform duration-300`}
                          />
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
 
      {/* Enhanced Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedCard>
              <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                <Star className="w-4 h-4 mr-2" />
                Амжилтын түүхүүд
              </Badge>
            </AnimatedCard>
 
            <AnimatedCard delay={100}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Хэрэглэгчдийн{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  Сэтгэгдэл
                </span>
              </h2>
            </AnimatedCard>
          </div>
 
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                rating: 5,
                text: "EduLab-ийн тусламжтайгаар миний хүүхэд мөрөөдлийн сургуульдаа элсэж чадсан. Баярлалаа EduLab!",
                name: "Б.Сайханцэцэг",
                role: "Эцэг эх",
                initials: "БС",
                gradient: "from-blue-500 to-emerald-400",
                delay: 0,
              },
              {
                rating: 5,
                text: "Бидний сурагчид EduLab платформыг ашиглан хичээлдээ илүү сонирхолтой болсон. Гайхалтай платформ!",
                name: "Д.Батбаяр",
                role: "Багш",
                initials: "ДБ",
                gradient: "from-emerald-500 to-blue-400",
                delay: 100,
              },
              {
                rating: 5,
                text: "EduLab-ийн дэмжлэгээр би Харвардын их сургуульд элсэж чадлаа. Мөрөөдөл биелэв!",
                name: "Э.Мөнхбат",
                role: "Оюутан",
                initials: "ЭМ",
                gradient: "from-amber-500 to-orange-400",
                delay: 200,
              },
            ].map((testimonial, index) => (
              <AnimatedCard key={index} delay={testimonial.delay}>
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <span className="text-white font-bold">
                          {testimonial.initials}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
 
      {/* Enhanced CTA Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800 text-white relative overflow-hidden"
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-emerald-400/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-ping"></div>
          <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-purple-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-amber-400/10 rounded-full animate-bounce"></div>
        </div>
 
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <AnimatedCard>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ирээдүйгээ Бүтээх{" "}
                  <span className="text-emerald-300">Аялалд</span> Нэгдээрэй!
                </h2>
              </AnimatedCard>
 
              <AnimatedCard delay={100}>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  EduLab School Platform-ийн талаар дэлгэрэнгүй мэдээлэл авахаар
                  эсвэл платформд нэгдэхээр манай багтай холбогдоорой.
                </p>
              </AnimatedCard>
 
              <AnimatedCard delay={200}>
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, text: "Үнэгүй туршилтын хугацаа" },
                    { icon: Shield, text: "24/7 техникийн дэмжлэг" },
                    { icon: Heart, text: "Хувь хүний зөвлөгөө" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 group transform hover:translate-x-2 transition-all duration-300"
                    >
                      <item.icon className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-blue-100 group-hover:text-white transition-colors duration-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </div>
 
            <AnimatedCard delay={300}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 transform hover:scale-105 transition-all duration-500 group">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                    Бидэнтэй холбогдох
                  </h3>
                  <form className="space-y-6">
                    <div className="group/input">
                      <Input
                        placeholder="Таны нэр"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 transition-all duration-300 group-hover/input:bg-white/15"
                      />
                    </div>
                    <div className="group/input">
                      <Input
                        type="email"
                        placeholder="И-мэйл хаяг"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 transition-all duration-300 group-hover/input:bg-white/15"
                      />
                    </div>
                    <div className="group/input">
                      <Input
                        placeholder="Утасны дугаар"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 transition-all duration-300 group-hover/input:bg-white/15"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg py-6 transform hover:scale-105 transition-all duration-300 group/button shadow-lg hover:shadow-xl">
                      <Rocket className="mr-2 w-5 h-5 group-hover/button:animate-pulse" />
                      Бүртгүүлэх
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
