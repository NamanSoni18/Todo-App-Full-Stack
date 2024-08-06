import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserStoreData } from "../store/user-store-data";
import LoginHomeTodo from "./LoginHomeTodo";
import TodoList from "./TodoList";

const Home = () => {
  const { user } = useContext(UserStoreData);
  return <>{user ? <TodoList/> : <LoginHomeTodo />}</>;
};

export default Home;
