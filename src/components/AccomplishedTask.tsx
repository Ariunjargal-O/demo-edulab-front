"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Check, School, GraduationCap, Users, Home, Settings, Badge, Zap, CheckIcon } from "lucide-react";

const taskData = [
  {
    id: 1,
    img_url: "/data-science.png",
    title: "LMS",
    content_title: "LMS - Суралцахуйн удирдлагын систем",
    content: [
      {
        id: 1,
        option1: "Ирц бүртгэл",
      },
      {
        id: 2,
        option2: "Шалгалт",
      },
    ],
    contect_p:
      "eSchool LMS нь танхим болон сургалтыг хослуулан үр дүнтэйгээр суралцахад чиглэсэн цахим сургалтын систем юм.",
    gradient: "from-blue-500 to-emerald-400",
    bgGradient: "from-blue-50 to-emerald-50",
    icon: School,
  },
  {
    id: 2,
    img_url: "/teacher.png",
    title: "eTeacher",
    content_title: "LMS - Багшид зориулсан хэсэг",
    content: [
      {
        id: 1,
        option1: "Сурагч нэмэх",
      },
      {
        id: 2,
        option2: "Сурагчийн ирц бүртгэх",
      },
    ],
    contect_p:
      "Өдөр тутам тогтмол хийдэг механик, гар ажиллагаатай ажлуудыг хялбараар гүйцэтгэх боломжтой. Мөн тайлан, анализыг хурдан хугацаанд хийж, гол ажилдаа ихэнх цагаа зарцуулах боломжийг танд олгоно.",
    gradient: "from-emerald-500 to-blue-400", 
    bgGradient: "from-emerald-50 to-blue-50",
    icon: GraduationCap,
  },
  {
    id: 3,
    img_url: "/student.png",
    title: "eStudent",
    content_title: "LMS - Сурагчид зориулсан хэсэг",
    content: [
      {
        id: 1,
        option1: "Хичээлын хуваарь харах",
      },
      {
        id: 2,
        option2: "Шалгалт шүүлэг өгөх",
      },
    ],
    contect_p:
      "Сурагч өөрийн сургалтын үйл ажиллагаатай холбоотой бүхий л мэдээллийг цаг алдалгүй системээс авах боломжтой. Мөн өөрийн сурах төлөвлөгөөг гарган түүнийхээ үр дүнг анализ хийж хөгжих боломжийг олгоно.",
    gradient: "from-amber-500 to-orange-400",
    bgGradient: "from-amber-50 to-orange-50", 
    icon: Users,
  },
  {
    id: 4,
    img_url: "/family.png",
    title: "eFamily",
    content_title: "LMS - Эцэг эхэд зориулсан хэсэг",
    content: [
      {
        id: 1,
        option1: "Хүүхдийн сурлагын явц",
      },
      {
        id: 2,
        option2: "Сургууль болон багшийн зарлал мэдээлэл харах",
      },
    ],
    contect_p:
      "Хүүхдийнхээ сурлага, хүмүүжилтэй холбоотой мэдээлэл болон хүүхдийн сурлагын явцтай холбоотой мэдээллийг цаг алдалгүй авах боломжтой. Мөн сургуулийн удирдлага, багш нартай холбогдон санал хүсэлтээ өгч хамтран ажиллах боломжтой.",
    gradient: "from-purple-500 to-pink-400",
    bgGradient: "from-purple-50 to-pink-50",
    icon: Home,
  },
  {
    id: 5,
    img_url: "/school.png",
    title: "eSchool",
    content_title: "LMS - eSchool",
    content: [
      {
        id: 1,
        option1: "Сургуулийн тохиргоо хийх",
      },
    ],
    contect_p:
      "eSchool үндсэн платформын удirдлагуудад зориулсан дэд систем нь eSchool юм. Удирдлагууд багш нарын хичээлийн хуваарь, ирц гэрийн даалгаврын биелэлт болон цахим хичээлийг явцыг хянах боломжтой.",
    gradient: "from-indigo-500 to-purple-400",
    bgGradient: "from-indigo-50 to-purple-50",
    icon: Settings,
  },
];

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
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div
      ref={setRef}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AccomplishedTask() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [selectedTask, setSelectedTask] = useState(taskData[0]);

  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 60, opacity: 0 });
    }
  }, [isInView, controls]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration - Responsive */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-emerald-500 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-purple-500 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <AnimatedCard>
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border border-blue-200 rounded-full mb-4 hover:scale-105 transition-transform duration-300">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">EduLab-ийн боломжууд</span>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={100}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Таны хэрэгцээнд{" "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Тохирсон Шийдэл
              </span>
            </h2>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              EduLab платформ нь боловсролын салбарын бүх оролцогчдод зориулсан цогц шийдлүүдийг санал болгоно.
            </p>
          </AnimatedCard>
        </div>

        {/* Main Content */}
        <motion.div
          ref={ref}
          animate={controls}
          initial={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          {/* Tab Navigation - Mobile Responsive */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12 px-2 sm:px-0">
            {taskData.map((item, index) => (
              <AnimatedCard key={item.id} delay={index * 100}>
                <button
                  onClick={() => setSelectedTask(item)}
                  className={`group flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] transform hover:scale-105 hover:shadow-lg ${
                    selectedTask.id === item.id
                      ? `bg-gradient-to-br ${item.bgGradient} border-blue-300 shadow-lg scale-105`
                      : "bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-200 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 ${
                      selectedTask.id === item.id
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                  <p
                    className={`font-semibold text-xs sm:text-sm transition-colors duration-300 text-center ${
                      selectedTask.id === item.id 
                        ? "text-blue-700" 
                        : "text-gray-700 group-hover:text-blue-600"
                    }`}
                  >
                    {item.title}
                  </p>
                </button>
              </AnimatedCard>
            ))}
          </div>

          {/* Content Display */}
          <AnimatedCard delay={600}>
            <div 
              className={`bg-gradient-to-br ${selectedTask.bgGradient} rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl overflow-hidden transform hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 backdrop-blur-sm`}
            >
              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  {/* Image Section */}
                  <div className="relative group order-2 lg:order-1">
                    <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/30 transform group-hover:scale-105 transition-all duration-500">
                      <div 
                        className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto bg-gradient-to-r ${selectedTask.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <selectedTask.icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
                      </div>
                    </div>
                    
                    {/* Floating decoration - Hidden on mobile */}
                    <div className="hidden sm:block absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="hidden sm:block absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-white/20 rounded-full animate-bounce"></div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-700 transition-colors duration-300 text-center lg:text-left">
                        {selectedTask.content_title}
                      </h3>
                      
                      <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6">
                        {selectedTask.content.map((el, idx) => (
                          <div
                            key={idx}
                            className="group/item transform hover:translate-x-1 sm:hover:translate-x-2 transition-all duration-300"
                          >
                            {el.option1 && (
                              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/30 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 group-hover/item:bg-white/40 group-hover/item:shadow-lg transition-all duration-300">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 flex-shrink-0">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                                </div>
                                <p className="font-medium text-sm sm:text-base text-gray-800 group-hover/item:text-gray-900 transition-colors duration-300">
                                  {el.option1}
                                </p>
                              </div>
                            )}
                            {el.option2 && (
                              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/30 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20 group-hover/item:bg-white/40 group-hover/item:shadow-lg transition-all duration-300">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 flex-shrink-0">
                                  <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                                </div>
                                <p className="font-medium text-sm sm:text-base text-gray-800 group-hover/item:text-gray-900 transition-colors duration-300">
                                  {el.option2}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 lg:p-6 bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/30 hover:bg-white/50 transition-all duration-300">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                        {selectedTask.contect_p}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>
      </div>
    </section>
  );
}

export default AccomplishedTask;