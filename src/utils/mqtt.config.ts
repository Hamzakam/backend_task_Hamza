import mqtt from "mqtt";
import * as dotenv from "dotenv";
import { addTasks } from "../services/todo.service";
import { TodoType } from "../models/todo.schema";
dotenv.config();

const host: string = process.env.MQTT_HOST as string;
const port: number = parseInt(process.env.MQTT_PORT_TCP as string, 10);
const clientId: string = `mqtt_${Math.random().toString(16).slice(3)}`;
const topic: string = process.env.MQTT_TOPIC as string;

export default function mqttConfig() {
  const connectUrl = `mqtt://${host}:${port}`;
  console.log(connectUrl);
  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    //   username: process.env.MQTT_USERNAME,
    //   password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
  });
  client.on("connect", () => {
    client.subscribe(topic, () => {
      console.log(`Subscribe to topic '${topic}'`);
    });
  });
  client.on("message", async (topic, payload) => {
    console.log("Received Message:", topic, payload.toString());
    const todo: TodoType = JSON.parse(payload.toString());
    await addTasks(todo);
  });
}
