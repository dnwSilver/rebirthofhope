import mongoose from "mongoose";
import { ISavior } from "@/domain";
const { Schema } = mongoose;

const saviorSchema = new Schema<ISavior>({
  name: { type: String, required: true },
  call: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  linting: { type: Boolean, default: false },
  metrics: { type: Boolean, default: false },
  resources: { type: Boolean, default: false },
  logs: { type: Boolean, default: false },
  secrets: { type: Boolean, default: false },
  replicas: { type: Boolean, default: false },
  envs: { type: Boolean, default: false },
  cors: { type: Boolean, default: false },
  ingress: { type: Boolean, default: false },
  volume: { type: Boolean, default: false },
  features: { type: Boolean, default: false },
  joining: { type: Date, default: Date.now, required: true },
  progress: [{ step: String, giveUp: Date, finish: Date }],
});

const savior = mongoose.models.Savior || mongoose.model<ISavior>("Savior", saviorSchema);

export default savior;
