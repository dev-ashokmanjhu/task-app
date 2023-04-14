import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../UI/Spinner";
import { BASE_URL } from "../../utils/constants";

const AllTasks = () => {
  const [tasks, setTasks] = useState(null);
  const getTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      await setTasks(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const taskDeleteHandler = useCallback((id) => {
    axios
      .delete(`${BASE_URL}/task/${id}`)
      .catch((err) => toast(err?.response?.data?.meassage));
    getTasks();
    toast.warn("Task Deleted");
  }, []);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    getTasks();
  }, [taskDeleteHandler]);

  if (!tasks) {
    return <Spinner color="white" />;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[90%] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Your Tasks
            </h5>
          </div>
          {tasks.length === 0 ? (
            <>
              <h1 className="text-center">You Have't added Task</h1>
              <Link to={`/newtask`}>
                <div className="text-center border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-200">
                  Add Task
                </div>
              </Link>
            </>
          ) : (
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {tasks.map((task) => {
                  return (
                    <li className="py-3 sm:py-4" key={task._id}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png"
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {task.description}
                          </p>
                          {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {task.description}
                      </p> */}
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {task.completed ? "Done" : "In Proggress"}
                        </div>
                        <Link to={`/updatetask/${task._id}`}>
                          <div className="border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-200">
                            Edit
                          </div>
                        </Link>
                        <div
                          className="border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200"
                          onClick={() => taskDeleteHandler(task._id)}
                        >
                          Delete
                        </div>
                        {/* {isUpdating && (
                        <UpdateTask
                          onClose={onClose}
                          id={task._id}
                          task={task}
                        />
                      )} */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTasks;
