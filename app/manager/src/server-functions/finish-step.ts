"use server";

import { savior } from "@/db";
import { ISavior, StepName } from "@/db/domain";

export const finishStep = async (call: string | undefined, stepName: StepName) => {
  const updatedSavior = await savior.findOne<ISavior>({ call });

  if (updatedSavior) {
    const stepIndex = updatedSavior.progress.findIndex((step) => step.step === stepName);
    updatedSavior.progress[stepIndex].finish = new Date(Date.now());

    await savior.updateOne<ISavior>({ call }, { progress: updatedSavior.progress });
  }
};
