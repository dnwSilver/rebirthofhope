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
        <h2>Подключение к рабочей среде</h2>
        <p>
          Для запуска у тебя должен быть установлен <b>docker</b>. Настоятельно рекомендуем поставить{" "}
          <a href="https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/Hack.zip">Nerd шрифт</a>, иначе
          некоторые иконки могут не отображаться.
        </p>
        <br/>
        <p>Запускаем наше рабочее место командой:</p>
        <Command text={`docker run -e call=${call} -ti dnwsilver/k8s-workstation:latest /bin/bash`} /><br/>
        <h2>Получение конфигураций</h2>
        Клонируем себе репозитория в домашнюю директорию.
        <Command text={`git clone git@github.com:dnwSilver/rebirthofhope.git`} />
        <br/>
        Переходим на нашу ветку.
        <Command text={`git switch savior/${call}`} />
      </section>
    </>
  );
};

export default DeepDiveManual;
