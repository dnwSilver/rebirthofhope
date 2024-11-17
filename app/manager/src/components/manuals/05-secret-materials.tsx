"use client";

import { FC } from "react";
import Manual from "./manual";
import Tutorial from "../tutorials/tutorial";
import Command from "../command";
import Helper from "../helper";
import { GO_REPO, GIT_STAGE, GIT_COMMIT, GIT_PUSH, RUN_LINTING } from "../tutorials/commands";
import { verifySecretMaterial } from "@/server-functions/verify/verify-secret-materials";

const SecretMaterialManual: FC = () => {
  return (
    <Manual
      stepName={"secret-materials"}
      title={"🗝️ Секретные материалы"}
      verify={verifySecretMaterial}
      error={"Подключение к базе все еще сломано. Починишь?"}
    >
      <h2>Выносим грязь</h2>
      <p>
        Хочешь не хочешь, а <b>Vim</b> потрогать придется. Если тебе повезет, даже выйти получится.
      </p>
      <p>
        Для замены строки нам понадобится целая гора утилит: <b>Vim</b>, <b>SOPS</b>,<b>GPG</b>,<b>Helm</b>. За их
        грациозным танцем можно смотреть вечно. Потанцуем?
      </p>
      <p>
        Файл с секретами не содержит ничего необычного, это простой <b>yaml</b>. Прочитай файл с секретами командой:
        <Command text="helm secrets decrypt ./environments/production-app/secrets.yaml" />
      </p>
      <p>
        Оказывается, новая строка подключения звучит так <mark>mongodb://bestserverever:27017</mark>. Следующей командой
        можно добраться до{" "}
        <Tutorial theme="editors" chapter="vim">
          редактирования
        </Tutorial>{" "}
        этого файла:
        <Command text="helm secrets edit ./environments/production-app/secrets.yaml" />
      </p>
      <h2>Повторение — мать учения</h2>
      <p>
        <Tutorial theme={"helmfile"} chapter="linting">
          Проверим конфигурацию
        </Tutorial>{" "}
        и{" "}
        <Tutorial theme={"helmfile"} chapter="deploy">
          обновим нашу инфраструктуру
        </Tutorial>
        .
      </p>
      <p>
        <Tutorial theme={"k9s"} chapter={"logs"}>
          Шуршим в логах
        </Tutorial>{" "}
        <b>API</b> и наша ошибка пропала! Правда появилась другая. Никогда такого не было и вот опять👏.
      </p>
      <p>
        Куда же мы без{" "}
        <Tutorial theme={"git"} chapter={"commit"}>
          фиксации
        </Tutorial>{" "}
        нашей работы в <b>git</b>.
      </p>
      <Helper>
        <Command
          text={`${GO_REPO}
${RUN_LINTING}
${GIT_STAGE}
${GIT_COMMIT}
${GIT_PUSH}`}
        />
      </Helper>
    </Manual>
  );
};

export default SecretMaterialManual;
