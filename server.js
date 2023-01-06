const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')

const gcenter = require("./module/gcenter");
const setCron = require("./module/cron")

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/gcenter", gcenter);

app.get("/", function (req, res) {
  res.send(".mint.");
});

app.listen(3030, () => {
  console.log("running port 3030");

  setCron()
});
