// src/components/Progress/CircularProgressBar.jsx

import React from "react";
import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/**
 * Renders a circular progress indicator.
 * @param {number} value - Percentage completed (0-100).
 * @param {string} text - Text inside the circle.
 * @param {object} [stylesOverride] - Custom style overrides.
 */
function CircularProgressBar({ value, text, stylesOverride = {} }) {
  return (
    <CircularProgressbar
      value={value}
      text={text}
      styles={buildStyles({
        pathColor: "#f59e42",
        textColor: "#fff",
        trailColor: "#333",
        textSize: "24px",
        strokeLinecap: "round",
        ...stylesOverride,
      })}
      strokeWidth={10}
    />
  );
}

CircularProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  stylesOverride: PropTypes.object,
};

CircularProgressBar.defaultProps = {
  text: "",
  stylesOverride: {},
};

export default CircularProgressBar;
