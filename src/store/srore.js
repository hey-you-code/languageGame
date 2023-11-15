import {configureStore} from "@reduxjs/toolkit";
import gameStateReducer from "./gameSlice";
import userReducer from "./userSlice";
import leaderboardReducer from "./leaderboardSlice";

export const store = configureStore({
    reducer: {
        game: gameStateReducer,
        user: userReducer,
        leaderboard: leaderboardReducer,
    }
})