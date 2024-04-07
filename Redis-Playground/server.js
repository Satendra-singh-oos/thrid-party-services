import express from "express";
import axios from "axios";
import { client } from "./client.js";

const app = express();

app.get("/", async (req, res) => {
  const cacheValue = await client.get("todos");

  if (cacheValue) {
    console.log("cahced from redis");
    return res.json(JSON.parse(cacheValue));
  }

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  await client.set("todos", JSON.stringify(data));
  await client.expire("todos", 30);

  return res.json(data);
});

app.listen(9000, () => {
  console.log("Server is up and runing");
});
