import { validationResult } from "express-validator";
import {
  addMedia,
  fetchAllMedia,
  fetchMediaById,
} from "../models/media-model.mjs";

const postMedia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errors", errors.array());
    const error = new Error("Invalid input fields");
    error.status = 400;
    return next(error);
  }

  const { title, description } = req.body;
  const { filename, mimetype, size } = req.file;
  const user_id = req.user.user_id;
  const newMedia = { title, description, user_id, filename, mimetype, size };

  const result = await addMedia(newMedia);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201).json({ message: "New media item added.", ...result });
};

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.status(200).json(mediaItems);
};

const getMediaById = async (req, res) => {
  const result = await fetchMediaById(req.params.id);
  if (result.error) {
    res.status(500).json(result);
  }
  if (result) {
    res.json(result);
  } else {
    res
      .status(404)
      .json({ message: "Media not found.", media_id: req.params.id });
  }
};

const updatedMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const mediaData = req.body;
    const updatedMedia = await MediaModel.updateMedia(id, mediaData);

    if (updatedMedia) {
      res.json({ message: "Media updated successfully", updatedMedia });
    } else {
      res.status(404).json({ message: "Media not found", media_id: id });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MediaModel.deleteMedia(id);

    if (result) {
      res.json({ message: "Media deleted successfully" });
    } else {
      res.status(404).json({ message: "Media not found", media_id: id });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { getMedia, getMediaById, postMedia, updatedMedia, deleteMedia };
