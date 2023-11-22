import jwt from "jsonwebtoken";
import "dotenv/config.js";

import { login } from "../models/user-model.mjs";

const postLogin = async (req, res) => {
  const user = await login(req.body);
  console.log("postLogin", user);
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: "You are logged in!", token, user });
  } catch (error) {
    res.status(401).json({ message: "invalid username/password" });
  }
};

const getMe = (req, res) => {
  res.json(req.user);
};

export { postLogin, getMe };
