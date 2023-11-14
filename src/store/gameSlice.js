import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameState: "learn",
    currQuestion: 0,
    score: 0,
    gameLevel: null,
    gameLanguage: null,
  },
  reducers: {
    setGameState: (state, action) => {
      state.gameState = action.payload;
    },
    setCurrQuestion: (state, action) => {
      state.currQuestion = action.payload;
    },
    setNextQuestion: (state, action) => {
      state.currQuestion = state.currQuestion + 1;
    },
    setPrevQuestion: (state, action) => {
      state.currQuestion = state.currQuestion - 1;
    },

    setScore: (state, action) => {
      state.score = state.score + 1;
    },

    setZeroScore: (state, action) => {
      state.score = action.payload;
    },

    setGameLevel: (state, action) => {
      state.gameLevel = action.payload;
    },

    setGameLanguage: (state, action) => {
      state.gameLanguage = action.payload;
    },
  },
});

export const {
  setGameState,
  setCurrQuestion,
  setNextQuestion,
  setPrevQuestion,
  setScore,
  setZeroScore,
  setGameLevel,
  setGameLanguage,
} = gameSlice.actions;

export const gameState = (state) => state.game.gameState;

export const currQuestion = (state) => state.game.currQuestion;

export const score = (state) => state.game.score;

export const gameLevel = (state) => state.game.gameLevel;

export const gameLanguage = (state) => state.game.gameLanguage;

export default gameSlice.reducer;
