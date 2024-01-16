import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../feature/employe.slice"

export default configureStore({
    reducer: {
        employee: employeeReducer,
    }
})