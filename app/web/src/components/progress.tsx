import { EXAMPLE_TIME_AVAILABLE, IStep, stepIcons, stepNames } from "@/db/domain";

type ProgressBadge = "🟢" | "🔵" | "🟡" | "⚪️";

export const getStepStatus = (start: Date, step: IStep | undefined): ProgressBadge => {
  if (step?.giveUp) {
    return "🔵";
  }

  if (step?.finish) {
    return "🟢";
  }

  if (Date.now() - new Date(start).getTime() > EXAMPLE_TIME_AVAILABLE) {
    return "⚪️";
  }

  return "🟡";
};

const Progress = ({ progress, start }: { start: Date; progress: IStep[] }) => {
  return (
    <>
      {stepIcons.map((stepIcon) => stepIcon + " ")}
      <br />
      {stepNames.map(
        (stepName) =>
          getStepStatus(
            start,
            progress.find((step) => step.step === stepName)
          ) + " "
      )}
    </>
  );
};

export default Progress;
