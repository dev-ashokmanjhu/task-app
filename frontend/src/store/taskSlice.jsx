import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const taskSlice = createSlice({
//   name: "task",
//   initialState: {
//     tasks: [],
//   },
//   reducers: {
//     fetchtasks: async (state, actions) => {
//       console.log(actions.payload);
//       return (state = {
//         tasks: actions.payload,
//       });
//       // state.tasks = actions.payload;
//       console.log(state.tasks);
//     },
//   },
// });

// export const { fetchtasks } = taskSlice.actions;

// export default taskSlice.reducer;
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await axios.get("http://localhost:3000/tasks");
    console.log(res);
    return { data: res.data, status: res.status };
  }
);

const getProductsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      console.log("produtcts payload: ", payload.data);
      state.list = payload.data;
      state.status = "success";
      console.log(state.list);
    },
    [getProducts.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default getProductsSlice.reducer;
