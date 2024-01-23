import React from 'react';
import DataTables from "./DataTables"
import labelsData from '../data/labels';

/**
 * use  datatables with 2 props = labelsData(data mocked) and listOfEmployees(props in page Employee)
 * @param {Array} listOfEmployees - props 
 * @returns {JSX} - React component
 */
const Table = ({ listOfEmployees }) => {
    return (
        <div>
            {listOfEmployees && <DataTables labels={labelsData} data={listOfEmployees} />}
        </div>
    );
};

export default Table;