"use client";

import { FC } from "react";
import Manual from "./manual";
import { verifyScenarioArmor } from "@/server-functions/verify/verify-scenario-armor";
import CommitHint from "../commit-hint";
import DeployHint from "../deploy-hint";
import { getCookie } from "@/helpers/cookies";
import Example from "../example";

const ScenarioArmorManual: FC = () => {
  const call = getCookie("call");

  return (
    <Manual
      stepName={"scenario-armor"}
      title={"🛡️ Сценарная броня"}
      verify={verifyScenarioArmor}
      error={"Недостаточно защиты!"}
    >
      <h2>Вечная война с CORS</h2>
      <p>
        И что тут у нас? Обычная история про отсутствие адреса <b>UIX</b> в списке <b>origin</b>'ов у <b>API</b>.
      </p>
      <p>
        Хранится этот список тут: <mark>/environments/production-app/api.yaml.gotmpl</mark>. По-моему это было поле{" "}
        <b>app.cors.origins</b>, там вроде указана сейчас какая-то хрень.
      </p>
      <br/>
      <Example theme="chrome-cors"/>
      <br/>
      <p>
        Не западло поменять на <mark>https://{call}-uix.rebirthofhope.ru</mark>?
      </p>
      <br />
      <DeployHint />
      <h2>Deploy, deploy, deploy</h2>
      <p>
        Заглядывал после <b>deploy</b>'я на сайт? Всё вроде указали правильно, а оно не работает.🥲 Главное ведь что на
        моей машинке то работает!
      </p>
      {/* TODO ТУТ БУДЕТ GIF */}
      <p>Ладно. Что сделали сохраним. А решать проблему будем по другому!</p>
      <p>
        Нет <b>CORS</b> — нет проблемы.
      </p>
      <br />
      <CommitHint action="Закидываем" result="наш фикс" />
    </Manual>
  );
};

export default ScenarioArmorManual;
