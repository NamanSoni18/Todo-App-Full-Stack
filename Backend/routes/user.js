const express = require("express");
const User = require("../models/user");
const { checkForAuth } = require("../middleware/authentication");

const router = express.Router();

router.get("/home", checkForAuth(), async (req, res) => {
  return res.send({ user: req.user });
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.status(200).json({ message: "Signin Successfull", token });
  } catch (error) {
    console.log("Error in signin", error);
    if (
      error.message == "Incorrect Password" ||
      error.message == "User Not Found"
    ) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("signup reached");
    await User.create({
      name,
      email,
      password,
    });
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.status(200).json({ message: "User Created Successfully", token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    if (
      error.message === "User not found" ||
      error.message === "Error Cannot match Password"
    ) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

module.exports = router;
