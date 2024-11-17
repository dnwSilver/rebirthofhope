"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import Manual from "./manual";
import { verifyResearch } from "@/server-functions/verify/verify-research";

const ResearchManual = () => {
  const call = getCookie("call");

  return (
    <Manual
      stepName={"research"}
      title={"🔬 В поисках истины"}
      verify={verifyResearch}
      error={"Похоже что ты еще не заглядывал в метрики. Настоятельно рекомендую. ☝️"}
    >
      <h1>Вход в инфраструктуру</h1>
      <p>Конфигурация у тебя уже есть! Теперь попробуй потрогать свою инфраструктуру.</p>
      <p>
        Трогать ты ее будет через <b>k9s</b>
      </p>
      <p>
        Запускается <b>CLI</b> очень легко! Нужно всего лишь ввести в терминале команду <b>k9s</b>.
      </p>
      <Command text="k9s" />
      <br />
      <p>
        После входа ты сразу увидишь какой-то <b>POD</b>. Но он тебя не интересует.
      </p>
      <p>Самое главное — ты уже внутри куба 😉.</p>
      <br />
      <br />
      <h2>Сбор информации</h2>
      <p>
        Было бы не плохо определиться с адресами твоих приложений. Этим сейчас ты и займешься. Для этого надо знать что
        такое команды и фильтры.
      </p>
      <p>
        Команды в <b>k9s</b> можно вводить после нажатия символа <mark>shift + ;</mark>.
      </p>
      <p>
        Фильтры в <b>k9s</b> можно вводить после нажатия символа <mark>/</mark>.
      </p>
      <p>
        Для применения команды или фильтра используем <mark>Enter</mark>.
      </p>
      <p>
        Для отмены команды или фильтра используем <mark>Esc</mark>.
      </p>
      <p>
        В кубах сервисы живут в <b>namespace</b>'ах. Проверить перечень <b>namespace</b>'ов можно использовав команду{" "}
        <mark>namespace</mark>/<mark>ns</mark>.
      </p>
      <p>
        Найди свой namespace с названием <b>{call}</b> и зайди в него. После этого посмотри его <b>ingress</b>'ы
        командой <mark>ingress</mark>/<mark>ing</mark>.
      </p>
      <p>
        На дашборде <b>ingress</b>'a ты сможешь найти адреса сервисов. Советую их куда-нибудь сохранить, они тебе еще не
        раз понадобятся.
      </p>
      <br /> <br />
      <h2>Проверка состояния</h2>
      <p>Попробуй на них зайти. Сомневаюсь что они будут работать, но для этого тебя и призвали.</p>
      <p>
        У обоих сервисов должны быть <b>endpoint</b>'ы <mark>/metrics</mark>
      </p>
      <Command text={`https ${call}-uix.rebirthofhope.ru/api/metrics`} />
      <br />
      <Command text={`https ${call}-api.rebirthofhope.ru/metrics`} />
      <p>Похоже что <b>API</b> завален полностью, а <b>UIX</b> еще как-то шевелится выбрасываю 500 ошибки.</p>
    </Manual>
  );
};

export default ResearchManual;
