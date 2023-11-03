let items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "omena" },
  { id: 19, name: "appelsiini" },
];

const getItems = (req, res) => {
  const limit = req.query.limit;
  if (limit && Number.isInteger(+limit)) {
    res.json(items.slice(0, limit));
  } else {
    res.json(items);
  }
};

const getItemsById = (req, res) => {
  const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found." });
  }
};

const postItem = (req, res) => {
  if (req.body.name) {
    items.push({
      id: Math.max(...items.map((i) => i.id)) + 1,
      name: req.body.name,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const deleteItem = (req, res) => {
  const id = req.params.id;
  items = items.filter((item) => item.id != id);
  res.sendStatus(204);
};

const putItem = (req, res) => {
  const id = req.params.id;
  const index = items.findIndex((item) => item.id == id);
  if (index != -1) {
    items[index].name = req.body.name;
    res.sendStatus(200);
  } else {
    res.status(404).json({ message: "Item not found." });
  }
};

export { getItems, getItemsById, postItem, deleteItem, putItem };
