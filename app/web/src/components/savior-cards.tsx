"use client";

import { ISavior } from "@/db/domain";
import SaviorCard from "@/components/savior-card";
import useSaviors from "@/hooks/use-saviors";
import { score } from "@/helpers/score";
import { inProgress, isFinish } from "@/helpers/state";

const SaviorCards = () => {
  const { saviors } = useSaviors();

  if (!saviors) {
    return false;
  }

  if (saviors.length === 0) {
    return <p style={{ color: "whitesmoke" }}>Никто не хочет спасать этот мир.</p>;
  }

  const finishSaviors: (ISavior & { score: number })[] = saviors.filter(isFinish).map((savior: ISavior) => ({
    joining: new Date(savior.joining),
    call: savior.call,
    country: savior.country,
    progress: savior.progress,
    name: savior.name,
    linting: savior.linting,
    metrics: savior.metrics,
    score: score(new Date(savior.joining), savior.progress),
  }));

  const processedSaviors: ISavior[] = saviors.filter(inProgress);

  return (
    <section style={{ height: "calc(100vh - 2rem)", overflow: "scroll", margin: "1rem" }}>
      {processedSaviors
        .sort((a, b) => b.progress.filter((s) => !!s.finish).length - a.progress.filter((s) => !!s.finish).length)
        .map((savior) => (
          <SaviorCard
            key={savior.name}
            start={savior.joining}
            name={savior.name}
            country={savior.country}
            progress={savior.progress}
          />
        ))}
      {finishSaviors.length > 0 && processedSaviors.length > 0 && (
        <>
          <br />
          <hr />
          <br />
        </>
      )}
      {finishSaviors
        .sort((a, b) => a.score - b.score)
        .map((savior, idx) => (
          <SaviorCard
            key={savior.name}
            start={savior.joining}
            name={savior.name}
            position={idx + 1}
            country={savior.country}
            progress={savior.progress}
            score={savior.score}
          />
        ))}
    </section>
  );
};

export default SaviorCards;
