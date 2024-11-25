import mongoose from "mongoose";
import { ISavior } from "@/domain";
const { Schema } = mongoose;

const saviorSchema = new Schema<ISavior>(
  {
    name: { type: String, required: true },
    call: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    linting: { type: Date, default: false },
    metrics: { type: Date, default: false },
    resources: { type: Date, default: false },
    logs: { type: Date, default: false },
    secrets: { type: Date, default: false },
    replicas: { type: Date, default: false },
    envs: { type: Date, default: false },
    cors: { type: Date, default: false },
    ingress: { type: Date, default: false },
    volume: { type: Date, default: false },
    joining: { type: Date, default: Date.now, required: true },
    progress: [{ step: String, giveUp: Date, finish: Date }],
  }
);

const savior = mongoose.models.Savior || mongoose.model<ISavior>("Savior", saviorSchema);

export default savior;
