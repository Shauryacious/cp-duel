import React from "react";
import { sheets } from "@/constants/sheets";
import SheetList from "../components/Home/SheetList";
import HeroSection from "../components/Home/HeroSection";
import CommunitySection from "../components/Home/CommunitySection";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      <main className="max-w-5xl mx-auto px-4 py-12">
        <HeroSection />

        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Choose Your <span className="text-amber-400">Sheet</span>
          </h2>
          <SheetList sheets={sheets} />
        </section>

        <CommunitySection />
      </main>
    </div>
  );
}

export default HomePage;
