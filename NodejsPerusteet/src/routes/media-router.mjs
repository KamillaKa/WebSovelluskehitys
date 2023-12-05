import express from "express";
import {
  getMediaById,
  deleteMedia,
  getMedia,
  postMedia,
  updatedMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middleware/middlewares.mjs";
import { authenticateToken } from "../middleware/auth.mjs";
import { body } from "express-validator";
import upload from "../middleware/upload.mjs";

const mediaRouter = express.Router();

// mediaRouter.use(logger);
mediaRouter
  .route("/")
  .get(getMedia)
  .post(
    authenticateToken,
    upload.single("file"),
    body("title").trim().isLength({ min: 3 }),
    body("description"),
    postMedia
  );

mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(updatedMedia)
  .delete(deleteMedia);

export default mediaRouter;
