"use server";
import { savior, call } from "@/db";
import { COOKIE_IDENTIFIER_KEY, EXAMPLE_TIME_AVAILABLE, ICall, ISavior, stepNames } from "@/db/domain";
import { faker } from "@faker-js/faker/locale/ru";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const joinSavior = async (): Promise<{ call: string; name: string } | null> => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const saviorCall = await call.findOne<ICall>().exec();

  if (saviorCall === null) {
    return null;
  }

  const saviorName = faker.person.fullName();

  await savior.create<ISavior>({
    name: saviorName,
    call: saviorCall.call,
    country: faker.internet.emoji({ types: ["flag"] }),
  });

  await call.deleteOne({ call: saviorCall.call });

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_IDENTIFIER_KEY, saviorCall.call, {
    sameSite: "strict",
    secure: true,
    expires: Date.now() + EXAMPLE_TIME_AVAILABLE,
  });
  cookieStore.set("name", saviorName);

  return { call: saviorCall.call, name: saviorName };
};
