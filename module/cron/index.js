const fetch = require("node-fetch");

const { CronJob } = require("cron");

const setNewsCron = () => {
  new CronJob(
    "0 0 */2 * * *",
    function () {
      console.log("hitting news - list", new Date());
      fetch(
        "https://news.mintitmedia.com/.netlify/functions/aristegui-noticias?type=list"
      );
    },
    null,
    true,
    "America/Los_Angeles"
  );

  new CronJob(
    "0 */2 * * * *",
    function () {
      console.log("hitting news - article", new Date());
      fetch(
        "https://news.mintitmedia.com/.netlify/functions/aristegui-noticias?type=article"
      );
    },
    null,
    true,
    "America/Los_Angeles"
  );
};

const setCron = () => {
  console.log("setting cron", new Date());
  setNewsCron();
};

module.exports = setCron;
