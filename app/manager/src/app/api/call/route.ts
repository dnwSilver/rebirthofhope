import { faker } from "@faker-js/faker/locale/ru";
import { savior, call } from "@/db";
import { ICall, ISavior } from "@/db/domain";
import mongoose from "mongoose";

const generateCall = async (): Promise<string> => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const newCall = faker.food.dish().replaceAll(" ", "-").toLowerCase();

  const saviorWithCall = await savior.findOne<ISavior>({ call: newCall }).exec();
  const availableCall = await call.findOne<ICall>({ call: newCall }).exec();
  const invalidSymbols = newCall.match(new RegExp(/[^a-zA-Z\-]+/, "i"));

  if (saviorWithCall || availableCall || invalidSymbols || newCall.length > 26) {
    return await generateCall();
  }

  return newCall;
};

export const POST = async (): Promise<Response> => {
  const newCall = await generateCall();

  await call.create<ICall>({ call: newCall });

  return new Response(newCall);
};
