import * as redis from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const host: string = process.env.REDIS_HOST as string;
const port: number = parseInt(process.env.REDIS_PORT as string, 10);
const password: string = process.env.REDIS_PASSWORD as string;

const client = redis.createClient({
  socket: {
    host: host,
    port: port,
  },
  password: password,
});

client.on("connect", () => {
  console.log("connected to redis");
});

client.on("error", () => {
  console.error("Error");
});

client.on("end", () => {
  console.log("dis-connected from redis");
});
export async function redisConnect() {
  await client.connect();
}
export async function redisGet(key: string) {
  const data = await client.get(key);
  return data;
}
export async function redisSet(key: string, value: string) {
  await client.set(key, value);
  return true;
}
export function clientClose() {
  client.quit();
}
