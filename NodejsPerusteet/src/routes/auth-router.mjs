import express from "express";
import { postLogin } from "../controllers/auth-controller.mjs";
import { getMe } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const authRouter = express.Router();

// user endpoints
authRouter.route("/login").post(postLogin);
authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
