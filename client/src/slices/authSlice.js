import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("accessToken");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!token,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
