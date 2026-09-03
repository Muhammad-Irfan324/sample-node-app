const { Router } = require("express");

const router = Router();

const items = new Map();
let nextId = 1;

router.get("/", (_req, res) => {
  res.json(Array.from(items.values()));
});

router.get("/:id", (req, res) => {
  const item = items.get(Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  const item = { id: nextId++, name };
  items.set(item.id, item);
  res.status(201).json(item);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = items.get(id);
  if (!existing) {
    return res.status(404).json({ error: "Item not found" });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  const updated = { id, name };
  items.set(id, updated);
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!items.has(id)) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.delete(id);
  res.status(204).end();
});

module.exports = router;
