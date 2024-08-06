import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import './index.css';
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";
import UserStoreDataProvider from "./store/user-store-data";

function App() {
  return (
    <>
      <UserStoreDataProvider>
        <Nav />
        <Outlet />
        <ToastContainer />
      </UserStoreDataProvider>
    </>
  );
}

export default App;
