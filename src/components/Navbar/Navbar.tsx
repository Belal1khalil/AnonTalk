"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="logo flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <h1 className="relative text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                Anon<span className="text-gray-800">Talk</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/help"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              Help
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute w-0 h-0.5 bg-primary-600 bottom-0 left-0 transition-all duration-300 group-hover:w-full " />
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signin"
              className="px-5 py-2.5 text-gray-700 font-medium hover:text-primary-600 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="py-4 space-y-3 border-t border-gray-200/50">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/help"
              className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 space-y-3 border-t border-gray-200/50">
              <Link
                href="/signin"
                className="block px-4 py-3 text-center text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
