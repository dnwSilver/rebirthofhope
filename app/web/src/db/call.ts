import mongoose from "mongoose";
import { ICall } from "./domain";
const { Schema } = mongoose;

const callSchema = new Schema<ICall>({
  call: { type: String, required: true, unique: true },
});

const call = mongoose.models.Call || mongoose.model<ICall>("Call", callSchema);

export default call;
