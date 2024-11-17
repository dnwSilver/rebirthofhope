import { faker } from "@faker-js/faker/locale/ru";
import { savior, call } from "@/db";
import { ICall, ISavior } from "@/db/domain";
import mongoose from "mongoose";

const generateCall = async (): Promise<string> => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const newCall = faker.food.dish().replaceAll(" ", "-").toLowerCase();

  const saviorWithCall = await savior.findOne<ISavior>({ call }).exec();
  const availableCall = await call.findOne<ICall>({ call }).exec();

  if (saviorWithCall !== null || availableCall !== null || newCall.length > 26) {
    return await generateCall();
  }

  return newCall;
};

export const POST = async (): Promise<Response> => {
  const newCall = await generateCall();

  await call.create<ICall>({ call: newCall });

  return new Response(newCall);
};
