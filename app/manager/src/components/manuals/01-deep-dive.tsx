"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import Manual from "./manual";
import { verifyDeepDive } from "@/server-functions/verify/verify-deep-dive";
import Tutorial from "../tutorials/tutorial";
import { REPO_CLONE, REPO_GO, RepoSwitch, RUN_DEPLOY } from "../tutorials/commands";
import Helper from "../helper";
import Example from "../example";

const DeepDiveManual = () => {
  const call = getCookie("call");

  return (
    <Manual
      stepName="deep-dive"
      title="🤿 Двадцать тысяч лье под водой"
      error="Похоже, что ты еще не выполнил полную проверку линтинга в контейнере."
      verify={verifyDeepDive}
    >
      <h2>Понеслась</h2>
      <p>Что ж. Начнём.</p>
      <p>Заранее спасибо за оказанную помощь!</p>
      <br />
      <p>Обозначим пару правил:</p>
      <ul>
        <li>Все действия должны быть из командной строки;</li>
        <li>Использовать браузер можно для диагностики UIX;</li>
        <li>Все действия должны быть сделаны в докер контейнере;</li>
        <li>Нельзя ломать и вредить, все крайне хрупкое;</li>
        <li>После того как все действия в шаге выполнены, нужно завершить его (кнопка внизу страницы);</li>
        <li>
          Для редактирования текста есть <b>vim</b>, ну или менее хардкорный <b>nano</b>.
        </li>
      </ul>
      <h2>Подключение к рабочей среде</h2>
      <p>
        Для запуска у тебя должен быть установлен <b>docker</b>. Настоятельно рекомендуем поставить{" "}
        <a href="https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/Hack.zip">Nerd шрифт</a> в терминал,
        иначе некоторые иконки могут не отображаться.
      </p>
      <br />
      <p>Запускаем наше рабочее место командой:</p>
      <Command text={`docker run -e CALL=${call} -ti dnwsilver/k8s-workstation:latest /bin/bash`} />
      <Helper>
        <Example theme="docker-run" />
      </Helper>
      <h2>Получение конфигураций</h2>
      Клонируем себе репозиторий в домашнюю директорию <mark>~/rebirthofhope</mark>.
      <Command text={REPO_CLONE} />
      <br />
      Переходим в директорию c git репозиторием.
      <Command text={REPO_GO} />
      <br />
      Переключаемся на нашу на ветку <b>savior/{call}</b>.
      <Command text={RepoSwitch(call)} />
      <br />
      <Example theme="git-clone" />
      <br />
      <p>Посмотреть структуру каталогов можно командой:</p>
      <Command text="eza --tree --icons" />
      <h2>Валидация конфигураций</h2>
      <p>
        Все нужные команды лежат в файле <mark>~/rebirthofhope/Makefile</mark>.
      </p>
      <br />
      <p>
        Начнем проверку с секретов, для этого написан скрипт <b>verify-secrets</b>:
      </p>
      <Command text={`make verify-secrets`} />
      <br />
      <p>
        Проверим корректность chart'ов, для этого написан скрипт <b>verify-charts</b>:
      </p>
      <Command text={`make verify-charts`} />
      <br />
      <p>
        Всё ли в порядке с переменными окружения? Для этого написан скрипт <b>verify-envs</b>:
      </p>
      <Command text={`make verify-envs`} />
      <br />
      <p>Если все хорошо, то в консоли не должно быть ничего красного.</p>
      <Example theme="helmfile-linting" />
      <br />
      <br />
      <p>
        Напоследок запустим все вместе. Скрипт <b>verify</b> нам понадобится дальше, довольно таки часто.
      </p>
      <p>
        Запускать его нужно перед каждым{" "}
        <Tutorial theme="git" chapter="commit">
          commit
        </Tutorial>
        'ом в репозиторий , для того чтобы убедиться что мы все заполнили корректно.
      </p>
      <Command text="make verify" />
    </Manual>
  );
};

export default DeepDiveManual;
