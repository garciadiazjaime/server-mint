const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const gcenter = require("./module/gcenter");
const instagram = require("./module/instagram");
const proxy = require("./module/proxy");
const setCron = require("./module/cron");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/gcenter", gcenter);
app.use("/instagram", instagram);
app.use("/proxy", proxy);

app.get("/", function (req, res) {
  res.send(".mint.");
});

app.listen(3030, () => {
  console.log("running port 3030");

  setCron();
});
