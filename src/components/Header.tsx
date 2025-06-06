"use client";

import Image from "next/image";
import Link from "next/link";

import { BookOpen, LogIn, PhoneCall, Menu, X, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Бидний тухай", href: "#about" },
    { label: "Онцлог", href: "#features" },
    { label: "Яагаад бид?", href: "#why-us" },
    { label: "Боломжууд", href: "#capabilities" },
    { label: "Холбоо барих", href: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xl py-2 sm:py-3"
            : "bg-transparent py-3 sm:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 group">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 ${
                  isScrolled ? "shadow-lg" : ""
                }`}
              >
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <span
                className={`text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled ? "sm:text-xl" : ""
                }`}
              >
                EduLab
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-all duration-300 hover:scale-105 relative group text-sm xl:text-base ${
                    isScrolled
                      ? "text-gray-800 hover:text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden xl:flex items-center space-x-3">
              <Button
                size="sm"
                className={`bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 text-sm px-4 ${
                  isScrolled ? "shadow-lg" : "shadow-lg hover:shadow-xl"
                }`}
              >
                Нэгдэх
              </Button>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-blue-200 text-blue-700 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 text-sm px-4 ${
                    isScrolled ? "border-blue-300 bg-white/80" : ""
                  }`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Нэвтрэх
                </Button>
              </Link>
            </div>

            {/* Tablet Buttons (Icon + Text for lg, Icon only for md and below) */}
            <div className="hidden sm:flex xl:hidden items-center space-x-2 lg:space-x-3">
              <Button
                size="sm"
                className={`bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 px-3 lg:px-4 ${
                  isScrolled ? "shadow-lg" : "shadow-lg hover:shadow-xl"
                }`}
              >
                <UserPlus className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline text-sm">Нэгдэх</span>
              </Button>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-blue-200 text-blue-700 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 px-3 lg:px-4 ${
                    isScrolled ? "border-blue-300 bg-white/80" : ""
                  }`}
                >
                  <LogIn className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline text-sm">Нэвтрэх</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:hidden">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 px-2"
              >
                <UserPlus className="w-4 h-4" />
              </Button>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-blue-200 text-blue-700 hover:bg-blue-50 px-2 ${
                    isScrolled ? "border-blue-300 bg-white/80" : ""
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                </Button>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-800 hover:bg-blue-50"
                    : "text-gray-700 hover:bg-white/20"
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Tablet Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`hidden sm:block lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "text-gray-800 hover:bg-blue-50"
                  : "text-gray-700 hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                      EduLab
                    </span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 py-8 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block py-3 px-4 text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-100 space-y-3">
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 justify-center"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Нэвтрэх
                    </Button>
                  </Link>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Нэгдэх
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};