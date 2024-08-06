import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserStoreData = createContext({
  notifySuccess: () => {},
  notifyError: () => {},
  user: [],
});

const UserStoreDataProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  const report = localStorage.getItem("token");

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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      if (!report) {
        setUser(null);
      } else {
        try {
          const response = await axios.get("/api/home", {
            headers: {
              "x-auth-token": report,
            },
            signal: signal,
          });
          setUser(response.data.user);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            // Handle unauthorized access (e.g., token expired or invalid)
            setUser(null);
            navigate("/signin"); // Redirect to signin page if not authenticated
          }
        }
      }
    })();
    return () => {
      controller.abort();
    };
  }, [navigate, location.pathname]);

  return (
    <UserStoreData.Provider
      value={{
        notifySuccess,
        notifyError,
        user,
      }}
    >
      {children}
    </UserStoreData.Provider>
  );
};

export default UserStoreDataProvider;
