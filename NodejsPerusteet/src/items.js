let items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "omena" },
  { id: 19, name: "appelsiini" },
];

const getItems = (res) => {
  res.json(items);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "All items", items }));
};

const getItemsById = (req, res) => {
  console.log('getItemsById', req.params);
 const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item)
  } else {
    res.status(404);
    res.json{(message: "Item not found.")};
  }
  res.sendStatus(200);
};

const postItem = (req, res) => {
  console.log('New item posted', req.body);
  //different ids generate (last assignment)
  if (req.body.name) {
    items.push(id: 0, name: req.body.name);
      res.sendStatus(201)
  } else {
    res.sendStatus(400);
  }
}

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
