"use server";

import { savior } from "@/db";
import { ISavior, StepName, steps } from "@/db/domain";

export const finishStep = async (call: string | undefined, stepName: StepName) => {
  const updatedSavior = await savior.findOne<ISavior>({ call });

  if (updatedSavior) {
    const stepIndex = updatedSavior.progress.findIndex((step) => step.step === stepName);
    updatedSavior.progress[stepIndex].finish = new Date(Date.now());

    console.log(`${steps[stepName]}${call} close step ${stepName}`);

    if (stepName === "restoration") {
      console.log(`🏁${call} finish practice`);
    }

    await savior.updateOne<ISavior>({ call }, { progress: updatedSavior.progress });
  }
};
