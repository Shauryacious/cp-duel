// src/components/FavoriteList/FavoriteList.jsx

import React from "react";
import PropTypes from "prop-types";
import { extractProblemName } from "@/utils/url";
import FavoriteButton from "@/components/buttons/FavoriteButton";

/**
 * Renders a list of favorited problems.
 *
 * @param {Object} props
 * @param {Array<{sectionIdx: number, problemIdx: number, url: string}>} props.favoriteProblems - Array of favorite problem info.
 * @param {(sectionIdx: number, problemIdx: number, url: string) => void} props.onFavorite - Handler for toggling favorite status.
 * @param {boolean} props.visible - Whether to show the list.
 * @returns {JSX.Element|null} The favorite list component or null if not visible.
 */
function FavoriteList({ favoriteProblems, onFavorite, visible }) {
  if (!visible) return null;

  return (
    <section aria-label="Favorite Problems List" className="mb-10">
      <h2 className="text-2xl font-bold text-amber-400 mb-2">⭐ Favorites</h2>
      {favoriteProblems.length === 0 ? (
        <p className="text-gray-400 italic mb-4" role="alert">
          No favorites yet. Click the star next to a problem to add it here!
        </p>
      ) : (
        <ul className="space-y-3 mb-4">
          {favoriteProblems.map(({ sectionIdx, problemIdx, url }) => (
            <li
              key={`${sectionIdx}-${problemIdx}`}
              className="flex items-center gap-2"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300 font-medium transition"
                aria-label={`Open problem ${extractProblemName(
                  url
                )} in a new tab`}
              >
                {extractProblemName(url)}
              </a>
              <FavoriteButton
                isActive={true}
                onClick={() => onFavorite(sectionIdx, problemIdx, url)}
                title="Remove from favorites"
                aria-label={`Remove ${extractProblemName(url)} from favorites`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

FavoriteList.propTypes = {
  favoriteProblems: PropTypes.arrayOf(
    PropTypes.shape({
      sectionIdx: PropTypes.number.isRequired,
      problemIdx: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFavorite: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default React.memo(FavoriteList);
