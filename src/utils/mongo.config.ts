import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const mongo_url: string = process.env.MONGO_DB_URL as string;
const database: string = process.env.MONGO_DATABASE as string;

export default async function mongoConfig() {
  console.log(`${mongo_url}/${database}?retryWrites=true&w=majority`);
  await connect(`${mongo_url}/${database}`);
}
