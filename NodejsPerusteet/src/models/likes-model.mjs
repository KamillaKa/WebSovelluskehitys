import { promisePool } from "../utils/database.mjs";

const fetchLikesByMedia = async (mediaId) => {
  const sql = "SELECT * FROM likes WHERE media_id = ?";
  try {
    const [rows] = await promisePool.query(sql, [mediaId]);
    return rows;
  } catch (e) {
    console.error("fetchLikesByMedia error", e.message);
    return { error: e.message };
  }
};

const fetchLikesByUser = async (userId) => {
  const sql = "SELECT * FROM likes WHERE user_id = ?";
  try {
    const [rows] = await promisePool.query(sql, [userId]);
    return rows;
  } catch (e) {
    console.error("fetchLikesByUser error", e.message);
    return { error: e.message };
  }
};

const addLike = async (likeData) => {
  const { user_id, media_id } = likeData;
  const sql = "INSERT INTO likes (user_id, media_id) VALUES (?, ?)";
  try {
    const [result] = await promisePool.query(sql, [user_id, media_id]);
    return { like_id: result.insertId };
  } catch (e) {
    console.error("addLike error", e.message);
    return { error: e.message };
  }
};

const deleteLike = async (likeId) => {
  const sql = "DELETE FROM likes WHERE like_id = ?";
  try {
    await promisePool.query(sql, [likeId]);
    return { message: "Like deleted successfully" };
  } catch (e) {
    console.error("deleteLike error", e.message);
    return { error: e.message };
  }
};

export { fetchLikesByMedia, fetchLikesByUser, addLike, deleteLike };
