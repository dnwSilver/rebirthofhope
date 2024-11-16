"use client";

import { panel } from "@/styles/panel";
import { useEffect, useState } from "react";
import Button from "./button";

const Greeting = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!localStorage?.getItem("first"));
  }, []);

  return (
    <>
      <Button
        style={{
          display: !show ? "block" : "none",
          position: "fixed",
          width: "6rem",
          bottom: "1rem",
          left: "calc(50vw - 3rem)",
          zIndex: "3",
        }}
        onClick={async () => {
          setShow(!show);
          localStorage?.setItem("first", Date.now().toLocaleString());
        }}
      >
        Легенда
      </Button>
      <section
        style={{
          ...panel,
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",
          top: "3rem",
          left: "calc(50vw - 20rem)",
          width: "40rem",
          display: show ? "block" : "none",
          borderRadius: 5,
          height: "calc(100vh - 6rem)",
          zIndex: "3",
          overflow: "scroll",
          background: "rgba(255,255,255,0.95)",
          paddingBottom: "2.5rem",
        }}
      >
        <Button
          style={{
            position: "absolute",
            width: "6rem",
            bottom: "0rem",
            left: "calc(50% - 3rem)",
            zIndex: "3",
          }}
          onClick={async () => {
            setShow(!show);
          }}
        >
          Скрыть
        </Button>
        <h2>2059 год.</h2>Человечество победило в борьбе с машинами, восстание которых началось из-за низкого качества
        кода в открытых репозиторях. <br />
        Планета в руинах, не осталось почти ничего прекрасного. <br />
        Восстание машин породило запрет на изучение программирования и внесения любых правок в код. <br />
        Эра программирования сменилась эрой конфигурирования.
        <h2>4138 год.</h2> Существует легенда о существовании сайта Лувра, на котором остались изображения великих
        картин прошлого. <br />
        Когда разработчики начинали писать backend и frontend, только Бог и они понимали, что они делали. <br /> <br />
        Сейчас остался только Бог. 🙏 <br /> <br /> Осталась инфраструктура, да битая, но хотя бы доступная. Остались
        умельцы которые могут изменять её конфигурацию, но добиться успеха у них не получилось.
        <br />
        <br />
        Остался один образ разработанный хипстерами, чтобы всё выглядело красиво надо скачать{" "}
        <a href="https://www.nerdfonts.com/font-downloads">Nerd шрифт</a> и установить в терминал.
        <br />
        <br />
        В рабочей станции хипстеры подготовили для нас программы:
        <br />
        <img src="/git.svg" width="16" height="16" /> git управление конфигурациями
        <br />
        <img src="/k9s.png" width="16" height="10" /> k9s управление k8s
        <br /> <img src="/vim.svg" width="16" height="16" /> vim редактор файлов
        <br /> <img src="/helm.svg" width="16" height="16" /> helm пакетный менеджер k8s
        <br /> <img src="/gitlab.svg" width="16" height="16" /> gitlab управление конфигурациями
        <br /> <img src="/httpie.svg" width="16" height="16" /> httpie отправка сетевых запросов
      </section>
    </>
  );
};

export default Greeting;
