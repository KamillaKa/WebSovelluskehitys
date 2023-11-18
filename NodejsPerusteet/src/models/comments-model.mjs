import { promisePool } from "../utils/database.mjs";

const fetchCommentsByMedia = async (mediaId) => {
  const sql = "SELECT * FROM comments WHERE media_id = ?";
  try {
    const [rows] = await promisePool.query(sql, [mediaId]);
    return rows;
  } catch (e) {
    console.error("fetchCommentsByMedia error", e.message);
    return { error: e.message };
  }
};

const addComment = async (commentData) => {
  const { user_id, media_id, content } = commentData;
  const sql =
    "INSERT INTO comments (user_id, media_id, content) VALUES (?, ?, ?)";
  try {
    const [result] = await promisePool.query(sql, [user_id, media_id, content]);
    return { comment_id: result.insertId };
  } catch (e) {
    console.error("addComment error", e.message);
    return { error: e.message };
  }
};

const deleteComment = async (commentId) => {
  const sql = "DELETE FROM comments WHERE comment_id = ?";
  try {
    await promisePool.query(sql, [commentId]);
    return { message: "Comment deleted successfully" };
  } catch (e) {
    console.error("deleteComment error", e.message);
    return { error: e.message };
  }
};

export { fetchCommentsByMedia, addComment, deleteComment };
