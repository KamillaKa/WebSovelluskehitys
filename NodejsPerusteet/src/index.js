import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getItems,
  getItemsById,
  postItem,
  deleteItem,
  putItem,
} from "./items.js";
import { mediaItems, getMedia, getMediaById } from "./media.js";

const hostname = "127.0.0.1";
const port = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use((req, res, next) => {
  console.log("Time:", Date.now(), req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  const values = { title: "REST API docs", message: "API documentation here" };
  res.render("index", values);
});

app.get("/api/items", getItems);
app.get("/api/items/:id", getItemsById);
app.post("/api/items", postItem);
app.delete("/api/items/:id", deleteItem);
app.put("/api/items/:id", putItem);

app.get("/api/media", getMedia);
app.get("/api/media/:id", getMediaById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
