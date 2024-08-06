import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserStoreData } from "../store/user-store-data";

const TodoList = () => {
  const date = new Date().toLocaleDateString("en-US");
  console.log(date);
  const navigate = useNavigate();
  const location = useLocation();
  const [todo, setTodo] = useState([]);
  const token = localStorage.getItem("token");
  const { notifySuccess, notifyError} = useContext(UserStoreData);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get("/api/todo", {
          headers: {
            "x-auth-token": token,
          },
          signal: signal,
        });
        setTodo(response.data.todos);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response.data.message);
        }
      }
    })();
    return () => {
      controller.abort();
    };
  }, []);

  console.log(todo);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api/todo", {
        headers: {
          "x-todo-id": id,
        },
      });
      notifySuccess("Todo Deleted Successfully");
      setTodo((prevTodos) => prevTodos.filter(todo => todo._id !== id));
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row g-5">
          {todo.map((item) => (
            <div
              key={item._id}
              className="col-lg-4 col-md-6 col-sm-12 col-xl-3"
            >
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.task}</p>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
                <div className="card-footer text-muted">
                  {new Date(item.edate).toLocaleDateString("de-DE")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
