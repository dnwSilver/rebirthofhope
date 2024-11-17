"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import Manual from "./manual";
import { verifyResearch } from "@/server-functions/verify/verify-research";
import Tutorial from "../tutorials/tutorial";
import Helper from "../helper";

const ResearchManual = () => {
  const call = getCookie("call");

  return (
    <Manual
      stepName={"research"}
      title={"🔬 В поисках истины"}
      verify={verifyResearch}
      error={"Похоже что ты еще не заглядывал в метрики. Настоятельно рекомендую. ☝️"}
    >
      <br />
      <h1>Вход в инфраструктуру</h1>
      <p>Конфигурация у тебя уже есть! Теперь попробуй потрогать свою инфраструктуру.</p>
      <p>
        Трогать ты ее будет через <b>k9s</b>
      </p>
      <p>
        Запускается <b>CLI</b> очень легко! Нужно всего лишь ввести в терминале команду <b>k9s</b>.
      </p>
      <Command text="k9s" />
      <p>
        После входа ты сразу увидишь какой-то <b>POD</b>. Но он тебя не интересует.
      </p>
      <p>Самое главное — ты уже внутри куба 😉.</p>
      <h2>Сбор информации</h2>
      <p>Было бы не плохо определиться с адресами твоих приложений. Этим сейчас ты и займешься.</p>
      <p>
        Найди свой{" "}
        <Tutorial theme="k9s" chapter="namespace">
          namespace
        </Tutorial>{" "}
        с названием <b>{call}</b> и зайди в него. Переходим к списку{" "}
        <Tutorial theme="k9s" chapter="ingress">
          ingress
        </Tutorial>
        'ов.
      </p>
      <p>
        На дашборде <b>ingress</b>'a ты сможешь найти адреса сервисов. Советую их куда-нибудь сохранить, они тебе еще не
        раз понадобятся.
      </p>
      <h2>Проверка состояния</h2>
      <p>Попробуй на них зайти. Сомневаюсь что они будут работать, но для этого тебя и призвали.</p>
      <p>
        У обоих сервисов должны быть <b>endpoint</b>'ы <mark>/metrics</mark>. Попробуй их{" "}
        <Tutorial theme={"httpie"} chapter={"GET"}>
          вызвать
        </Tutorial>
        .
      </p>
      <Helper>
        <Command text={`https ${call}-uix.rebirthofhope.ru/api/metrics`} />
        <br />
        <Command text={`https ${call}-api.rebirthofhope.ru/metrics`} />
      </Helper>
      <p>
        Похоже что <b>API</b> завален полностью, а <b>UIX</b> еще как-то шевелится выбрасываю 500 ошибки.
      </p>
    </Manual>
  );
};

export default ResearchManual;
