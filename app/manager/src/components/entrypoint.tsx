import { getCookie } from "@/helpers/cookies";
import { panel } from "@/styles/panel";
import Command from "./command";
import { ISavior, previousSteps, steps, stepsRU } from "@/db/domain";
import { getStepStatus } from "./progress";
import { useEffect, useState } from "react";
import { readCurrentSavior } from "@/server-functions/read-current-savior";
import Link from "next/link";

const EntryPoint = () => {
  const call = getCookie("call");

  const [currentSavior, setCurrentSavior] = useState<ISavior | null>();

  useEffect(() => {
    readCurrentSavior().then((savior) => setCurrentSavior(JSON.parse(savior)));
  }, []);

  return (
    <section style={panel}>
      Мы рады что ты с нами <b>{decodeURIComponent(getCookie("name") || "")}</b>!
      <br />
      Твой позывной <b>{call}</b>.
      <br />
      <br />
      Доступ можно получить только через специальный контейнер, который нам подготовили наши предки:
      <br />
      <br />
      <Command text={`docker run -e call=${call} -ti dnwsilver/k8s-workstation:latest /bin/bash`} />
      <br />
      <br />
      {currentSavior &&
        Object.keys(steps).map((step) => {
          const currentStep = currentSavior.progress.find((s) => s.step === steps[step]);
          const previousStep = previousSteps[step];
          const isStepAvailable = previousStep === null || previousStep?.finish || previousStep?.giveUp;
          const isStepFinish = currentStep?.finish || currentStep?.giveUp;

          return (
            <h3 style={{ display: "grid", gridTemplateColumns: "2rem 2rem auto 10rem" }}>
              <span> {getStepStatus(new Date(currentSavior.joining), currentStep)} </span>
              <span>{steps[step]}</span>
              <span style={{ textDecoration: isStepFinish ? "line-through" : "none" }}>{stepsRU[step]}</span>
              {isStepAvailable && <Link href={`/manual/${step}`}>📝 Методичка</Link>}
            </h3>
          );
        })}
    </section>
  );
};

export default EntryPoint;
