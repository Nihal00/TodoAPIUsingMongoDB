const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TodoSchema = require("./models/TodoSchema");
const { LoggerMiddleware } = require("./middlewares/LoggerMiddleware");
const UserSchema = require("./models/UserSchema");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(LoggerMiddleware);

const PORT = process.env.PORT;
const SALT_ROUNDS = 12;

//POST => Register User
app.post("/register", async (req, res) => {
  const userBody = req.body;

  const hashedPasswod = await bcrypt.hash(userBody.password, SALT_ROUNDS);

  const userObj = new UserSchema({
    name: userBody.name,
    username: userBody.username,
    password: hashedPasswod,
    email: userBody.email,
  });

  try {
    await userObj.save();

    res.status(201).send({
      status: 201,
      message: "User Register Successfully!",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Failed to register user!",
      data: err,
    });
  }
});

//POST => Login User
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let userData;

  try {
    userData = await UserSchema.findOne({ username });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Invalid Credentials!",
      data: err,
    });
  }

  let isPasswordSame = await bcrypt.compare(password, userData.password);

  if (!isPasswordSame) {
    return res.status(400).send({
      status: 400,
      message: "Password in incorrect",
    });
  } else {
    //Generate Token and save it to the database
    let payload = {
      name: userData.name,
      username: userData.username,
      email: userData.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    res.status(200).send({
      status: 200,
      message: "Successfully logged in!",
      data: token,
    });
  }
});

//POST => Create a Todo
app.post("/todo", async (req, res) => {
  const { title, isCompleted, username } = req.body;

  if (title.length === 0 || isCompleted === null || username.length === 0) {
    return res.status(400).send({
      status: 400,
      message: "Please enter the values in correct format!",
    });
  }

  try {
    const todoObj = new TodoSchema({
      title,
      isCompleted,
      username,
    });

    await todoObj.save();

    res.status(201).send({
      status: 201,
      message: "Todo Created succesfully",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Todo creation failed!",
    });
  }
});

//GET => Get all todos for a username
app.get("/todos/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const todoList = await TodoSchema.find({ username }).sort({ dateTime: 1 });

    res.status(201).send({
      status: 201,
      message: "Fetched a todo successfully",
      data: todoList,
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Failed to fetch all todos for a username",
      data: err,
    });
  }
});

// GET => Get a single Todo
app.get("/todo/:id", (req, res) => {
  const todoId = req.params.id;

  TodoSchema.findById(todoId)
    .then((todoData) => {
      res.status(200).send({
        status: 200,
        message: "Fetched a todo successfully",
        data: todoData,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: 400,
        message: "Failed to fetch all todos from id",
        data: err,
      });
    });
});

//DELETE => Delete a todo based on ID
app.delete("/todo/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    await TodoSchema.findByIdAndDelete(todoId);

    res.status(200).send({
      status: 200,
      message: "Deleted a todo successfully",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Failed to delete a todo based on id",
      data: err,
    });
  }
});

//PATCH => Update a todo
app.patch("/todo", async (req, res) => {
  const { todoId, title, isCompleted } = req.body;

  try {
    await TodoSchema.findByIdAndUpdate(todoId, { title, isCompleted });

    res.status(200).send({
      status: 200,
      message: "Updated a todo successfully",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Failed to update a todo based on id",
      data: err,
    });
  }
});

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDM is connected"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
