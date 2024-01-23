import React, { useState } from 'react';
import stateData from '../data/stateData';
import departmentData from '../data/departementData';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../feature/employe.slice';
import  Modal from './Modal';

/**
 * form component for create a new employee and add data in redux
 * Use library for modal = library-modal
 * @returns {JSX} - React component
 */
const Form = () => {
    const dispatch = useDispatch();

    /**
     * state for each field of the form -> define empty and update onChange on field with the set
     */
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [startDate, setStartDate] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState(0)
    const [department, setDepartment] = useState("")

    const [show, setShow] = useState(false)
    const [created, setCreated] = useState(false) //création de l'employé à eu lieu

    /**
     * Object newEmployee with all fields (get onChange in each fields, with the state)
     */
    const newEmployee = {
        firstname,
        lastname,
        startDate,
        department,
        dateOfBirth,
        street,
        city,
        state,
        zipCode,
    }

    /**
     * Function called on change in input birthdate, for verify date (existing date + age between 18 and 70 years old)
     */
    const checkDate = () => {
        const inputBirthday = document.querySelector("#date-of-birth").value
        const date = inputBirthday.split("-")
        const year = parseInt(date[0]);
        const month = parseInt(date[1]);
        const day = parseInt(date[2]);
        const dateCurrent = new Date();
        const yearCurrent = dateCurrent.getFullYear();
        const monthCurrent = dateCurrent.getMonth() + 1;
        const dayCurrent = dateCurrent.getDate()

        const age = yearCurrent - year;

        if (year > yearCurrent) {
            document.querySelector(".error-date").innerHTML = "This date isn't possible, there is an error"
        } else if (yearCurrent === year && month > monthCurrent) {
            document.querySelector(".error-date").innerHTML = "This date isn't possible, there is an error"
        } else if (yearCurrent === year && month === monthCurrent && day > dayCurrent) {
            document.querySelector(".error-date").innerHTML = "This date isn't possible, there is an error"
        } else {
            document.querySelector(".error-date").innerHTML = "This employee is too young, there is an error in the date"
        }
        if (year < yearCurrent) {
            if (age < 18) {
                document.querySelector(".error-date").innerHTML = "This employee is too young, there is an error in the date"
            } else if (age > 70) {
                document.querySelector(".error-date").innerHTML = "This employee is too old, there is an error in the date"
            } else {
                document.querySelector(".error-date").innerHTML = ""
                return true
            }
        }
    }

    /**
     * function call onClick the submit button
     * If one field is empty -> update state created on false (=for show modal with props : "have to complete all fields") + update state Show on true 
     * If all fields is complete -> update state created on true (=for show modal with props : "employee is create") + update state Show on true + use dispatch for add employee in redux
     */
    const submitCreateEmployee = (e) => {
        const inputFirstname = document.querySelector("#firstName").value
        const inputLastname = document.querySelector("#lastName").value
        const inputBirthday = document.querySelector("#date-of-birth").value
        const inputStartDate = document.querySelector("#start-date").value
        const inputStreet = document.querySelector("#street").value
        const inputCity = document.querySelector("#city").value
        const inputState = document.querySelector("#state").value
        const inputZipCode = document.querySelector("#zip-code").value
        const inputDepartment = document.querySelector("#department").value

        if (!inputFirstname || !inputLastname || !inputBirthday || !inputStartDate || !inputStreet || !inputCity || !inputState || !inputZipCode || !inputDepartment || !checkDate()) {
            setCreated(false)
            setShow(true)

        } else if (inputFirstname && inputLastname && inputBirthday && inputStartDate && inputStreet && inputCity && inputState && inputZipCode && inputDepartment && checkDate()) {
            setCreated(true)
            e.preventDefault()
            dispatch(addEmployee(newEmployee))
            setShow(true) // au click sur créer employé -> passe state à true = affiche la modale (dans conditions du return)
            document.form.reset()
        }
    }

    /**
     * Function call onClick for close the modal (change the state Show on false for hide the modal)
     */
    function hide() {
        setShow(false)
    }

    return (
        <div className='Form'>
            <form action="" className='formulaire' name='form'>
                <label htmlFor="firstName">First Name</label>
                <input onChange={(e) => setFirstname(e.target.value)} type="text" id="firstName" required />
                <label htmlFor="lastName">Last Name</label>
                <input onChange={(e) => setLastname(e.target.value)} type="text" id="lastName" required />
                <label htmlFor="date-of-birth">Date of Birth</label>
                <input onChange={(e) => [setDateOfBirth(e.target.value), checkDate()]} type="date" id='date-of-birth' required />
                <p className='error-date'></p>
                <label htmlFor="start-date">Start Date</label>
                <input onChange={(e) => setStartDate(e.target.value)} type="date" id='start-date' required />
                <fieldset className='address'>
                    <legend>Address</legend>
                    <label htmlFor="street">Street</label>
                    <input onChange={(e) => setStreet(e.target.value)} type="text" id="street" required />
                    <label htmlFor="city">City</label>
                    <input onChange={(e) => setCity(e.target.value)} type="text" id="city" required />
                    <label htmlFor='state'>State</label>
                    <select onChange={(e) => setState(e.target.value)} name='state' id='state' required>
                        {stateData.map(state => (
                            <option value={state?.label} key={state?.label} > {state?.name}</option>
                        ))}
                    </select>
                    <label htmlFor='zip-code'>Zip Code</label>
                    <input onChange={(e) => setZipCode(e.target.value)} id='zip-code' type="number" required />
                </fieldset>
                <label htmlFor='department'>Department</label>
                <select onChange={(e) => setDepartment(e.target.value)} name='department' id='department' required>
                    {departmentData.map(department => (
                        <option value={department?.label} key={department?.label} > {department?.name}</option>
                    ))}
                </select>
            </form>
            <button onClick={submitCreateEmployee} className='button-save'>Save</button>
            {/* If state Show is true and state CreateOk is false = one field is incomplete => show the modal with error message */}
            {show && !created && <Modal contentModal="You must complete all fields correctly !" hide={hide} />}
            {/* If state Show is true and state CreateOk is true = all fields is ok => show the modal with success message */}
            {show && created && <Modal contentModal="Employee Created!" hide={hide} />}
        </div >
    );
};

export default Form;