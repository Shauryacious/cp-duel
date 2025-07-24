// src/components/ProblemList/ProblemItem.jsx

import React from "react";
import PropTypes from "prop-types";
import { extractProblemName, getPlatform } from "../../utils/url";
import platformLogos from "../../constants/platforms";
import Checkbox from "../buttons/Checkbox";
import FavoriteButton from "../buttons/FavoriteButton";

/**
 * Renders a single problem item row.
 * @param {object} props
 * @param {string} props.url - Problem URL.
 * @param {number} props.sectionIdx
 * @param {number} props.problemIdx
 * @param {boolean} props.checked
 * @param {boolean} props.favorite
 * @param {function} props.onCheck
 * @param {function} props.onFavorite
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
    <li className="flex items-center gap-3 bg-gray-700 rounded-lg px-3 py-2 hover:bg-gray-600 transition">
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
        >
          {extractProblemName(url)}
        </a>
        {platformLogo && (
          <img
            src={platformLogo}
            alt={platform}
            className="w-6 h-6 inline-block align-middle"
            style={{ minWidth: 24 }}
          />
        )}
      </label>
      <FavoriteButton
        isActive={favorite}
        onClick={() => onFavorite(sectionIdx, problemIdx, url)}
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

export default ProblemItem;
