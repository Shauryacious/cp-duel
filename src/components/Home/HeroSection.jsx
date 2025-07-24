// src/components/Home/HeroSection.jsx

import React from "react";

/**
 * HeroSection displays the main introductory banner on the home page.
 *
 * @returns {JSX.Element} The hero section.
 */
function HeroSection() {
  return (
    <section
      className="text-center mb-16 animate-fade-in"
      aria-label="Hero Section"
    >
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
        Explore <span className="text-amber-400 drop-shadow">Sheets</span>
      </h1>
      <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
        Structured problem sheets to guide your journey from beginner to pro.
        Practice, learn, and master every topic!
      </p>
    </section>
  );
}

export default HeroSection;
