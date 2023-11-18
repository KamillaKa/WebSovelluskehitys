import express from "express";
import {
  getCommentsByMedia,
  postComment,
  deleteComment,
} from "../controllers/comments-controller.mjs";

const router = express.Router();

// Route to get all comments for a specific media item
router.get("/media/:mediaId", getCommentsByMedia);

// Route to post a new comment
router.post("/", postComment);

// Route to delete a specific comment
router.delete("/:commentId", deleteComment);

export default router;
