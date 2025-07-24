// src/components/ProblemList/ProblemList.jsx

import React from "react";
import PropTypes from "prop-types";
import ProblemItem from "@/components/ProblemList/ProblemItem";

/**
 * Renders a list of problem items with checkboxes and favorite buttons.
 *
 * @param {Object} props
 * @param {string[]} props.problems - Array of problem URLs.
 * @param {number} props.sectionIdx - Section index for uniquely identifying problems.
 * @param {Object<string, boolean>} props.checked - Object mapping problem keys to checked status.
 * @param {Object<string, { sectionIdx: number, problemIdx: number, url: string }>} props.favorites - Object mapping problem keys to favorite info.
 * @param {(sectionIdx: number, problemIdx: number) => void} props.onCheck - Handler for checkbox toggle.
 * @param {(sectionIdx: number, problemIdx: number, url: string) => void} props.onFavorite - Handler for favorite toggle.
 *
 * @returns {JSX.Element} The rendered ProblemList component.
 */
function ProblemList({
  problems,
  sectionIdx,
  checked,
  favorites,
  onCheck,
  onFavorite,
}) {
  return (
    <ul className="space-y-2 mt-2" role="list">
      {problems.map((url, problemIdx) => {
        const key = `${sectionIdx}-${problemIdx}`;
        return (
          <ProblemItem
            key={key}
            url={url}
            sectionIdx={sectionIdx}
            problemIdx={problemIdx}
            checked={!!checked[key]}
            favorite={!!favorites[key]}
            onCheck={onCheck}
            onFavorite={onFavorite}
          />
        );
      })}
    </ul>
  );
}

ProblemList.propTypes = {
  problems: PropTypes.arrayOf(PropTypes.string).isRequired,
  sectionIdx: PropTypes.number.isRequired,
  checked: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default React.memo(ProblemList);
