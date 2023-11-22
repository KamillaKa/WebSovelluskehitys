import { fetchAllMedia } from "../models/media-model.mjs";
import { addMedia } from "../models/media-model.mjs";

const postMedia = async (req, res) => {
  console.log("uploaded file", req.file);
  console.log("uploaded form data", req.body);
  const { title, description } = req.body;
  const { filename, mimetype, size } = req.file;
  const user_id = req.user.id;
  if (filename && title && user_id) {
    const newMedia = { title, description, user_id, filename, mimetype, size };
    const result = await addMedia(newMedia);
    res.status(201);
    res.json({ message: "New media item added", ...result });
  } else {
    res.sendStatus(400);
  }
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
