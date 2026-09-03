const express = require("express");
const healthRoutes = require("./routes/health");
const itemRoutes = require("./routes/items");

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/items", itemRoutes);

module.exports = app;
