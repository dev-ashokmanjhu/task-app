import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/me")
      .then((res) => {
        setUser(res?.data);
      })
      .catch((err) => toast(err?.response?.data?.meassage));
  }, []);
  const deleteProfileHandler = () => {
    axios.delete("http://localhost:3000/users/me").then((res) => {
      toast.error("User Deleted Successfully!");
      navigate("/login");
    });
  };
  const logoutAllHandler = () => {
    axios.post("http://localhost:3000/users/logoutAll").then((res) => {
      dispatch(logout());
      toast.error("User LogOut From all Devices Successfully!");
      navigate("/login");
    });
  };
  return (
    <div className="mt-20 flex justify-center">
      <div className="card  min-w-sm border border-gray-700 bg-gray-700 text-gray-50   transition-shadow shadow-xl hover:shadow-xl min-w-max">
        <div className="flex items-center p-4">
          <div className="relative flex flex-col items-center w-full">
            <div className="h-24 w-24 md rounded-full relative avatar items-end justify-end text-purple-400 min-w-max -top-16 flex bg-purple-200 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">
              <img
                className="h-24 w-24 md rounded-full relative"
                src="https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png"
                alt=""
              />
              <div className="absolute"></div>
            </div>
            <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
              <span className="text-md whitespace-nowrap text-gray-50 font-semibold">
                {user.name}
              </span>
              <span className="text-md whitespace-nowrap text-gray-100">
                {user.email}
              </span>
              <p className="text-sm text-gray-200">
                I can't start my day without Code...
              </p>
              <div className="py-2 flex space-x-2">
                <Link to="/newtask">
                  <button className="justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-400 text-purple-400 hover:border-purple-500 px-4 py-1 flex items-center hover:shadow-lg">
                    <span className="mr-2"></span>Create Task
                    <span className="ml-2"></span>
                  </button>
                </Link>
                <Link to="/updateprofile">
                  <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max text-gray-100 bg-green-500 hover:bg-green-600 px-4 py-1 items-center hover:shadow-lg">
                    <span className="mr-2"></span>
                    Edit <span className="ml-2"></span>
                  </button>
                </Link>
              </div>
              <div className="py-2 flex space-x-2">
                <button
                  className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-red-400 text-red-400 hover:border-red-500 px-4 py-1 items-center hover:shadow-lg"
                  onClick={logoutAllHandler}
                >
                  <span className="mr-2"></span>Log Out All
                  <span className="ml-2"></span>
                </button>
                <button
                  className="justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max text-gray-100 bg-red-500 hover:bg-red-600 px-4 py-1 flex items-center hover:shadow-lg"
                  onClick={deleteProfileHandler}
                >
                  <span className="mr-2"></span>
                  Delete Profile<span className="ml-2"></span>
                </button>
              </div>
              <div className="py-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid">
                <span className="text-center px-2">
                  <span className="font-bold text-gray-50">56</span>
                  <span className="text-gray-100"> Task</span>
                </span>
                <span className="text-center px-2">
                  <span className="font-bold text-gray-50">112</span>
                  <span className="text-gray-100"> Completed</span>
                </span>
                <span className="text-center px-2">
                  <span className="font-bold text-gray-50">27</span>
                  <span className="text-gray-100"> Pending</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
