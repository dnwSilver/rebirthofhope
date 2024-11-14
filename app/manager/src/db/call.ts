import mongoose from "mongoose";
const { Schema } = mongoose;

const callSchema = new Schema<{ call: string }>({
  call: { type: String, required: true },
});

const call = mongoose.models.Call || mongoose.model<{ call: string }>("Call", callSchema);

export default call;
