require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const todoRoute = require("./routes/todo");
const cors = require("cors");

const app = express();
const port = 8000 || process.env.PORT;

app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoute);
app.use("/api", todoRoute);

app.listen(port, () => {
  console.log(`Server is Running at ${port}`);
});
