"use server";
import { savior, call } from "@/db";
import { ISavior, stepNames } from "@/db/domain";
import { faker } from "@faker-js/faker/locale/ru";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const joinSavior = async (): Promise<boolean> => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const saviorCall = await call.findOne().exec();

  if (saviorCall === null) {
    return false;
  }

  const name = faker.person.fullName();

  await savior.create<ISavior>({
    name,
    call: saviorCall.call,
    country: faker.internet.emoji({ types: ["flag"] }),
    progress: stepNames.map((step) => ({
      step,
      giveUp: null,
      finish: null,
    })),
  });

  await call.deleteOne(saviorCall);

  (await cookies()).set("call", saviorCall.call);
  (await cookies()).set("name", name);

  return true;
};
