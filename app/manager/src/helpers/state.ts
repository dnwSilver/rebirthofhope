import { EXAMPLE_TIME_AVAILABLE, ISavior } from "@/db/domain";

export const inProgress = (savior: ISavior) => {
  if (new Date(savior.joining).getTime() + EXAMPLE_TIME_AVAILABLE < Date.now()) {
    return false;
  }

  if (savior.progress.find((step) => step.step === "restoration" && step.finish !== null)) {
    return false;
  }

  return true;
};

export const isFinish = (savior: ISavior) => !inProgress(savior);
