"use client";

import { FC } from "react";
import Manual from "./manual";
import Command from "../command";
import { getCookie } from "@/helpers/cookies";
import DeployHint from "../deploy-hint";
import CommitHint from "../commit-hint";
import Example from "../example";

const ReunionManual: FC = () => {
  const call = getCookie("call");

  return (
    <Manual stepName={"reunion"} title={"🔗 Вместе навсегда"} error={"API и UIX все еще в разлуке 💔"}>
      <h2>Небольшая оплошность</h2>
      <p>
        Ух ты, <b>API</b>'шка заработала! С ней можно сыграть в пинг-понг🏓:
        <Command text={`https ${call}-api.rebirthofhope.ru/api/ping`} />
      </p>
      <p>
        <b>UIX</b> что-то хромает по адресу{" "}
        <a href={`https://${call}-uix.rebirthofhope.ru/`}>https://{call}-uix.rebirthofhope.ru/</a>.
      </p>
      <p>
        При внимательном изучении вкладки <b>network</b> в <b>devtools</b> выяснилось интересное.
      </p>
      <p>
        <b>UIX</b> смотрит не туда 🤡!
      </p>
      <p>
        Он смотрит на <mark>https://{call}-api.abyssofdespair.ru</mark>, вместо{" "}
        <mark>https://{call}-api.rebirthofhope.ru</mark>.
      </p>
      <Example theme="chrome-network" />
      <p>
        Погнали менять это в файле <mark>environments/production-app/uix.yaml.gotmpl</mark>.
      </p>
      <br />
      <DeployHint />
      <h2>Еще один круг</h2>
      <p>
        Прыгаем в <a href={`https://${call}-uix.rebirthofhope.ru/`}>UIX</a>. <b>API</b> отвечает 🥳. Но похоже нас
        подрезали <b>CORS</b>'ы. Дела, дела.
      </p>
      {/* TODO ТУТ БУДЕТ GIF */}
      <br />
      <CommitHint action="Толкаем" result="нашу поделку" />
    </Manual>
  );
};

export default ReunionManual;
