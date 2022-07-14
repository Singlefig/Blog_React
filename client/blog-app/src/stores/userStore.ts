import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";

const store = configureStore({
    reducer: userReducer,
    preloadedState: {
        data: [
            {
                name: '',
                surname: '',
                email: '',
                password: '',
                isLoggedIn: false,
            },
        ],
    },
});

export default store;
