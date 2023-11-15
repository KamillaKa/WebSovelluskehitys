import express from "express";
import multer from "multer";
import {
  getMediaById,
  deleteMedia,
  getMedia,
  postMedia,
  putMedia,
} from "../controllers/media-controller.mjs";
import logger from "../middleware/middlewares.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// mediaRouter.use(logger);

mediaRouter.route("/").get(getMedia).post(upload.single("file"), postMedia);
mediaRouter.route("/:id").get(getMediaById).put(putMedia).delete(deleteMedia);

export default mediaRouter;
