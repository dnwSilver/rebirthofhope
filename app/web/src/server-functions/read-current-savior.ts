"use server";

import { savior } from "@/db";
import { COOKIE_IDENTIFIER_KEY, ISavior } from "@/db/domain";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const readCurrentSavior = async (): Promise<string | null> => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const call = (await cookies()).get(COOKIE_IDENTIFIER_KEY);
  const saviorCall = await savior.findOne<ISavior>({ call: call?.value }).exec();

  return JSON.stringify(saviorCall);
};
