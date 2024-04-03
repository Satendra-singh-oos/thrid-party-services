import { client } from "./client.js";

async function init() {
  //   await client.lpush("messages", 1);
  //   await client.lpush("messages", 2);
  //   await client.lpush("messages", 3);
  //   await client.lpush("messages", 4);

  //   const result = await client.lrange("messages", 0, -1);
  //   console.log(result);
  //   const pop = await client.rpop("messages");

  //   console.log("Pop: ", pop);

  const bpop = await client.blpop("messages", 20);
  console.log("bpop ", bpop);
}

init();
