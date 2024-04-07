require("dotenv").config();
const { Queue } = require("bullmq");

const connectionOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};

const notificationQueue = new Queue("email-queue", {
  connection: connectionOptions,
});

async function init() {
  const res = await notificationQueue.add("email to satendra", {
    email: "satendrasingh1325@gmail.com",
    subject: "Welcome !",
    body: "Hello How Are You , I Am Under The Water",
  });

  console.log("Job ADded to Queue", res.id);
}

init();
