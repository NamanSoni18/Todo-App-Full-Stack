import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';
import Home from "./components/Home.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import AddTodo from './components/AddTodo.jsx'
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/add-todo",
        element: <AddTodo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
