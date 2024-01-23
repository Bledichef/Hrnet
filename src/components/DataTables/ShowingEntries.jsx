import React from "react";
import PropTypes from "prop-types";

/*
 * Display dynamically the number of entries
 * Based on pages, total number of entries, search result
 */
const ShowingEntries = ({
  minShow,
  maxShow,
  totalEntries,
  isSearching,
  minFilteredShow,
  maxFilteredShow,
  totalEntriesShow,
}) => {
  return (
    <div className="dtb-showing">
      {isSearching ? (
        <span>{`Showing ${minFilteredShow} to ${maxFilteredShow} of ${totalEntriesShow} entries (filtered from ${totalEntries} total entries)`}</span>
      ) : (
        <span>{`Showing ${minShow} to ${maxShow} of ${totalEntries} entries`}</span>
      )}
    </div>
  );
};

ShowingEntries.propTypes = {
  minShow: PropTypes.number.isRequired,
  maxShow: PropTypes.number.isRequired,
  totalEntries: PropTypes.number.isRequired,
  minFilteredShow: PropTypes.number.isRequired,
  maxFilteredShow: PropTypes.number.isRequired,
  totalEntriesShow: PropTypes.number.isRequired,
  isSearching: PropTypes.bool,
};

export default ShowingEntries;