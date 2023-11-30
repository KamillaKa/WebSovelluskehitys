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
const port = 3001;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up view engine if you're using one
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.use("/media", express.static(path.join(__dirname, "../uploads")));
app.use("/forms", express.static(path.join(__dirname, "../test-forms")));

// Logger middleware
if (process.env.NODE_ENV !== "production") {
  app.use(logger);
}

// Root route
app.get("/", (req, res) => {
  const values = { title: "REST API docs", message: "API documentation here" };
  res.render("index", values);
});

// Modular routes
app.use("api/auth", authRouter);
app.use("/api/media", mediaRouter);
app.use("/api/users", userRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);

// Error handling - catch-all for unhandled routes
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// const userRoutes = require("./userRoutes");

// app.use(express.json());
// app.use("/user", userRoutes);

// export default app;
