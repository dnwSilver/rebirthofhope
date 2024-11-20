"use client";

import { FC } from "react";
import Command from "../command";
import { getCookie } from "@/helpers/cookies";
import { COOKIE_IDENTIFIER_KEY } from "@/db/domain";

const HttpieTutorial: FC = () => {
  const call = getCookie(COOKIE_IDENTIFIER_KEY);

  return (
    <>
      <h1>
        <img src="/httpie.svg" width="16" height="16" /> Httpie
      </h1>
      <h2 id="#GET">GET запросы</h2>
      <Command text={`https ${call}-uix.rebirthofhope.ru/api/metrics`} />
      <h2 id="#POST">POST запросы</h2>
      <Command text={`https POST localhost:3000/api/verify call=${call}`} />
    </>
  );
};

export default HttpieTutorial;
