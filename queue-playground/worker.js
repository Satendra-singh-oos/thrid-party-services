require("dotenv").config();
const { Worker } = require("bullmq");

const connectionOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};

const sendEmail = () =>
  new Promise((res, rej) => setTimeout(() => res(), 5 * 1000));

const worker = new Worker(
  "email-queue",

  async (job) => {
    console.log(`Message Rec id:${job.id}`);
    console.log("Processing Message");
    console.log(`Sending Email to ${job.data.email}`);
    await sendEmail(5);
    console.log("Email Send");
  },
  {
    connection: connectionOptions,
  }
);
