import express from "express";
import {
  getLikesByMedia,
  getLikesByUser,
  postLike,
  deleteLike,
} from "../controllers/likes-controller.mjs";

const router = express.Router();

router.get("/media/:mediaId", getLikesByMedia);
router.get("/user/:userId", getLikesByUser);
router.post("/", postLike);
router.delete("/:likeId", deleteLike);

export default router;
