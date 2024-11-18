"use client";

import { FC } from "react";
import Manual from "./manual";
import { verifyAttackOfTheClones } from "@/server-functions/verify/verify-attack-of-the-clones";
import Tutorial from "../tutorials/tutorial";
import DeployHint from "../deploy-hint";
import CommitHint from "../commit-hint";
import Example from "../example";

const AttackOfTheClonesManual: FC = () => {
  return (
    <Manual
      stepName={"attack-of-the-clones"}
      title={"👯‍♀️ Атака клонов"}
      verify={verifyAttackOfTheClones}
      error={"Слишком мало подов, надо больше."}
    >
      <h2>Опять работа?</h2>
      <p>
        <Tutorial theme={"k9s"} chapter={"logs"}>
          Бродя по логам
        </Tutorial>{" "}
        <b>API</b> мы поняли, что есть нехватка оперативной памяти. Увеличивать ресурсы за счет лимитов уже нельзя,
        увы. Но есть еще один способ. Горизонтально масштабирование. Разработчики контейнеров обещали, конечно же,
        корректную работы своих продуктов в таком стиле.
      </p>
      <p>
        <Tutorial theme={"k9s"} chapter={"logs"}>
          Прогуляемся
        </Tutorial>{" "}
        до файла <mark>/environments/production-app/api.yaml.gotmpl</mark>. В нем должен быть параметр{" "}
        <mark>replicaCount</mark>. Давай увеличим количество реплик наших подов до <b>2</b>?
      </p>
      <Example theme="k9s-replica"/>
      <br />
      <DeployHint />
      <h2>Опять двадцать пять</h2>
      <p>
        <Tutorial theme={"k9s"} chapter={"pods"}>
          Пялимся в <b>POD</b>'ы
        </Tutorial>{" "}
        <b>API</b>, видим нашу пару, Наташу и Томару. Радостные{" "}
        <Tutorial theme={"k9s"} chapter={"logs"}>
          бежим в логи
        </Tutorial>{" "}
        <b>API</b> и видим другую ошибку 🤪. Ну теперь нам, хотя бы хватает ресурсов. А это ошибка это проблема будущего
        тебя 🫵.
      </p>
      <br />
      <CommitHint action="Пихаем" result="нашу работы" />
    </Manual>
  );
};

export default AttackOfTheClonesManual;
