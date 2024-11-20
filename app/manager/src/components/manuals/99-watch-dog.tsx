"use client";

import { FC, useState } from "react";
import Manual from "./manual";
import useCall from "@/hooks/use-call";
import Button from "../button";
import { joinSavior } from "@/server-functions/join-savior";
import Command from "../command";
import { REPO_CLONE, REPO_GO, RepoSwitch } from "../tutorials/commands";
import BlackHole from "../black-hole";

const WatchdogManual: FC = () => {
  const { call, updateCall } = useCall(3000);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinClick = async () => {
    setIsLoading(true);
    const isSuccess = await joinSavior();

    if (!isSuccess) {
      return;
    }

    updateCall();
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div
      style={{
        opacity: 1,
        paddingBottom: "3rem",
        height: "100vh",
        overflowY: "scroll",
        background: "gray",
        position: "fixed",
        width: "100vw",
        zIndex: 100,
        top: 0,
        left: 0,
        backgroundImage: "url(/bgwd.webp)",
        backgroundSize: "cover",
        padding: "2rem",
        color: "white",
      }}
    >
      {(isLoading || call === undefined) && <BlackHole />}
      {!isLoading && call === null && (
        <>
          <Button
            disabled={false}
            style={{
              position: "fixed",
              top: "calc(50vh - 1rem)",
              left: "calc(50vw - 5rem)",
            }}
            onClick={handleJoinClick}
          >
            Войти в систему
          </Button>
        </>
      )}
      {!isLoading && call && (
        <Manual
          showButton={false}
          stepName={"watchdog"}
          title={"Гайд на случай поломок в системе наблюдения"}
          error={"Недостаточно защиты!"}
        >
          <h2>Информация по системе</h2>
          <p>
            Гайд создан на случай поломки системы видеонаблюдения:
            <br />
            <a
              target="_blank"
              style={{ color: "wheat", fontSize: "2rem" }}
              href={`https://${call}-1984.rebirthofhope.ru`}
            >
              https://{call}-1984.rebirthofhope.ru
            </a>
          </p>
          <h2>Поиск поломок</h2>
          <p>
            Системе видеонаблюдения развернута в закрытом кластере <b>kubernates</b>. Доступ предоставляется посредством
            терминала, запущеного в докер контейнере:
          </p>
          <Command text={`docker run -e CALL=${call} -ti dnwsilver/k8s-workstation:latest /bin/bash`} />
          <br />
          <p>Текущая конфигурация кластера расположена в репозитории. Инструкция по скачиванию репозитория:</p>
          <Command
            text={`${REPO_CLONE}
${REPO_GO}
${RepoSwitch(call)}`}
          />
          <br />
          <p>
            <strong>ВАЖНО!</strong> Конфигурация находится в файле{" "}
            <mark>~/rebirthofhope/environments/production-wd/wd.yaml.gotmpl</mark>.
          </p>
          <p>
            Возможные причины поломки:
            <ul>
              <li>Нехватка ресурсов</li>
              <li>Неправильные переменные окружения</li>
              <li>Неправильные секреты</li>
              <li>Сломанный образ</li>
            </ul>
          </p>
          <h2>Обновление системы </h2>
          <p>Обновление инфраструктуры после правок осуществляется командой:</p>{" "}
          <Command text={`helmfile --environment production-wd apply`} />
          <br />
          <br />
        </Manual>
      )}
    </div>
  );
};

export default WatchdogManual;
