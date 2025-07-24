// src/layout/SheetPageLayout.jsx

import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import FavoriteList from "@/components/FavoriteList/FavoriteList";
import CircularProgressBar from "@/components/Progress/CircularProgressBar";
import ProblemList from "@/components/ProblemList/ProblemList";

/**
 * Generic layout for problem sheets (DP, Graph, Tree, etc).
 *
 * @param {Object} props
 * @param {string} props.title - Sheet title to display in header.
 * @param {string} props.tagline - Tagline or subtitle below title.
 * @param {Array} props.sections - Array of problem sections to render.
 * @param {(sectionIdx: number, problemIdx: number) => void} props.onCheck - Called when problem checked toggled.
 * @param {(sectionIdx: number, problemIdx: number, url: string) => void} props.onFavorite - Called when favorite toggled.
 * @param {Object<string, boolean>} props.checked - Checked state map.
 * @param {Object<string, Object>} props.favorites - Favorites map.
 */
function SheetPageLayout({
  title,
  tagline,
  sections,
  checked,
  favorites,
  onCheck,
  onFavorite,
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleSection = useCallback((idx) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  }, []);

  const totalProblems = useMemo(
    () =>
      sections.reduce((sum, section) => sum + (section.links?.length || 0), 0),
    [sections]
  );

  const totalSolved = useMemo(
    () =>
      sections.reduce(
        (sum, section, sectionIdx) =>
          sum +
          (section.links
            ? section.links.filter(
                (_, problemIdx) => checked[`${sectionIdx}-${problemIdx}`]
              ).length
            : 0),
        0
      ),
    [sections, checked]
  );

  const overallPercent =
    totalProblems === 0 ? 0 : Math.round((totalSolved / totalProblems) * 100);

  const favoriteProblems = useMemo(() => Object.values(favorites), [favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              <span className="text-amber-400 drop-shadow">{title}</span>
            </h1>
            {tagline && (
              <p className="text-lg text-white italic font-medium">{tagline}</p>
            )}
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
          onFavorite={onFavorite}
          visible={showFavorites}
        />

        {/* Sections Accordion */}
        <div className="space-y-6">
          {sections.map((section, sectionIdx) => {
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
                      onCheck={onCheck}
                      onFavorite={onFavorite}
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

SheetPageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      links: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  checked: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

SheetPageLayout.defaultProps = {
  tagline: "",
};

export default SheetPageLayout;
