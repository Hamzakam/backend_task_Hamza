import mongoose, { Schema, model, connect } from "mongoose";

const collection: string = process.env.MONGO_COLLECTION as string;

export interface TodoType {
  task: string;
}

const todoSchema = new Schema<TodoType>({
  task: { type: String, required: true },
});

const Todo = model<TodoType>("Todo", todoSchema, collection);

export default Todo;
