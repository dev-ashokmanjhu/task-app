import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      toast("Login Successfully");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    },
    logout(state) {
      state.isAuthenticated = false;
      toast("Logout Successfully");
      axios.defaults.headers.common["Authorization"] = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
