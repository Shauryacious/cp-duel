// src/pages/DPSheetPage.jsx

import React, { useState, useCallback, useMemo } from "react";
import dpSections from "@/data/dpSections";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import FavoriteList from "@/components/FavoriteList/FavoriteList";
import ProblemList from "@/components/ProblemList/ProblemList";
import CircularProgressBar from "@/components/Progress/CircularProgressBar";

/**
 * Page component rendering DP problem sheets with progress tracking, favorites, and accordion sections.
 *
 * @component
 * @returns {JSX.Element} The DP Sheet page.
 */
function DPSheetPage() {
  // Persist checked state of problems across reloads (problem completion)
  const [checked, setChecked] = useLocalStorageState("dpChecklistState", {});

  // Persist favorite problems across reloads
  const [favorites, setFavorites] = useLocalStorageState("dpFavorites", {});

  // Tracks which accordion section is open
  const [openIndex, setOpenIndex] = useState(0);

  // Controls visibility of the Favorites list
  const [showFavorites, setShowFavorites] = useState(false);

  // Toggles accordion section open/closed
  const toggleSection = useCallback(
    (idx) => {
      setOpenIndex((current) => (current === idx ? null : idx));
    },
    [setOpenIndex]
  );

  // Toggles checked state of a problem
  const handleCheck = useCallback(
    (sectionIdx, problemIdx) => {
      const key = `${sectionIdx}-${problemIdx}`;
      setChecked((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    [setChecked]
  );

  // Toggles favorite status of a problem
  const handleFavorite = useCallback(
    (sectionIdx, problemIdx, url) => {
      const key = `${sectionIdx}-${problemIdx}`;
      setFavorites((prev) => {
        if (prev[key]) {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        }
        return {
          ...prev,
          [key]: { sectionIdx, problemIdx, url },
        };
      });
    },
    [setFavorites]
  );

  // Calculate total problems and how many are solved
  const { totalProblems, totalSolved, overallPercent, favoriteProblems } =
    useMemo(() => {
      const totalProblems = dpSections.reduce(
        (sum, section) => sum + (section.links?.length || 0),
        0
      );

      const totalSolved = dpSections.reduce(
        (sum, section, sectionIdx) =>
          sum +
          (section.links
            ? section.links.filter(
                (_, problemIdx) => checked[`${sectionIdx}-${problemIdx}`]
              ).length
            : 0),
        0
      );

      const overallPercent =
        totalProblems === 0
          ? 0
          : Math.round((totalSolved / totalProblems) * 100);

      const favoriteProblems = Object.values(favorites);

      return { totalProblems, totalSolved, overallPercent, favoriteProblems };
    }, [checked, favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              <span className="text-amber-400 drop-shadow">DP Sheet</span>
            </h1>
            <p className="text-lg text-white italic font-medium">
              Isko Laga Dala To DP Jhingalala!
            </p>
            <div className="mt-4 text-lg text-gray-300 font-semibold">
              Total Progress:{" "}
              <span className="text-amber-400">{totalSolved}</span>
              <span className="text-gray-400"> / {totalProblems}</span>
            </div>
          </div>
          <div className="w-32 h-32 flex-shrink-0">
            <CircularProgressBar
              value={overallPercent}
              text={`${overallPercent}%`}
            />
          </div>
        </header>

        {/* Favorites Toggle Button */}
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            className={`
              relative flex items-center gap-2
              px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-400
              text-gray-900 font-bold shadow-lg
              hover:from-yellow-400 hover:to-amber-400
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-amber-300
              group
            `}
            aria-pressed={showFavorites}
            aria-label={
              showFavorites
                ? "Hide favorite problems"
                : "Show favorite problems"
            }
            onClick={() => setShowFavorites((v) => !v)}
          >
            <span className="font-semibold tracking-wide">Favorites</span>
            <span
              className={`text-xl transition-transform duration-200 ${
                showFavorites
                  ? "rotate-12 scale-110 text-amber-600"
                  : "group-hover:scale-110"
              }`}
              aria-hidden="true"
            >
              ★
            </span>
            {favoriteProblems.length > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  bg-red-500 text-white rounded-full
                  w-6 h-6 flex items-center justify-center
                  text-xs font-bold shadow border-2 border-white
                "
                aria-label={`${favoriteProblems.length} favorite problems`}
              >
                {favoriteProblems.length}
              </span>
            )}
          </button>
        </div>

        {/* Favorites List */}
        <FavoriteList
          favoriteProblems={favoriteProblems}
          onFavorite={handleFavorite}
          visible={showFavorites}
        />

        {/* DP Sections Accordion */}
        <div className="space-y-6">
          {dpSections.map((section, sectionIdx) => {
            const links = section.links || [];
            const solved = links.filter(
              (_, problemIdx) => checked[`${sectionIdx}-${problemIdx}`]
            ).length;
            const percent =
              links.length === 0
                ? 0
                : Math.round((solved / links.length) * 100);

            const isOpen = openIndex === sectionIdx;

            return (
              <section
                key={section.title}
                className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-6"
                aria-labelledby={`section-${sectionIdx}-title`}
                role="region"
                aria-expanded={isOpen}
              >
                {/* Section Progress */}
                <div className="flex items-center mb-3">
                  <div className="flex-1 mr-4" aria-hidden="true">
                    <div className="relative h-3 w-full rounded-full bg-gray-700 overflow-hidden">
                      <div
                        className="absolute h-full rounded-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                  <div
                    className="text-white text-base font-semibold min-w-[60px] text-right"
                    aria-label={`${solved} of ${links.length} problems solved`}
                  >
                    {solved} / {links.length}
                  </div>
                </div>

                {/* Accordion Toggle Button */}
                <button
                  id={`section-${sectionIdx}-title`}
                  type="button"
                  onClick={() => toggleSection(sectionIdx)}
                  className={`w-full flex justify-between items-center px-2 py-3 text-xl font-bold focus:outline-none rounded-xl transition-colors ${
                    isOpen
                      ? "text-amber-400"
                      : "text-white hover:text-amber-400"
                  }`}
                  aria-controls={`section-${sectionIdx}-content`}
                  aria-expanded={isOpen}
                >
                  {section.title}
                  <span className="ml-4" aria-hidden="true">
                    {isOpen ? (
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="rotate-180 transition-transform"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M6 8l4 4 4-4" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="transition-transform"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M6 8l4 4 4-4" />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  id={`section-${sectionIdx}-content`}
                  className={`px-2 pb-2 text-gray-200 text-base transition-all duration-300 ease-in-out ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {links.length > 0 ? (
                    <ProblemList
                      problems={links}
                      sectionIdx={sectionIdx}
                      checked={checked}
                      favorites={favorites}
                      onCheck={handleCheck}
                      onFavorite={handleFavorite}
                    />
                  ) : (
                    <p>{section.description}</p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DPSheetPage;
