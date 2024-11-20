"use server";

import { savior } from "@/db";
import mongoose from "mongoose";

export const readSaviors = async (): Promise<string | null> => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  } else {
    throw new Error("Environment variable DB not found.");
  }

  return JSON.stringify(await savior.find({}, "call country joining name progress").exec())
    .replaceAll(/,"_id":"........................"/gu, "")
    .replaceAll(/"_id":"........................",/gu, "");
};
