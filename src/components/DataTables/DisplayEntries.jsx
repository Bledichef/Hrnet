import React from "react";
import PropTypes from "prop-types";

/*
 * Select element to chose the number of rows to display
 */
const DisplayEntries = ({ value, handleChange }) => {
  return (
    <div className="dtb-entries">
      <label htmlFor="dtb-entries-select">{`Show `}</label>
      <select
        name="dtb-entries"
        id="dtb-entries-select"
        value={value}
        onChange={(evt) => handleChange(evt)}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span>{` entries`}</span>
    </div>
  );
};

DisplayEntries.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DisplayEntries;