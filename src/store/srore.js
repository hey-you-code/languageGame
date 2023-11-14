import {configureStore} from "@reduxjs/toolkit";
import gameStateReducer from "./gameSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        game: gameStateReducer,
        user: userReducer,
    }
})