import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import mqttConfig from "./utils/mqtt.config";
import { getTasks } from "./services/todo.service";
import mongoConfig from "./utils/mongo.config";
import { redisConnect } from "./utils/redis.config";
/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Just a Ping
app.get("/fetchAllTasks", async function (req: Request, res: Response) {
  const data = await getTasks();
  res.status(200).json(data);
});

/**
 * Server Activation
 */

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await mongoConfig();
  await redisConnect();
  mqttConfig();
});
