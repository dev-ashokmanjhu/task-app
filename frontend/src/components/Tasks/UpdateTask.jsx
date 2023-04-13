import React, { useEffect } from "react";
import Modal from "../Modal/Modal";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTask = () => {
  const navigate = useNavigate();
  // const [enteredName, setEnteredName] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredTaskStatus, setEnteredTaskStatus] = useState(false);
  const [task, setTask] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3000/tasks/${id}`).then((res) => {
      setEnteredDescription(res.data.description);
      setEnteredTaskStatus(res.data.completed.toString());
    });
    // setEnteredName(task.name);
  }, []);

  const updateTaskHandler = (e) => {
    e.preventDefault();
    const data = {
      // name: enteredName,
      description: enteredDescription,
      completed: enteredTaskStatus,
    };
    axios
      .put(`http://localhost:3000/task/${id}`, data)
      .then((res) => {
        toast("Task Updated");
        navigate("/");
        // localStorage.removeItem("token");
        // localStorage.setItem("token", res?.data?.token);
        // dispatch(login());
        // navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal>
      <div className="flex justify-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Update Task
            </h5>
            {/* <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
                required
                onChange={(e) => setEnteredName(e.target.value)}
              />
            </div> */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={enteredDescription}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setEnteredDescription(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="boolean"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Completed
              </label>
              <input
                type="text"
                name="boolean"
                id="boolean"
                value={enteredTaskStatus}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e) => setEnteredTaskStatus(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={updateTaskHandler}
            >
              Update Task
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateTask;