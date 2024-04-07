const { kafka } = require("./client.js");

async function init() {
  const admin = kafka.admin();
  console.log("addmin conneting.....");
  await admin.connect();
  console.log("addmin connection success");

  console.log("Createing Topinc");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });

  console.log("Topic Created Sucess");

  console.log("Disconnecting Admin");
  await admin.disconnect();
}

init();
