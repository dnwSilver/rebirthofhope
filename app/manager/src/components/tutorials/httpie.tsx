"use client";

import { FC } from "react";
import Command from "../command";
import { getCookie } from "@/helpers/cookies";

const HttpieTutorial: FC = () => {
  const call = getCookie("call");

  return (
    <>
      <h1>
        <img src="/httpie.svg" width="16" height="16" /> Httpie
      </h1>
      <h2 id="#GET">GET запросы</h2>
      <Command text={`https ${call}-uix.rebirthofhope.ru/api/metrics`} />
      {/* TODO ТУТ БУДЕТ GIF */}
      <h2 id="#POST">POST запросы</h2>
      <Command text={`https POST localhost:3000/api/verify call=${call}`} />
      {/* TODO ТУТ БУДЕТ GIF */}
    </>
  );
};

export default HttpieTutorial;
