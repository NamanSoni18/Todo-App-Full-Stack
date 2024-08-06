import { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserStoreData } from "../store/user-store-data";

const Signin = () => {
  const oldEmail = useRef("");
  const oldPassword = useRef("");
  const navigate = useNavigate();

  const { notifySuccess, notifyError } = useContext(UserStoreData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = oldEmail.current.value;
    const password = oldPassword.current.value;
    console.log(email, password);

    try {
      const response = await axios.post(
        "/api/signin",
        {
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
              id="password"
              ref={oldPassword}
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
export default Signin;
