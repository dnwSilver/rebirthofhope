"use client";

import { FC } from "react";
import Manual from "./manual";
import { verifyMaundyThursday } from "@/server-functions/verify/verify-maundy-thursday";
import CommitHint from "../commit-hint";
import DeployHint from "../deploy-hint";
import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import Tutorial from "../tutorials/tutorial";

const MaundyThursdayManual: FC = () => {
  const call = getCookie("call");

  return (
    <Manual
      stepName={"maundy-thursday"}
      title={"🧹 Чистый четверг"}
      verify={verifyMaundyThursday}
      error={"Недостаточно чисто. Должно быть идеально!"}
    >
      <h2>Чистим-чистим трубочиста - чисто-чисто, чисто-чисто!</h2>
      <p>
        Сразу надо было избавиться от этих <b>CORS</b>! Без них даже чище будет:
        <ul>
          <li>
            уйдут всякие <b>preflight</b> запросы;
          </li>
          <li>конфигурировать надо будет меньше;</li>
          <li>
            общие печеньки 🍪 для <b>API</b> и <b>UIX</b>;
          </li>
          <li>
            Со стороны будет казаться что сайт держит сам свою <b>API</b>, как будто это монолит!
          </li>
        </ul>
      </p>
      <br />
      <p>
        Нужно-то всего-то поднять-то <b>extra ingress</b>. Приключение на 20 минут, вошли и вышли. Этот{" "}
        <b>extra ingress</b> будет принимать все запросы начинающиеся на{" "}
        <mark>https://{call}-uix.rebirthofhope.ru/api/</mark> и уводить их на{" "}
        <mark>https://{call}-api.rebirthofhope.ru/api/</mark>.
      </p>
      <br />
      <p>
        Ползём в файл <mark>/environments/production-app/api.yaml.gotmpl</mark>. Туда{" "}
        <Tutorial theme="editors" chapter="vim">
          скидываем
        </Tutorial>{" "}
        такой кусок:
        <Command
          text={`extraIngress:
  enabled: true
  ingresses:
    - name: ${call}-uix.rebirthofhope.ru
      annotations:
        nginx.ingress.kubernetes.io/use-regex: "true"
      hosts:
        - host: ${call}-uix.rebirthofhope.ru
          paths:
            - path: /api/*`}
        />
      </p>
      {/* TODO ТУТ БУДЕТ GIF */}
      <br />
      <DeployHint />
      <h2>Шо, опять?</h2>
      <p>
        Вроде все начало шелестеть. В k9s можно найти оба{" "}
        <Tutorial theme={"k9s"} chapter="ingress">
          ingress
        </Tutorial>
        'а.
      </p>
      {/* TODO ТУТ БУДЕТ GIF */}
      <p>
        <b>UIX</b> запросы отправляет, <b>API</b> отвечает. Идиллия, но есть нюанс. Картины есть, но не те что нужно.
      </p>
      <br />
      <CommitHint action="Отправляем" result="наше подношение" />
    </Manual>
  );
};

export default MaundyThursdayManual;
