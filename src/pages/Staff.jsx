import React from 'react';
import { useSelector } from 'react-redux';


/**
 * The page with all the employees
 * Call the Table component with props listOfEmployees (get in state redux with useSelector)
 * @returns {JSX} - React Page
 */
const Employee = () => {
    const listOfEmployees = useSelector((state) => state?.employee?.listOfEmployees)

    return (
        <div>
           PAGE EMPLOYEE
        </div>
    );
};

export default Employee;