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
