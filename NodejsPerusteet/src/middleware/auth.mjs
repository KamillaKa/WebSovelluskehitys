import jwt from "jsonwebtoken";
import "dotenv/config";

const jwt = require("jsonwebtoken");
const Media = require("./models/media-model");

const authenticateToken = (req, res, next) => {
  console.log("authenticateToken", req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({ message: "invalid token" });
  }
};

const verifyMediaOwner = async (req, res, next) => {
  const mediaId = req.params.id;
  try {
    const media = await Media.findById(mediaId);
    if (!media) return res.status(404).send("Media not found");
    if (media.owner.toString() !== req.user.id) {
      return res.status(403).send("Not authorized");
    }
    next();
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const verifyUserUpdate = (req, res, next) => {
  const userId = req.body.id;
  if (userId !== req.user.id) {
    return res.status(403).send("Not authorized to update this user");
  }
  next();
};

export { authenticateToken, verifyMediaOwner, verifyUserUpdate };
