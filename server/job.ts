import cron from 'cron';

const CronJob = cron.CronJob;
const timeZone = 'Asia/Shanghai';
const cronTime = '* * * * * *';
console.log('Cron started');
new CronJob(
  cronTime,
  function() {
    console.log(new Date().getSeconds());
  },
  '',
  true,
  timeZone
);
