const express = require("express");
const router = express.Router();
const https = require("https");
const fetch = require("node-fetch");
const base64 = require("base-64");

const proxy = async (endpointURL) => {
  const cert = base64.decode(process.env.MINT_CERT);
  const options = {
    cert,
    key: cert,
  };

  const sslConfiguredAgent = new https.Agent(options);

  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(endpointURL, {
    headers,
    agent: sslConfiguredAgent,
    method: "get",
  }).then((response) => response.text());
};

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.sendStatus(400).send("EMPTY_PARAMS");
    return;
  }

  const decodedURL = decodeURIComponent(url);
  console.log({ decodedURL });
  const html = await proxy(decodedURL).catch((error) => {
    console.log({ error });
  });

  if (!html) {
    res.sendStatus(400).send("EMPTY_HTML");
    return;
  }

  res.send(html);
});

module.exports = router;
