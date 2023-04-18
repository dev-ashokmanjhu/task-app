import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, data);

      return { user: response?.data?.user, token: response?.data?.token };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);
export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, data);
      return { user: response?.data?.user, token: response?.data?.token };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getUser = createAsyncThunk("getUser", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/me`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      toast.success("Login Successfully");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {};
      localStorage.removeItem("token");
      toast.warn("Logout Successfully");
      axios.defaults.headers.common["Authorization"] = "";
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      toast.success("Login Successfully");
      localStorage.removeItem("token");
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    },
    [loginUser.rejected]: (state, action) => {
      toast.error(action.payload);
      throw new Error(action.payload);
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      toast.success("Register Successfully");
      localStorage.removeItem("token");
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    },
    [registerUser.rejected]: (state, action) => {
      toast.success(action.payload);
      throw new Error(action.payload);
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      toast.success("Update Successfully");
    },
    [updateUser.rejected]: (state, action) => {
      toast.error(action.payload);
      throw new Error(action.payload);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
