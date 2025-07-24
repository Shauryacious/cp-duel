// src/components/buttons/FavoriteButton.jsx

import React from "react";
import PropTypes from "prop-types";

/**
 * Favorite star button.
 * @param {boolean} isActive - Whether favorited or not.
 * @param {function} onClick - Click handler.
 * @param {string} [title] - Accessible/title text.
 */
function FavoriteButton({ isActive, onClick, title = "" }) {
  return (
    <button
      type="button"
      aria-label={
        title || (isActive ? "Remove from favorites" : "Add to favorites")
      }
      title={title || (isActive ? "Remove from favorites" : "Add to favorites")}
      className={`text-2xl focus:outline-none transition-colors ${
        isActive ? "text-amber-400" : "text-gray-500 hover:text-amber-300"
      }`}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {isActive ? "★" : "☆"}
    </button>
  );
}

FavoriteButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default FavoriteButton;
