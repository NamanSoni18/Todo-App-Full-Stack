import { Link } from "react-router-dom";
const LoginHomeTodo = () => {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Welcome to our TODO App
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Please Login or sign-up to continue</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/signin">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className="btn btn-warning text-white btn-lg px-4"
              >
                Sign-up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginHomeTodo;