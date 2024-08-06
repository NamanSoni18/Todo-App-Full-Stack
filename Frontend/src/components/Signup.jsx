import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const oldName = useRef("");
  const oldEmail = useRef("");
  const oldPassword = useRef("");
  const navigate = useNavigate();

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = oldName.current.value;
    const email = oldEmail.current.value;
    const password = oldPassword.current.value;
    console.log(name, email, password);

    try {
      const response = await axios.post(
        "/api/signup",
        {
          name,
          email,
          password,
        },
        {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      notifySuccess("Signup Successful");
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);

      if (error.response && error.response.status === 401) {
        notifyError(error.response.data.message);
      } else {
        notifyError("Incorrect Password");
      }
    }
  };
  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter Your Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              ref={oldName}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              ref={oldEmail}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              ref={oldPassword}
              id="password"
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
export default Signup;
