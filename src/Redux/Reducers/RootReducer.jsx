import { combineReducers } from "@reduxjs/toolkit";
import MaincategoryReducer from "./MaincategoryReducer";

export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
})