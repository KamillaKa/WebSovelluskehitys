import https from "https";
import fs from "fs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth-router.mjs";
import mediaRouter from "./routes/media-router.mjs";
import userRouter from "./routes/user-router.mjs";
import likesRouter from "./routes/likes-router.mjs";
import commentsRouter from "./routes/comments-router.mjs";
import {
  logger,
  errorHandler,
  notFoundHandler,
} from "./middleware/middlewares.mjs";

const hostname = "127.0.0.1";
const port = 443;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.use("/media", express.static(path.join(__dirname, "../uploads")));
app.use("/forms", express.static(path.join(__dirname, "../test-forms")));

if (process.env.NODE_ENV !== "production") {
  app.use(logger);
}

app.get("/", (req, res) => {
  const values = { title: "REST API docs", message: "API documentation here" };
  res.render("index", values);
});

app.use("/api/auth", authRouter);
app.use("/api/media", mediaRouter);
app.use("/api/users", userRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const options = {
  key: fs.readFileSync(path.join(__dirname, "..", "cert", "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "..", "cert", "server.cert")),
};

https.createServer(options, app).listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});
