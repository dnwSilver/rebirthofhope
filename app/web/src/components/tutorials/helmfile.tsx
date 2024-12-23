"use client";

import { FC } from "react";
import Command from "../command";
import Tutorial from "./tutorial";
import Example from "../example";

const HelmfileTutorial: FC = () => (
  <>
    <h1>Helmfile</h1>
    <h2 id="deploy">Публикация приложений</h2>
    <p>
      Конфигурация отправляется в кластер всего одной командой. Улетает сразу <b>API</b> и <b>UIX</b>.
    </p>
    <Command text={`helmfile --environment production-app apply`} />
    <br />
    <Example theme="helmfile-deploy" />
    <br />
    <p>
      Если что-то пошло не так то процедура обновления будет длительной (более 30 сек). Можно отправить сигнал для
      остановки процесса <mark>CTRL + C</mark>.
    </p>
    <h2 id="linting">Проверка целостности</h2>
    <p>
      Запускать её нужно перед каждым{" "}
      <Tutorial theme="git" chapter="commit">
        commit
      </Tutorial>
      'ом в репозиторий , для того чтобы убедиться что мы все заполнили корректно.
    </p>
    <Command text={`make verify`} />
    <br />
    <Example theme="helmfile-verify" />
    <br />
    <br />
    <p>Вместо полной проверки можно запускать по частям.</p>
    <Example theme="helmfile-linting" />
  </>
);

export default HelmfileTutorial;
