import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { login } from "../models/user-model.mjs";
import bcrypt from "bcryptjs";

const postLogin = async (req, res, next) => {
  const user = await login(req.body.username);
  if (!user) {
    const error = new Error("invalid username or password");
    error.status = 401;
    return next(error);
  }
  if (user.error) {
    return next(new Error(result.error));
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: "logged in", token, user });
  } else {
    const error = new Error("username/password invalid");
    error.status = 401;
    return next(error);
  }
};

const getMe = (req, res) => {
  res.json(req.user);
};

export { postLogin, getMe };
