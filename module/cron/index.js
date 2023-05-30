const fetch = require("node-fetch");

const { CronJob } = require("cron");

const loggerInfo = async (...args) => {
  console.log(new Date(), ...args);
};

const setInstagramCron = () => {
  new CronJob(
    "*/7 * * * *",
    function () {
      const url = "https://api.luptico.com/.netlify/functions/process-image";
      loggerInfo("ping: ", url);
      fetch(url);
    },
    null,
    true,
    "America/Los_Angeles"
  );

  new CronJob(
    "1 */2 * * *",
    function () {
      const url = "https://api.luptico.com/.netlify/functions/process-post";
      loggerInfo("ping: ", url);
      fetch(url);
    },
    null,
    true,
    "America/Los_Angeles"
  );

  new CronJob(
    "*/10 * * * *",
    function () {
      const url = "https://api.luptico.com/.netlify/functions/classify-image";
      loggerInfo("ping: ", url);
      fetch(url);
    },
    null,
    true,
    "America/Los_Angeles"
  );
};

const setCron = () => {
  if (!process.env.ENABLE_CRON) {
    loggerInfo("cron not-setup");
    return;
  }

  setInstagramCron();
  loggerInfo("cron setup");
};

module.exports = setCron;
