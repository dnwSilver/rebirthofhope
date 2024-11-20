"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import Manual from "./manual";
import Tutorial from "../tutorials/tutorial";
import Helper from "../helper";
import Example from "../example";
import { COOKIE_IDENTIFIER_KEY } from "@/db/domain";

const ResearchManual = () => {
  const call = getCookie(COOKIE_IDENTIFIER_KEY);

  return (
    <Manual
      stepName={"research"}
      title={"🔬 В поисках истины"}
      error={"Похоже, что ты еще не заглядывал в метрики. Настоятельно рекомендую. ☝️"}
    >
      <h2>Сбор информации</h2>
      <p>Конфигурация у тебя уже есть! Теперь попробуй потрогать свою инфраструктуру.</p>
      <p>
        Трогать ты ее будешь при помощи{" "}
        <Tutorial theme="k9s">
          <b>k9s</b>
        </Tutorial>
        .
      </p>
      <p>
        Запускается <b>CLI</b> очень легко! Нужно всего лишь ввести в терминале команду <mark>k9s</mark>.
      </p>
      <Command text="k9s" />
      <p>
        После входа ты сразу увидишь какой-то <b>POD</b>. Но он тебя не интересует.
      </p>
      <p>Самое главное — ты уже внутри куба 😉.</p>
      <p>Было бы не плохо определиться с адресами твоих приложений. Этим сейчас ты и займешься.</p>
      <p>
        Найди свой{" "}
        <Tutorial theme="k9s" chapter="namespace">
          namespace
        </Tutorial>{" "}
        с названием <b>{call}</b> и зайди в него.
      </p>
      <p>
        Переходим к списку{" "}
        <Tutorial theme="k9s" chapter="ingress">
          ingress
        </Tutorial>
        'ов.
      </p>
      <p>
        На дашборде <b>ingress</b>'a найди доменные имена сервисов. Советую их куда-нибудь сохранить, они тебе еще не
        раз понадобятся.
      </p>
      <Example theme="k9s-ingress" />
      <h2>Проверка состояния</h2>
      <p>
        Попробуй зайти на <b>UIX</b> через браузер и отправить пару запросов на <b>API</b>. Сомневаюсь что они будут
        работать, но для этого тебя и призвали.
      </p>
      <p>
        У обоих сервисов должны быть <b>endpoint</b>'ы <mark>/api/metrics</mark>. Попробуй их вызвать.
      </p>
      <Helper>
        <Command text={`https ${call}-uix.rebirthofhope.ru/api/metrics`} />
        <br />
        <Command text={`https ${call}-api.rebirthofhope.ru/metrics`} />
        <br />
        <Example theme="httpie-metrics" />
      </Helper>
      <p>
        <b>API</b> завален полностью. <b>UIX</b> ещё шевелится, выбрасывая 500 ошибки. Чем богаты, тому и рады 😔.
      </p>
    </Manual>
  );
};

export default ResearchManual;
