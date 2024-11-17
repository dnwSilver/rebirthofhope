"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";

const DeepDiveManual = () => {
  const call = getCookie("call");

  return (
    <>
      <h1>🤿 Двадцать тысяч лье под водой</h1>
      <section>
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
        <Command text={`docker run -e call=${call} -ti dnwsilver/k8s-workstation:latest /bin/bash`} />
        <br />
        <h2>Получение конфигураций</h2>
        Клонируем себе репозитория в домашнюю директорию <b>~/rebirthofhope</b>.
        <Command text={`git clone git@github.com:dnwSilver/rebirthofhope.git`} />
        <br />
        Переходим в директорию c git репозиторием.
        <Command text={`cd rebirthofhope`} />
        <br />
        Переключаемся на нашу на ветку <b>savior/${call}</b>.
        <Command text={`git switch savior/${call}`} />
        <br />
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
          Напоследок запустим все вместе. Скрипт <b>verify</b> нам понадобится дальше, довольно таки часто. Запускать её
          нужно перед каждым <b>commit</b>'ом в репозиторий, для того чтобы убедиться что мы все заполнили корректно.
        </p>
        <Command text={`make verify`} />
        <br />
        <h2>Публикация приложений</h2>
        <p>
          Наша конфигурация отправляется в кластер всего одной командой. Туда улетает сразу <b>API</b> и <b>UIX</b>.
        </p>
        <Command text={`helmfile --environment production-app apply`} />
        <br />
        <br />
      </section>
    </>
  );
};

export default DeepDiveManual;