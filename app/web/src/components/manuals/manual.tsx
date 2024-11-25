"use client";

import { useSavior, useProgress } from "@/store/store";
import Button from "../button";
import { PropsWithChildren, ReactNode } from "react";
import { StepName } from "@/db/domain";
import { verifyStep } from "@/server-functions/verify-step";

type Props = {
  stepName: StepName;
  title: string;
  error: string;
  showButton?: boolean;
} & PropsWithChildren;

const Manual = (props: Props) => {
  const { stepName, title, error, children, showButton = true } = props;
  const { currentSavior, actualize } = useSavior();
  const { toggle } = useProgress();

  const isFinished = currentSavior?.progress.some((step) => step.step === stepName && step.finish !== null);

  const handleVerifyClick = async () => {
    const isSuccess = await verifyStep(stepName);
    if (isSuccess) {
      actualize();
      toggle();
    } else {
      alert(error);
    }
  };

  return (
    <>
      <h1>{title}</h1>
      <section>
        {children}
        {!isFinished && showButton && (
          <Button
            style={{
              position: "fixed",
              // width: "6rem",
              bottom: "1rem",
              right: "17rem",
              zIndex: "3",
            }}
            onClick={handleVerifyClick}
            disabled={!!isFinished}
          >
            Все сделано!
          </Button>
        )}
      </section>
    </>
  );
};

export default Manual;
