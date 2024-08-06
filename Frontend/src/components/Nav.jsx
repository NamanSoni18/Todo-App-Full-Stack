import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserStoreData } from "../store/user-store-data";

const Nav = () => {
  const { user } = useContext(UserStoreData);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault;
    localStorage.removeItem("token");
    navigate("/signin");
  };
  console.log(user);
  return (
    <>
      <header className="p-3 text-bg-dark">
        <nav className="navbar navbar-expand-lg rounded">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">
              TODO APP
            </Link>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample09">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active text-white"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {user && (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/add-todo">
                      Add Todo
                    </Link>
                  </li>
                )}
              </ul>
              {user ? (
                <div className="dropdown text-white">
                  <a
                    className="d-flex align-items-center link-body-emphasis text-decoration-none"
                    data-bs-toggle="dropdown"
                  >
                    <h4 className="text-white mb-0 me-2">{user?.name}</h4>
                    <span className="dropdown-toggle text-white"></span>
                  </a>
                  <ul className="dropdown-menu text-small">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <Link to="/signin">
                    <button
                      type="button"
                      className="btn btn-outline-light me-2"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button type="button" className="btn btn-warning">
                      Sign-up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
