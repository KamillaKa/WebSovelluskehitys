import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getItems, getItemsById, postItem } from "./items.js";
import http from "http";
import {
  getItems,
  getItemsById,
  postItem,
  deleteItem,
  putItem,
} from "./items.js";

const hostname = "127.0.0.1";
const port = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API");
});

app.get("/kukkuu", (request, response) => {
  const myResponse = (message: "Morje morje!");
  response.status(200);
  //  response.json(myResponse);
});

app.get("/api/items", getItems);
app.get("/api/items/:id", getItemsById);
app.put("/api/items");
app.post("/api/items", postItem);
app.delete("/api/items");

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const reqParts = url.split("/");

  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end('{"message": "API documentation"}');
  } else if (method === "GET" && reqParts[1] === "items" && reqParts[2]) {
    getItemsById(res, reqParts[2]);
  } else if (method === "GET" && reqParts[1] === "items") {
    getItems(res);
  } else if (method === "POST" && reqParts[1] === "items") {
    postItem(req, res);
  } else if (method === "DELETE" && reqParts[1] === "items" && reqParts[2]) {
    deleteItem(res, reqParts[2]);
  } else if (method === "PUT" && reqParts[1] === "items" && reqParts[2]) {
    putItem(req, res, reqParts[2]);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "404 Resource not found"}');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
