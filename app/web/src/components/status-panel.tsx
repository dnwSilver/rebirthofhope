"use client";

import { panel } from "@/styles/panel";
import Button from "./button";
import { steps, previousSteps, stepsRU } from "@/db/domain";
import Link from "next/link";
import { getStepStatus } from "./progress";
import useCurrentSavior from "@/hooks/use-current-savior";
import { useProgress } from "@/store/store";
import { useEffect } from "react";

const StatusPanel = () => {
  const { hide, open, toggle } = useProgress();

  const { currentSavior, actualize } = useCurrentSavior();

  useEffect(() => {
    actualize();
  }, [hide]);

  if (!currentSavior && hide) {
    return false;
  }

  if (!currentSavior) {
    return false;
  }

  return (
    <>
      <Button
        disabled={open}
        style={{
          position: "fixed",
          width: "7rem",
          bottom: "1rem",
          right: "8rem",
          zIndex: 2,
        }}
        onClick={async () => {
          toggle();
          localStorage.setItem("first", Date.now().toLocaleString());
        }}
      >
        Прогресс
      </Button>
      <section
        style={{
          ...panel,
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",
          top: "15rem",
          left: "calc(50vw - 20rem)",
          width: "40rem",
          paddingBottom: "1.5rem",
          display: open ? "block" : "none",
          borderRadius: 5,
          overflow: "scroll",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <Button
          style={{
            position: "absolute",
            width: "7rem",
            bottom: "0.25rem",
            left: "calc(50% - 3.5rem)",
            zIndex: 2,
          }}
          onClick={async () => {
            toggle();
            localStorage.setItem("first", Date.now().toLocaleString());
          }}
          disabled={false}
        >
          Скрыть
        </Button>
        <h2>Прогресс</h2>
        {currentSavior &&
          Object.keys(steps).map((step) => {
            const currentStep = currentSavior.progress.find((s) => s.step === step);
            const previousStep = currentSavior.progress.find((s) => s.step === previousSteps[step]);
            const isStepAvailable = previousStep === undefined || previousStep?.finish || previousStep?.giveUp;
            const isStepFinish = currentStep?.finish || currentStep?.giveUp;

            return (
              <h3 key={step} style={{ display: "grid", gridTemplateColumns: "2rem 2rem auto 10rem" }}>
                <span> {getStepStatus(new Date(currentSavior.joining), currentStep)} </span>
                <span>{steps[step]}</span>
                <span style={{ textDecoration: isStepFinish ? "line-through" : "none" }}>{stepsRU[step]}</span>
                {isStepAvailable && (
                  <span>
                    📝
                    <Link href={`/manual/${step}`} onClick={toggle}>
                      Методичка
                    </Link>
                  </span>
                )}
              </h3>
            );
          })}
      </section>
    </>
  );
};

export default StatusPanel;
