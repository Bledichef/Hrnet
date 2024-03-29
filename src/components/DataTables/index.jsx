import React, { useState } from "react";
import PropTypes from "prop-types";

import "./DataTables.scss";
import { normalizeText } from "./utils";

import DisplayEntries from "./DisplayEntries";
import Search from "./Search";
import Table from "./Table";
import ShowingEntries from "./ShowingEntries";
import Pagination from "./Pagination";

/*
 * Main component of the library
 * DataTable base element
 */
const DataTables = ({ labels, data }) => {
  const initialState = data;
  const [entriesShown, setEntriesShown] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState(initialState);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState({
    column: "",
    isDesc: true,
  });

  const minShow = currentPage === 1 ? 1 : (currentPage - 1) * entriesShown + 1;
  const maxShow =
    currentPage * entriesShown < data.length
      ? currentPage * entriesShown
      : data.length;
  const minFilteredShow =
    currentPage === 1
      ? sortedData.length > 0
        ? 1
        : 0
      : (currentPage - 1) * entriesShown + 1;
  const maxFilteredShow =
    currentPage * entriesShown < sortedData.length
      ? currentPage * entriesShown
      : sortedData.length;

  // Handle the changes of displayed entries
  const handleEntriesChange = (evt) => {
    setEntriesShown(parseInt(evt.target.value));
    setCurrentPage(1);
  };

  // Handle the sorting data (column + asc / desc)
//   const handleSort = (label) => {
//     if (sort.column === label) {
//       setSort({
//         ...sort,
//         isDesc: !sort.isDesc,
//       });
//     } else {
//       setSort({
//         column: label,
//         isDesc: false,
//       });
//     }
const handleSort = (label) => {
  const newSort = {
    column: label,
    isDesc: sort.column === label ? !sort.isDesc : false,
  };
console.log("newSort:", newSort)
  setSort(newSort);

  const sorted = sorting(label, newSort.isDesc);
  setSortedData(sorted); 
};

  
const sorting = (label, isDesc) => {
  const sorted = data.slice().sort((a, b) => {

    console.log("Sorting by property:", label);


    if (!a.hasOwnProperty(label) || !b.hasOwnProperty(label)) {
      console.log("One of the properties is undefined");
      return 0;
    }


    const labelA = normalizeText(a[label]);
    const labelB = normalizeText(b[label]);

    console.log("labelA:", labelA);
    console.log("labelB:", labelB);

    if (labelA === undefined || labelB === undefined) {
      console.log("One of the normalized values is undefined");
      return 0;
    }

    if (isDesc) {
      if (labelA < labelB) return -1;
      if (labelA > labelB) return 1;
    } else {
      if (labelA < labelB) return 1;
      if (labelA > labelB) return -1;
    }

    return 0;
  });

  console.log("sorted:", sorted);

  return sorted;
};









  return (
    <div className="dtb">
      <DisplayEntries value={entriesShown} handleChange={handleEntriesChange} />
      <Search
        data={data}
        handleDisplayedData={setSortedData}
        handleIsSearching={setIsSearching}
      />
      <Table
        labels={labels}
        data={sortedData}
        minShow={minShow}
        maxShow={maxShow}
        handleSort={handleSort}
        sort={sort}
        sortedData={sortedData}
      />
      <ShowingEntries
        minShow={minShow}
        maxShow={maxShow}
        totalEntries={data.length}
        isSearching={isSearching}
        minFilteredShow={minFilteredShow}
        maxFilteredShow={maxFilteredShow}
        totalEntriesShow={sortedData.length}
      />
      <Pagination
        totalEntries={sortedData.length}
        displayedEntries={entriesShown}
        handleClick={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

DataTables.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default DataTables;