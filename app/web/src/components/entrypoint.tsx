"use client";

import { getCookie } from "@/helpers/cookies";
import { panel } from "@/styles/panel";
import Command from "./command";
import Example from "./example";
import Link from "next/link";
import { COOKIE_IDENTIFIER_KEY } from "@/db/domain";

const EntryPoint = () => {
  const call = getCookie(COOKIE_IDENTIFIER_KEY);

  return (
    <section style={panel}>
      Мы рады, что ты с нами <b>{decodeURIComponent(getCookie("name") || "")}</b>!
      <br />
      Твой позывной <b>{call}</b>.
      <br />
      <br />
      Доступ можно получить только через специальный контейнер, который нам подготовили наши предки:
      <br />
      <br />
      <Command text={`docker run -e CALL=${call} -ti dnwsilver/k8s-workstation:latest /bin/bash`} />
      <br />
      <p>
        Можешь начать свой путь с <Link href="/manual/deep-dive">первого задания</Link>.
      </p>
      <br />
      <Example theme="docker-run" />
      <br />
    </section>
  );
};

export default EntryPoint;
