import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
// import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // task: taskSlice,
    product: taskSlice,
  },
});

export default store;
