"use server";

import { savior } from "@/db";
import { ISavior } from "@/db/domain";
import { currentCall } from "@/helpers/current-call";
import { finishStep } from "../finish-step";

export const verifyDeepDive = async (): Promise<boolean> => {
  const call = await currentCall();

  const currentSavior = await savior.findOne<ISavior>({ call });

  if (!currentSavior?.linting) {
    return false;
  }

  await finishStep(call, "deep-dive");

  return true;
};
