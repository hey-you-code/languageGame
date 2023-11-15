import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState: {
        leaderboardLanguage : null,
        leaderboardLevel: null,
    },
    reducers : {
        setLeaderboardLanguage : (state, action) => {
            state.leaderboardLanguage = action.payload
        },
        setLeaderboardLevel : (state, action) => {
            state.leaderboardLevel = action.payload
        }
    }
})

export const {setLeaderboardLanguage, setLeaderboardLevel} = leaderboardSlice.actions; 

export const leaderboardLanguage = (state) => state.leaderboard.leaderboardLanguage;

export const leaderboardLevel = (state) => state.leaderboard.leaderboardLevel;

export default leaderboardSlice.reducer;