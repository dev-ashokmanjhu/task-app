import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AddTask from "./components/Tasks/AddTask";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import UpdateTask from "./components/Tasks/UpdateTask";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import { login } from "./store/authSlice";
import UpdateProfile from "./components/Profile/UpdateProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    if (localStorage.getItem("token")) {
      dispatch(login());
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/newtask",
        element: <AddTask />,
      },
      {
        path: "/updatetask/:id",
        element: <UpdateTask />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/updateprofile",
        element: <UpdateProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <React.StrictMode></React.StrictMode>
    </RouterProvider>
  </Provider>
);
