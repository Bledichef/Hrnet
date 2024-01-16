import { createSlice } from "@reduxjs/toolkit";


export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        listOfEmployees: []
    },
    reducers: {
        addEmployee: (state, action) => {
            state.listOfEmployees.push(action.payload)
        }
    }
})

export const { addEmployee } = employeeSlice.actions
export default employeeSlice.reducer;