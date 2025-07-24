// src/components/buttons/Checkbox.jsx

import React from "react";
import PropTypes from "prop-types";

/**
 * Custom Checkbox component.
 * @param {boolean} checked - Checkbox state.
 * @param {function} onChange - Handler for changes.
 * @param {string} id - Element ID for accessibility/label.
 * @param {string} [className] - Additional classes.
 */
function Checkbox({ checked, onChange, id, className = "" }) {
  return (
    <input
      type="checkbox"
      id={id}
      className={`accent-amber-400 w-5 h-5 ${className}`}
      checked={checked}
      onChange={onChange}
    />
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
