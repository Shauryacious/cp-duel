// src/components/Progress/ProgressBar.jsx

import React from "react";
import PropTypes from "prop-types";

/**
 * Standard horizontal progress bar for lists, sections, or tasks.
 *
 * @param {number} value - Progress as a percentage (0–100).
 * @param {string} [className] - Additional classes for outer container.
 * @param {string} [barClassName] - Additional classes for inner bar.
 * @param {React.ReactNode} [children] - Optional content adjacent to the bar.
 */
function ProgressBar({ value, className = "", barClassName = "", children }) {
  return (
    <div
      className={`relative h-3 w-full rounded-full bg-gray-700 overflow-hidden ${className}`}
    >
      <div
        className={`absolute h-full rounded-full bg-amber-400 transition-all duration-500 ${barClassName}`}
        style={{ width: `${value}%` }}
      />
      {children && (
        <div className="relative z-10 flex items-center h-full px-2">
          {children}
        </div>
      )}
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  barClassName: PropTypes.string,
  children: PropTypes.node,
};

export default ProgressBar;
