const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
  const payload = req.body;
  fs.writeFileSync(`./public/posts.json`, JSON.stringify(payload));
  if (
    Array.isArray(payload?.data?.recent?.sections) &&
    payload.data.recent.sections.length
  ) {
    fs.writeFileSync(`./public/ig_recent_posts.json`, JSON.stringify(payload));
    res.sendStatus(200);
    return;
  }

  res.sendStatus(400);
});

module.exports = router;
