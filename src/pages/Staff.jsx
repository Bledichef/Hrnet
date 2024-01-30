import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../components/Table';
import List from "../data/List.json";

/**
 * The page with all the employees
 * Call the Table component with props listOfEmployees (get in state redux with useSelector)
 * @returns {JSX} - React Page
 */
const Employee = () => {
    const listOfEmployees = useSelector((state) => state?.employee?.listOfEmployees)
   // const listOfEmployees = List;
    return (
        <div>
             <Table listOfEmployees={listOfEmployees} />
           
        </div>
    );
};

export default Employee;