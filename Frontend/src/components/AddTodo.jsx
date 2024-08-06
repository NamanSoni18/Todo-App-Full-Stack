import { useContext, useRef } from "react";
import { UserStoreData } from "../store/user-store-data";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTodo = () => {
  const oldTitle = useRef("");
  const oldTask = useRef("");
  const oldDue = useRef("");
  const { notifySuccess, notifyError } = useContext(UserStoreData);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = oldTitle.current.value;
    const task = oldTask.current.value;
    const due = oldDue.current.value;
    const token = localStorage.getItem("token");
    console.log(title, task, due);

    try {
      const response = axios.post(
        "/api/todo",
        {
          title,
          task,
          due,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      notifySuccess("Todo Added");
      navigate("/");
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              ref={oldTitle}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              name="task"
              ref={oldTask}
              id="task"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="due" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              name="due"
              ref={oldDue}
              id="due"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTodo;
