import { fetchAllMedia } from "../models/media-model.mjs";

const postMedia = (req, res) => {
  console.log("uploaded file", req.file);
  console.log("uploaded form data", req.body);
  const {title, description, user_id} = req.body;
  const {filename, mimetype, size} = req.file;
  const newId = mediaItems[0].media_id + 1;
  if (filename && title && user_id) {
    const result = await addMedia({user_id, filename, size, mimetype, title, description}); 
    res.status(201);
    res.json ({message: "Media added", ...result});
  } else {
    res.sendStatus(400);
  }
};

const getMedia = await (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.status(200).json(mediaItems);
};

const getMediaById = await (req, res) => {
  const result = await fetchMediaById(req.params.id);
  if (result.error) {
    res.status(500).json(result);
  }
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Media not found.", media_id: req.params.id });
  }
};

export { mediaItems, getMedia, getMediaById, postMedia };
