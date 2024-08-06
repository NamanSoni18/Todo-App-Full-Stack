const express = require("express");
const Todo = require("../models/todo");
const { checkForAuth } = require("../middleware/authentication");

const router = express.Router();

router
  .post("/todo", checkForAuth(), async (req, res) => {
    try {
      const { title, task, due } = req.body;
      const userId = req.user._id;
      await Todo.create({
        title: title,
        task: task,
        edate: due,
        createdBy: userId,
      });
      res.status(200).json({ message: "Todo Created Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: error.message });
    }
  })
  .get("/todo", checkForAuth(), async (req, res) => {
    const userId = req.user._id;
    try {
      const response = await Todo.find({ createdBy: userId });
      console.log(response);
      return res.send({ todos: response });
    } catch (error) {
      res.status(401).json({ message: "Cannot get Todos" });
    }
  })
  .delete("/todo", async (req, res) => {
    const todoId = req.headers["x-todo-id"];
    console.log(todoId);
    try {
      await Todo.deleteOne({ _id: todoId });
      res.status(200).json({ message: "Todo Deleted Successfully" });
    } catch(error) {
      res.status(401).json({ message: error.message });
    }
  });

module.exports = router;
