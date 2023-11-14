import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userState: null,
    users: [],
  },
  reducers: {
    login: (state, action) => {
      state.userState = action.payload;
    },
    logout: (state) => {
      state.userState = null;
    },
    setUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { login, logout, setUsers } = userSlice.actions;

export const selectUser = (state) => state.user.userState;

export const currentUsers = (state) => state.user.users;

export default userSlice.reducer;
