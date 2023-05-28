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

  const html = await proxy(decodedURL).catch((error) => {
    console.log({ error });
  });

  if (!html) {
    res.sendStatus(400).send("EMPTY_HTML");
    return;
  }

  res.send(html);
});

router.get("/instagram", async (req, res) => {
  const url =
    "https://www.instagram.com/api/v1/tags/logged_out_web_info/?tag_name=valledeguadalupe";
  const headers = {
    referer: "https://www.instagram.com/explore/tags/valledeguadalupe/",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "x-ig-app-id": "936619743392459",
  };

  const cert = base64.decode(process.env.MINT_CERT);
  const options = {
    cert,
    key: cert,
  };

  const sslConfiguredAgent = new https.Agent(options);

  let response;

  try {
    response = await fetch(url, {
      headers,
      agent: sslConfiguredAgent,
      method: "get",
    });
  } catch (error) {
    console.log(error);
  }

  if (!response) {
    res.sendStatus(400);
  }

  const body = await response.json();

  res.send(body);
});

module.exports = router;
