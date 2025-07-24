// src/components/ProblemList/ProblemList.jsx

import React from "react";
import PropTypes from "prop-types";
import ProblemItem from "./ProblemItem";

/**
 * ProblemList renders list of problem URLs with checkboxes and favorite buttons.
 */
const ProblemList = ({
  problems,
  sectionIdx,
  checked,
  favorites,
  onCheck,
  onFavorite,
}) => {
  return (
    <ul className="space-y-2 mt-2">
      {problems.map((url, problemIdx) => {
        const key = `${sectionIdx}-${problemIdx}`;
        return (
          <ProblemItem
            key={url}
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
};

ProblemList.propTypes = {
  problems: PropTypes.arrayOf(PropTypes.string).isRequired,
  sectionIdx: PropTypes.number.isRequired,
  checked: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default ProblemList;
