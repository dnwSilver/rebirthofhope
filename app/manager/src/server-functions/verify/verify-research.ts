"use server";

import { savior } from "@/db";
import { ISavior } from "@/db/domain";
import { currentCall } from "@/helpers/current-call";
import { finishStep } from "../finish-step";

export const verifyResearch = async (): Promise<boolean> => {
  const call = await currentCall();

  const currentSavior = await savior.findOne<ISavior>({ call });

  if (!currentSavior?.metrics) {
    return false;
  }

  await finishStep(call, "research");

  return true;
};
