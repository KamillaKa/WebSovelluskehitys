import { promisePool } from "../utils/database.mjs";

/**
 * fetch user from database based on name/password pair
 *
 * @param {object} userCreds - Contain {username, password} properties
 * @returns user object
 */

const login = async () => {
  try {
    const sql = `SELECT user_id, username FROM Users WHERE username = ? AND password = ?`;
    const params = [userCreds.username, userCreds.password];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};
