import { redisGet, redisSet } from "../utils/redis.config";
import * as dotenv from "dotenv";
import Todo, { TodoType } from "../models/todo.schema";
import mongoConfig from "../utils/mongo.config";
dotenv.config();

export async function getTasks() {
  try {
    const redisKey: string = process.env.REDIS_KEY as string;
    const cache: string | null = await redisGet(redisKey);
    const dbData: TodoType[] = await Todo.find({}, { task: true, _id: false });
    console.log(cache);
    let returnData: TodoType[] = [];
    if (cache && cache != "") {
      const cacheData: TodoType[] = JSON.parse(cache);
      returnData = returnData.concat(cacheData);
    }

    if (dbData && dbData.length != 0) {
      returnData = returnData.concat(dbData);
    }
    console.log(returnData);
    return returnData;
  } catch (error) {
    console.log(error);
  }
}

export async function addTasks(todo: TodoType) {
  try {
    if (!todo.task || todo.task === "") {
      return;
    }
    const redisKey: string = process.env.REDIS_KEY as string;
    const cache: string | null = await redisGet(redisKey);
    await redisSet(redisKey, "");
    if (!cache || cache === "") {
      await redisSet(redisKey, JSON.stringify([todo]));
      return;
    }
    const data: TodoType[] = JSON.parse(cache);
    if (data.length >= 50) {
      await Todo.insertMany(data);
      await redisSet(redisKey, "");
      return;
    }
    data.push(todo);
    const newCache: string = JSON.stringify(data);
    await redisSet(redisKey, newCache);
  } catch (error) {
    console.log(error);
  }
}
