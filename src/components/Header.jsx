import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../asset/logo.webp"

/**
 * Header component call in header
 * Add the navigation between page Home (create employee) and page Employee (view employees)
 * @returns {JSX} - React component
 */
const Header = () => {
    return (
        <header className='Header'>
            <NavLink to="/" >
                <img src={logo} className="logo" alt="HRnet logo" />
            </NavLink>
            <div className='navigation'>
                <NavLink to={"/"} className={(nav) => (nav.isActive ? 'nav-active' : 'nav')}>Create Employee</NavLink>
                <NavLink to={"/Staff"} className={(nav) => (nav.isActive ? 'nav-active' : 'nav')}>View Current Employees</NavLink>
            </div>

        </header>
    );
};

export default Header;