import { faker } from "@faker-js/faker/locale/ru";
import { savior, call } from "@/db";
import { ISavior } from "@/db/domain";
import mongoose from "mongoose";

const generateCall = async (): Promise<string> => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const newCall = faker.food.dish().replaceAll(" ", "-").toLowerCase();

  const saviorWithCall = await savior.findOne<ISavior>({ call }).exec();
  const availableCall = await call.findOne<{ call: string }>({ call }).exec();

  if (saviorWithCall === null && availableCall === null) {
    return newCall;
  }

  return await generateCall();
};

export const GET = async (): Promise<Response> => {
  const calls = await Promise.all(Array.from({ length: 50 }).map(async (_) => await generateCall()));
  return new Response(calls.join("\n"));
};
