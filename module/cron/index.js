const fetch = require("node-fetch");

const { CronJob } = require("cron");

const setInstagramCron = () => {
  new CronJob(
    "*/7 * * * *",
    function () {
      const url = "https://api.luptico.com/.netlify/functions/process-image";
      console.log("ping: ", url);
      fetch(url);
    },
    null,
    true,
    "America/Los_Angeles"
  );
};

const setCron = () => {
  if (!process.env.ENABLE_CRON) {
    console.log("cron not-setup");
    return;
  }

  setInstagramCron();
  console.log("cron setup");
};

module.exports = setCron;
