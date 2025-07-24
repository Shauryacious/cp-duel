// src/components/Home/SheetList.jsx

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Renders a list of sheets as cards with icons, titles, descriptions, and links.
 *
 * @param {Object[]} sheets - Array of sheet objects to display.
 * @param {string} sheets[].title - Title of the sheet.
 * @param {string} sheets[].description - Short description of the sheet.
 * @param {string} sheets[].icon - Icon to display alongside sheet title.
 * @param {string} sheets[].link - URL path to the sheet page.
 *
 * @returns {JSX.Element} The rendered SheetList component.
 */
function SheetList({ sheets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {sheets.map(({ title, description, icon, link }) => (
        <div
          key={title}
          className="bg-gray-800 rounded-xl p-8 flex items-start gap-6 shadow-lg border border-gray-700 hover:scale-105 hover:border-amber-400 transition-all duration-200"
        >
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-gray-300 text-base mb-4">{description}</p>
            <Link
              to={link}
              className="inline-block bg-amber-400 text-gray-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-amber-300 transition text-base"
            >
              View Sheet
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

SheetList.propTypes = {
  sheets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SheetList;
