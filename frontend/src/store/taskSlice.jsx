import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const res = await axios.get(`${BASE_URL}/tasks`);
  return res.data;
});
export const createTask = createAsyncThunk(
  "createTask",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/task`, data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const taskSlice = createSlice({
  name: "products",
  initialState: {
    tasks: [],
    status: null,
  },
  extraReducers: {
    [fetchTasks.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.status = "success";
    },
    [fetchTasks.rejected]: (state) => {
      state.status = "failed";
    },
    [createTask.fulfilled]: (state) => {
      toast.success("Task Created");
    },
    [createTask.rejected]: (state, action) => {
      toast.success(action.payload);
      throw new Error(action.payload);
    },
  },
});

export default taskSlice.reducer;
