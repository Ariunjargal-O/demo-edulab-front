// "usec client"
// import React from "react"


// export const Hoslol = () => {
//     return (
//             {/* Hoslol heseg */}
//       <section
//         id="about"
//         className="py-12 md:py-20 bg-white relative overflow-hidden"
//       >
//         {/* Background decoration - утсан дээр жижиг болгосон */}
//         <div className="absolute top-0 left-0 w-full h-full opacity-5">
//           <div className="absolute top-10 md:top-20 left-4 md:left-10 w-16 md:w-32 h-16 md:h-32 bg-blue-500 rounded-full animate-pulse"></div>
//           <div className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-12 md:w-24 h-12 md:h-24 bg-emerald-500 rounded-full animate-bounce">
            
//           </div>
//         </div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
//             <AnimatedCard delay={0}>
//               <div className="relative group order-2 lg:order-1">
//                 <Image
//                   src="/placeholder.svg?height=400&width=500"
//                   alt="Mongolian family using EduLab platform together"
//                   width={500}
//                   height={400}
//                   className="w-full h-auto rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl transform group-hover:scale-105 transition-all duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-emerald-500/20 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                 {/* Floating stats - утсан дээр жижиг болгосон */}
//                 <div className="absolute -top-3 md:-top-6 -right-3 md:-right-6 bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg md:shadow-xl transform group-hover:scale-110 transition-all duration-300">
//                   <div className="text-lg md:text-2xl font-bold text-blue-600">
//                     98%
//                   </div>
//                   <div className="text-xs md:text-sm text-gray-600">
//                     Сэтгэл ханамж
//                   </div>
//                 </div>
//               </div>
//             </AnimatedCard>

//             <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
//               <AnimatedCard delay={200}>
//                 <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border-blue-200 hover:scale-105 transition-transform duration-300 text-sm md:text-base">
//                   <Heart className="w-3 h-3 md:w-4 md:h-4 mr-2" />
//                   Бидний тухай
//                 </Badge>
//               </AnimatedCard>

//               <AnimatedCard delay={300}>
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
//                   Уламжлал ба{" "}
//                   <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
//                     Инновацийн
//                   </span>{" "}
//                   Хослол
//                 </h2>
//               </AnimatedCard>

//               <AnimatedCard delay={400}>
//                 <p className="text-base md:text-lg text-gray-600 leading-relaxed">
//                   EduLab School Platform нь Монголын өвөрмөц онцлог, хэрэгцээг
//                   харгалзан бүтээгдсэн, орчин үеийн боловсролын хамгийн сүүлийн
//                   үеийн шийдлүүдийг нэгтгэсэн сургалтын платформ юм.
//                 </p>
//               </AnimatedCard>

//               <AnimatedCard delay={500}>
//                 <p className="text-base md:text-lg text-gray-600 leading-relaxed">
//                   Бид таны хүүхдийн мэдлэг боловсролд шинэ хуудсыг нээж, тэднийг
//                   дэлхийн өрсөлдөөнд бэлтгэнэ.
//                 </p>
//               </AnimatedCard>

//               <AnimatedCard delay={600}>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                   <div className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl md:rounded-2xl transform hover:scale-105 transition-all duration-300 group">
//                     <div className="text-2xl md:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
//                       <AnimatedCounter end={10000} suffix="+" />
//                     </div>
//                     <div className="text-sm md:text-base text-gray-600">
//                       Сурагчид
//                     </div>
//                     <Progress value={85} className="mt-2 h-1.5 md:h-2" />
//                   </div>
//                   <div className="text-center p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl md:rounded-2xl transform hover:scale-105 transition-all duration-300 group">
//                     <div className="text-2xl md:text-3xl font-bold text-emerald-600 group-hover:scale-110 transition-transform duration-300">
//                       <AnimatedCounter end={500} suffix="+" />
//                     </div>
//                     <div className="text-sm md:text-base text-gray-600">
//                       Багш нар
//                     </div>
//                     <Progress value={92} className="mt-2 h-1.5 md:h-2" />
//                   </div>
//                 </div>
//               </AnimatedCard>
//             </div>
//           </div>
//         </div>
//       </section>
//     )
// }