import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import userReducer from "./userReducer";
import listingReducer from "./listingReducer";

export default combineReducers({
    messageReducer,
    userReducer,
    listingReducer
});