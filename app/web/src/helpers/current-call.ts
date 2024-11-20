import mongoose from "mongoose";
import { cookies } from "next/headers";

export const currentCall = async () => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const call = (await cookies()).get("call");

  return call?.value;
};
