import { fetchAllMedia } from "../models/media-model.mjs";

const postMedia = async (req, res) => {
  console.log("uploaded file", req.file);
  console.log("uploaded form data", req.body);
  const { title, description, user_id } = req.body;
  const { filename, mimetype, size } = req.file;
  const newId = mediaItems[0].media_id + 1;
  if (filename && title && user_id) {
    const result = await addMedia({
      user_id,
      filename,
      size,
      mimetype,
      title,
      description,
    });
    res.status(201);
    res.json({ message: "Media added", ...result });
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
