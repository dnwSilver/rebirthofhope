import { COOKIE_IDENTIFIER_KEY } from "@/db/domain";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const currentCall = async () => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }
  const cookiesStorage = await cookies();

  const call = cookiesStorage.get(COOKIE_IDENTIFIER_KEY);

  return call?.value;
};
