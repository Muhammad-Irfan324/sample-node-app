const { Router } = require("express");

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

router.get("/ready", (_req, res) => {
  res.json({ status: "ready" });
});

module.exports = router;
