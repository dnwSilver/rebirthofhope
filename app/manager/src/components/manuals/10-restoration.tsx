"use client";

import { FC } from "react";
import Manual from "./manual";
import { verifyRestoration } from "@/server-functions/verify/verify-restoration";
import DeployHint from "../deploy-hint";
import CommitHint from "../commit-hint";
import Tutorial from "../tutorials/tutorial";

const RestorationManual: FC = () => {
  return (
    <Manual
      stepName={"restoration"}
      title={"🖼️ Реставрация"}
      verify={verifyRestoration}
      error={"Ну и где мои картины?"}
    >
      <h2>А ты точно реставратор?</h2>
      <p>Картины вроде как есть, но они не те. Хранилище картин настроили не правильно. Ну, бывает.</p>
      <p>Мы оба знаем кому исправлять эту оплошность.</p>
      <p>
        Помнится, что хранилище имеет путь <mark>/.output/public/arts</mark>, оно должно быть{" "}
        <Tutorial theme="editors" chapter="vim">
          зафиксировано
        </Tutorial>{" "}
        в файле <mark>environments/production-app/uix.yaml.gotmpl</mark> в разделе в <b>volumeMounts</b>.
      </p>
      <DeployHint />
      <h2>День сурка</h2>
      <b>Лучше открывать сайт в инкогнито, или сбросить cache.</b>
      <p>Ну наконец-то! Победа, все баги устранены. Можно пойти на обед🥙.</p>
      <p>
        Ты узрел лучшие картины мира! Не на долго правда, но это не важно, ведь искусство это время и пространство, в
        котором живет красота.
      </p>
      <br />
      <CommitHint action="Вносим" result="наш вклад" />
    </Manual>
  );
};

export default RestorationManual;
