"use client";

import { FC } from "react";
import Manual from "./manual";
import Tutorial from "../tutorials/tutorial";
import { getCookie } from "@/helpers/cookies";
import { verifySortWheatFromChaff } from "@/server-functions/verify/verify-sort-wheat-from-chaff";
import DeployHint from "../deploy-hint";
import CommitHint from "../commit-hint";

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
      <p>Что-то там слишком много логов🤯, тянутся, летят. Глаз ни за что не цепляется даже.</p>
      <p>
        Похоже, кто-то занимался отладкой <b>API</b> на <b>prod</b>'е и забыл отключить <b>trace</b>'ы. Бог ему судья.
      </p>
      {/* TODO ТУТ БУДЕТ GIF */}

      <p>
        Пойдем{" "}
        <Tutorial theme={"editors"} chapter="vim">
          изменим
        </Tutorial>{" "}
        уровень логирования с <mark>trace</mark> на что-то более вменяемое, например на <mark>info</mark>.
      </p>
      <br />
      <DeployHint />
      <h2>Только нужное</h2>
      <p>
        Повторим упражнение. Опять{" "}
        <Tutorial theme={"k9s"} chapter={"logs"}>
          топаем в логи
        </Tutorial>{" "}
        <b>API</b> и теперь то нам видна ошибка.
      </p>
      <p>Теперь то понятно! Просто пароли для строки подключения к БД в секретах протухли😯.</p>
      <p>Ты это починишь. Но не сейчас.</p>
      <br />
      <CommitHint action="Складываем" result="все добро" />
    </Manual>
  );
};

export default SortWheatFromChaffManual;
