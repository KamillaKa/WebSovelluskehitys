import express from "express";
import { postLogin } from "../controllers/auth-controller.mjs";
import { getMe } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const authRouter = express.Router();

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "johnd",
 *      "password": "examplepass"
 *    }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Logged in successfully",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwid
 *                XNlcm5hbWUiOiJ1dXNpMSIsImVtYWlsIjoidXVzaTFAZXhhbXBsZS5jb20
 *                iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXS
 *                dryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y"
 *      "user": {
 *        "user_id": 21,
 *        "username": "johnd",
 *        "email": "johnd@example.com",
 *        "user_level_id": 2
 *      }
 *    }
 *
 * @apiUse UnauthorizedError
 */

// user endpoints
authRouter.route("/login").post(postLogin);
authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
