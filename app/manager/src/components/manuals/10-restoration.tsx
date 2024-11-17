"use client";

import { FC } from "react";
import Manual from "./manual";
import { verifyRestoration } from "@/server-functions/verify/verify-restoration";
import DeployHint from "../deploy-hint";
import CommitHint from "../commit-hint";

const RestorationManual: FC = () => {
  return (
    <Manual
      stepName={"restoration"}
      title={"🖼️ Реставрация"}
      verify={verifyRestoration}
      error={"Ну и где мои картины?"}
    >
      <h2>А ты точно реставратор?</h2>
      <br />
      <p>Проб</p>
      <DeployHint />
      <h2>День сурка</h2>
      <p>Ну наконец-то! Победа, все баги устранены. Можно пойти на обед🥙.</p>
      <br />
      <CommitHint action="Вносим" result="наш вклад" />
    </Manual>
  );
};

export default RestorationManual;
