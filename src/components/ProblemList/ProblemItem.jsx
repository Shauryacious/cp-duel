// src/components/ProblemList/ProblemItem.jsx

import React from "react";
import PropTypes from "prop-types";
import { extractProblemName, getPlatform } from "@/utils/url";
import platformLogos from "@/constants/platforms";
import Checkbox from "@/components/buttons/Checkbox";
import FavoriteButton from "@/components/buttons/FavoriteButton";

/**
 * Renders a single problem item row with a checkbox, problem link, platform logo, and favorite toggle.
 *
 * @param {Object} props
 * @param {string} props.url - The URL of the problem.
 * @param {number} props.sectionIdx - Index of the section for unique identification.
 * @param {number} props.problemIdx - Index of the problem within the section.
 * @param {boolean} props.checked - Whether the problem is marked as solved.
 * @param {boolean} props.favorite - Whether the problem is favorited.
 * @param {(sectionIdx: number, problemIdx: number) => void} props.onCheck - Callback when checkbox is toggled.
 * @param {(sectionIdx: number, problemIdx: number, url: string) => void} props.onFavorite - Callback when favorite button is toggled.
 *
 * @returns {JSX.Element} The rendered problem item.
 */
function ProblemItem({
  url,
  sectionIdx,
  problemIdx,
  checked,
  favorite,
  onCheck,
  onFavorite,
}) {
  const platform = getPlatform(url);
  const platformLogo = platformLogos[platform];
  const checkboxId = `sheet-${sectionIdx}-${problemIdx}`;

  return (
    <li
      className="flex items-center gap-3 bg-gray-700 rounded-lg px-3 py-2 hover:bg-gray-600 transition"
      role="listitem"
    >
      <Checkbox
        id={checkboxId}
        checked={checked}
        onChange={() => onCheck(sectionIdx, problemIdx)}
      />
      <label
        htmlFor={checkboxId}
        className="flex-1 cursor-pointer flex items-center gap-2"
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-amber-300 font-medium transition"
          aria-label={`Open problem ${extractProblemName(url)}`}
        >
          {extractProblemName(url)}
        </a>
        {platformLogo && (
          <img
            src={platformLogo}
            alt={`${platform} logo`}
            className="w-6 h-6 inline-block align-middle"
            style={{ minWidth: 24 }}
          />
        )}
      </label>
      <FavoriteButton
        isActive={favorite}
        onClick={() => onFavorite(sectionIdx, problemIdx, url)}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      />
    </li>
  );
}

ProblemItem.propTypes = {
  url: PropTypes.string.isRequired,
  sectionIdx: PropTypes.number.isRequired,
  problemIdx: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  favorite: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default React.memo(ProblemItem);
