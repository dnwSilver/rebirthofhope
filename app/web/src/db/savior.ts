import mongoose from "mongoose";
import { ISavior } from "@/domain";
const { Schema } = mongoose;

const saviorSchema = new Schema<ISavior>({
  name: { type: String, required: true },
  call: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  linting: { type: Date, default: null },
  metrics: { type: Date, default: null },
  resources: { type: Date, default: null },
  logs: { type: Date, default: null },
  secrets: { type: Date, default: null },
  replicas: { type: Date, default: null },
  envs: { type: Date, default: null },
  cors: { type: Date, default: null },
  ingress: { type: Date, default: null },
  volume: { type: Date, default: null },
  joining: { type: Date, default: Date.now, required: true },
  progress: [{ step: String, giveUp: Date, finish: Date }],
});

const savior = mongoose.models.Savior || mongoose.model<ISavior>("Savior", saviorSchema);

export default savior;
