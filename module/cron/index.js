const fetch = require("node-fetch");

const { CronJob } = require("cron");

const loggerInfo = async (...args) => {
  console.log(new Date(), ...args);
};

const setInstagramCron = () => {
  new CronJob(
    "*/10 * * * *",
    function () {
      // lambda to add image
      const url = "https://api.luptico.com/.netlify/functions/process-image";
      loggerInfo("ping: ", url);
      fetch(url);
    },
    null,
    true,
    "America/Los_Angeles"
  );

  new CronJob(
    "1 */4 * * *",
    function () {
      // lambda to read ig_recent_posts
      const url = "https://api.luptico.com/.netlify/functions/process-post";
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
