import { client } from "./client.js";

async function init() {
  // await client.xadd("temp", "*", "t", "2");
  // await client.xadd("temp", "*", "t", "3");
  // await client.xadd("temp", "*", "t", "4");
  // await client.xadd("temp", "*", "t", "2");

  //const items = await client.xrange("temp", "-", "+");
  const items = await client.xrange("temp", "-", "+", "COUNT", 2);
  console.log(items);
}

init();
