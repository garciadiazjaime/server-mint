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
    accept: "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.5",
    referer: "https://www.instagram.com/explore/tags/valledeguadalupe/",
    "sec-ch-ua": '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
    "sec-ch-ua-platform": "macOS",
    "sec-ch-ua-platform-version": "12.4.0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "x-asbd-id": "129477",
    "x-csrftoken": "KIMjkphGAO8buHZaAFTVggkcZWs7y05a",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "0",
    "x-requested-with": "XMLHttpRequest",
    "x-web-device-id": "42A3B855-4B0F-4CFA-A22B-7693648A6C7C",
  };

  const cert = base64.decode(process.env.MINT_CERT);
  const options = {
    cert,
    key: cert,
  };

  const sslConfiguredAgent = new https.Agent(options);

  const response = await fetch(url, {
    headers,
    agent: sslConfiguredAgent,
    method: "get",
  });

  console.log(response);

  let body;
  try {
    body = await response.json();
  } catch (error) {
    console.log(error);
  }

  if (!body) {
    res.sendStatus(400);
    return;
  }

  res.send(body);
});

module.exports = router;
