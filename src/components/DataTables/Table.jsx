import React from "react";
import PropTypes from "prop-types";

import { generateID } from "./utils";

/*
 * Table displaying the entries
 */
const Table = ({
  labels,
  data,
  minShow,
  maxShow,
  handleSort,
  sort,
  sortedData,
}) => {
  const { column, isDesc } = sort;

  return (
    <table className="dtb-table">
      <thead>
        <tr className="dtb-table-header-row">
          {/* First row of labels*/}
          {labels.map((label) => (
            <th
              key={generateID()}
              className="dtb-table-header-cell"
              onClick={() => handleSort(label.value)}
            >
              <div className="dtb-table-header-cell-content">
                <span>{label.text}</span>
                <div className="dtb-table-header-cell-icons">
                  <div
                    className={
                      column === label.value
                        ? !isDesc
                          ? "dtb-table-arrow-up active"
                          : "dtb-table-arrow-up inactive"
                        : "dtb-table-arrow-up"
                    }
                  ></div>
                  <div
                    className={
                      column === label.value
                        ? isDesc
                          ? "dtb-table-arrow-down active"
                          : "dtb-table-arrow-down inactive"
                        : "dtb-table-arrow-down"
                    }
                  ></div>
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* if the table is empty */}
        {sortedData.length === 0 && (
          <tr>
            <td className="dtb-table-row-nomatch" colSpan={labels.length}>
              No matching records found
            </td>
          </tr>
        )}
        {/* Display only the data in the current page */}
        {data.map((elt, index) => {
          if (index + 1 >= minShow && index < maxShow) {
            return (
              <tr key={generateID()} className="dtb-table-row">
                {Object.values(elt).map((value, j) => (
                  <td
                    key={generateID()}
                    className={
                      j === 0 ? "dtb-table-cell first-cell" : "dtb-table-cell"
                    }
                  >
                    {value}
                  </td>
                ))}
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sortedData: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  minShow: PropTypes.number.isRequired,
  maxShow: PropTypes.number.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default Table;