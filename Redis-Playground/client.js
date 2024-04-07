import { Redis } from "ioredis";

const client = new Redis(); // by default 6379 port redis will be runing if you using dokcer

export { client };
