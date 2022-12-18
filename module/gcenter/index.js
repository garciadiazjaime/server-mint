const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
  const payload = req.body;

  if (Array.isArray(payload) && payload.length) {
    fs.writeFileSync(`./public/gc_report.json`, JSON.stringify(payload));
    res.sendStatus(200);
    return;
  }

  res.sendStatus(500);
});

module.exports = router;
