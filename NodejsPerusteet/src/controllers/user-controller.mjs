import { addUser } from "../models/user-model.mjs";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
  res.json(users);
};
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "User not found", user_id: req.params.id });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ message: "invalid input fiels" });
  }
  const newUser = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;
  console.log("postUser", newUser);
  const newUserId = await addUser(newUser);
  res.status(201).json({ message: "user added", user_id: newUserId });
};

const putUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res
        .status(404)
        .json({ message: "User not found", user_id: req.params.id });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await UserModel.deleteUser(req.params.id);
    if (result) {
      res.json({ message: "User deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "User not found", user_id: req.params.id });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
