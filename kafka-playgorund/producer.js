const { kafka } = require("./client.js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = await kafka.producer();
  console.log("Connecting Producr");
  await producer.connect();
  console.log("Connect With Producer");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ name: riderName, loc: location }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });

  // await producer.send({
  //     topic:"rider-updates",
  //     messages:[{
  //         partition:location.toLowerCase() === "north"?0:1,
  //         key:"location-update",
  //         value:JSON.stringify({name:riderName,loc:location})
  //     }]
  // })

  // await  producer.disconnect()
}

init();
