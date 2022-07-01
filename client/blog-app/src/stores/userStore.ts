import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";

const store = configureStore({
    reducer: userReducer,
    preloadedState: {
        email: '',
        password: '',
        isLoggedIn: false,
    },
});

export default store;
