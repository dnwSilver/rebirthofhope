"use client";

import { FC } from "react";
import Manual from "./manual";
import Tutorial from "../tutorials/tutorial";
import Helper from "../helper";
import Command from "../command";
import { getCookie } from "@/helpers/cookies";
import { GIT_COMMIT, GIT_PUSH, GIT_STAGE, GO_REPO, RUN_DEPLOY, RUN_LINTING } from "../tutorials/commands";
import { verifySortWheatFromChaff } from "@/server-functions/verify/sort-wheat-from-chaff";

const SortWheatFromChaffManual: FC = () => {
  const call = getCookie("call");

  return (
    <Manual
      stepName={"sort-wheat-from-chaff"}
      title={"🌾 Отделение зёрен от плевел"}
      verify={verifySortWheatFromChaff}
      error={"Логов все равно многовато 😥"}
    >
      <h2>Почитаем?</h2>
      <p>
        Читать полезно. Давай и мы{" "}
        <Tutorial theme={"k9s"} chapter={"logs"}>
          заглянем в логи
        </Tutorial>{" "}
        наших сервисов.
      </p>
      <p>Что-то там слишком много логов, тянутся, летят. Глаз ни за что не цепляется даже.</p>
      <p>
        Похоже кто-то занимался отладкой <b>API</b> на проде и забыл отключить трейсы. Бог ему судья.
      </p>
      <p>
        Пойдем{" "}
        <Tutorial theme={"editors"} chapter="vim">
          изменим
        </Tutorial>{" "}
        уровень логирования с <mark>trace</mark> на что-то более вменяемое, например на <mark>info</mark>.
      </p>
      <p>
        Как обычно{" "}
        <Tutorial theme={"helmfile"} chapter="linting">
          проверим конфигурацию
        </Tutorial>{" "}
        и{" "}
        <Tutorial theme={"helmfile"} chapter="deploy">
          обновим нашу инфраструктуру
        </Tutorial>
        .
      </p>
      <Helper>
        <Command
          text={`${GO_REPO}
${RUN_LINTING}
${RUN_DEPLOY}`}
        />
      </Helper>
      <h2>Только нужное</h2>
      <p>
        Повторим упражнение! Опять{" "}
        <Tutorial theme={"k9s"} chapter={"logs"}>
          топаем в логи
        </Tutorial>{" "}
        <b>API</b> и теперь то нам видна ошибка!
      </p>
      <p>Теперь то понятно, что просто забыли указать строку подключения к БД в секретах.</p>
      <p>Ты это починишь. Но не сейчас.</p>
      <p>
        Сперва надо{" "}
        <Tutorial theme={"git"} chapter={"commit"}>
          зафиксировать
        </Tutorial>{" "}
        результаты нашей работы в <b>git</b>.
      </p>
      <Helper>
        <Command
          text={`${GO_REPO}
${GIT_STAGE}
${GIT_COMMIT}
${GIT_PUSH}`}
        />
      </Helper>
    </Manual>
  );
};

export default SortWheatFromChaffManual;
