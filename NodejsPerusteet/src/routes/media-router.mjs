import express from "express";
import multer from "multer";
import {
  getMediaById,
  deleteMedia,
  getMedia,
  postMedia,
  updatedMedia,
} from "../controllers/media-controller.mjs";
import logger from "../middleware/middlewares.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// mediaRouter.use(logger);

mediaRouter.post("/", upload.single("file"), postMedia);
mediaRouter.route("/").get(getMedia).post(upload.single("file"), postMedia);
mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(updatedMedia)
  .delete(deleteMedia);

export default mediaRouter;
