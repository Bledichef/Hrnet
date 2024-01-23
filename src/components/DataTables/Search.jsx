import React from "react";
import PropTypes from "prop-types";

import { normalizeText } from "./utils";

/*
 * Search a string accross all the entries
 */
const Search = ({ data, handleDisplayedData, handleIsSearching }) => {
  // Filter the data to display based on typed value
  const handleSearch = (evt) => {
    const value = normalizeText(evt.target.value);
    if (value.length > 0) {
      const dataToDisplay = data.filter((elt) => {
        const values = Object.values(elt)
          .map((val) => normalizeText(val))
          .join(" ");
        return values.includes(value);
      });
      handleDisplayedData(dataToDisplay);
      handleIsSearching(true);
    } else {
      handleDisplayedData(data);
      handleIsSearching(false);
    }
  };

  return (
    <div className="dtb-search">
      <label htmlFor="dtb-search">{`Search: `}</label>
      <input
        type="text"
        id="dtb-search"
        name="dtb-search"
        onChange={(evt) => handleSearch(evt)}
      />
    </div>
  );
};

Search.propTypes = {
  data: PropTypes.array.isRequired,
  handleDisplayedData: PropTypes.func.isRequired,
  handleIsSearching: PropTypes.func.isRequired,
};

export default Search;