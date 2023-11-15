import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  mediaItems,
  getMedia,
  getMediaById,
} from "./controllers/media-controller.mjs";
import mediaRouter from "./routes/media-router.mjs";
import logger from "./middleware/middlewares.mjs";

const hostname = "127.0.0.1";
const port = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.use("/media", express.static(path.join(__dirname, "../uploads")));

app.use(logger);

app.get("/", (req, res) => {
  const values = { title: "REST API docs", message: "API documentation here" };
  res.render("index", values);
});

app.use("/api/media", mediaRouter);

app.get("/api/media", getMedia);
app.get("/api/media/:id", getMediaById);
app.post("/api/media", postMedia);
app.put("/api/media/:id", putMedia);
app.delete("/api/media/:id", deleteMedia);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
