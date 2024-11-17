"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import Manual from "./manual";
import { verifyDeepDive } from "@/server-functions/verify/verify-deep-dive";
import Tutorial from "../tutorials/tutorial";
import { GO_REPO, RUN_DEPLOY } from "../tutorials/commands";

const DeepDiveManual = () => {
  const call = getCookie("call");

  return (
    <Manual
      stepName="deep-dive"
      title="🤿 Двадцать тысяч лье под водой"
      error="Похоже что ты еще не выполнил полную проверку линтинга в контейнере."
      verify={verifyDeepDive}
    >
      <h2>Понеслась</h2>
      <p>Ну что ж. Начнём.</p>
      <p>Заранее спасибо за оказанную помощь!</p>
      <br />
      <br />
      <p>Обозначим пару правил:</p>
      <ul>
        <li>Все действия должны быть из командной строки;</li>
        <li>Все действия должны быть сделаны в докер контейнере;</li>
        <li>Нельзя ломать и вредить, все крайне хрупкое;</li>
        <li>После того как все действия в шаге выполнены, нужно завершить его;</li>
        <li>
          Для редактирования текста есть <b>vim</b>, ну или менее хардкорный <b>nano</b>.
        </li>
      </ul>
      <h2>Подключение к рабочей среде</h2>
      <p>
        Для запуска у тебя должен быть установлен <b>docker</b>. Настоятельно рекомендуем поставить{" "}
        <a href="https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/Hack.zip">Nerd шрифт</a>, иначе
        некоторые иконки могут не отображаться.
      </p>
      <br />
      <p>Запускаем наше рабочее место командой:</p>
      <Command text={`docker run -e CALL=${call} -ti dnwsilver/k8s-workstation:latest /bin/bash`} />
      <h2>Получение конфигураций</h2>
      Клонируем себе репозитория в домашнюю директорию <b>~/rebirthofhope</b>.
      <Command text={`git clone git@github.com:dnwSilver/rebirthofhope.git`} />
      <br />
      Переходим в директорию c git репозиторием.
      <Command text={GO_REPO} />
      <br />
      Переключаемся на нашу на ветку <b>savior/{call}</b>.
      <Command text={`git switch savior/${call}`} />
      <h2>Валидация конфигураций</h2>
      <p>
        Все нужные команды лежать в фaйле <b>~/rebirthofhope/Makefile</b>.
      </p>
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
        Всё ли в порядке с переменными окружения, для этого написан скрипт <b>verify-environments</b>:
      </p>
      <Command text={`make verify-environments`} />
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
      <Command text={RUN_DEPLOY} />
    </Manual>
  );
};

export default DeepDiveManual;
