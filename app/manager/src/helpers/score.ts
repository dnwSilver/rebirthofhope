import { EXAMPLE_TIME_AVAILABLE, IStep } from "@/db/domain";

export const score = (start: string | Date, progress: IStep[]): number => {
  const startDate = new Date(start);

  const finish = progress.find((step) => step.step === "restoration")?.finish;

  if (finish) {
    const finishDate = new Date(finish);

    const finishScore = finishDate.getTime() - startDate.getTime();

    if (finishScore < EXAMPLE_TIME_AVAILABLE) {
      return finishScore;
    }

    return EXAMPLE_TIME_AVAILABLE;
  }

  if (startDate.getTime() + EXAMPLE_TIME_AVAILABLE < Date.now()) {
    return EXAMPLE_TIME_AVAILABLE;
  }

  return startDate.getTime() + EXAMPLE_TIME_AVAILABLE;
};
