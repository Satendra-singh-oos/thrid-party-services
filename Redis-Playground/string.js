import { client } from "./client.js";

async function init() {
  // await client.set("msg:1", "Hey from node js");
  //await client.expire("msg:1", 10);
  const result = await client.get("msg:1");
  console.log("Result:- " + result);
}

init();
