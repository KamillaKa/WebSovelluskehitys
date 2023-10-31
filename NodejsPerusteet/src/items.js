let items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "omena" },
  { id: 19, name: "appelsiini" },
];

const getItems = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "All items", items }));
};

const getItemsById = (res, id) => {
  const item = items.find((element) => element.id == id);
  if (item) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Item not found"}');
  }
};

const postItem = (req, res) => {
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = JSON.parse(Buffer.concat(body).toString());
      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end('{"message": "Missing data"}');
        return;
      }
      const newId = items[items.length - 1]?.id + 1 || 1;
      items.push({ id: newId, name: body.name });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end('{"message": "New item added"}');
    });
};

const deleteItem = (res, id) => {
  items = items.filter((item) => item.id != id);
  res.writeHead(204, { "Content-Type": "application/json" });
  res.end();
};

const putItem = (req, res, id) => {
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = JSON.parse(Buffer.concat(body).toString());
      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end('{"message": "Missing data"}');
        return;
      }
      const index = items.findIndex((item) => item.id == id);
      if (index != -1) {
        items[index].name = body.name;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end('{"message": "Item updated"}');
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end('{"message": "Item not found"}');
      }
    });
};

export { getItems, getItemsById, postItem, deleteItem, putItem };
