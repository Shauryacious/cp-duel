import React from "react";
import { cpTopics } from "@/constants/cpTopics";
import SheetList from "../components/Home/SheetList";

function CPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      <main className="max-w-6xl mx-auto px-4 py-12">
        <section
          className="text-center mb-16 animate-fade-in"
          aria-label="Hero Section"
        >
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Competitive <span className="text-amber-400 drop-shadow">Programming</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Master all essential topics in competitive programming. Choose a topic and start practicing!
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Choose Your <span className="text-amber-400">Topic</span>
          </h2>
          <SheetList sheets={cpTopics} />
        </section>
      </main>
    </div>
  );
}

export default CPPage;

