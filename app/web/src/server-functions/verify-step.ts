"use server";

import { savior } from "@/db";
import { ISavior, StepName, stepValidators } from "@/db/domain";
import { currentCall } from "@/helpers/current-call";
import { finishStep } from "./finish-step";

export const verifyStep = async (step: StepName): Promise<boolean> => {
  const call = await currentCall();

  const currentSavior = await savior.findOne<ISavior>({ call });

  if (currentSavior === null || !(currentSavior as any)[stepValidators[step]]) {
    return false;
  }

  await finishStep(call, step);

  return true;
};
