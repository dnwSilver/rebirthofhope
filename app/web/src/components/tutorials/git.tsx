"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import { GIT_COMMIT, GitPush, GIT_STAGE, REPO_CLONE, REPO_GO } from "./commands";
import Example from "../example";
import { COOKIE_IDENTIFIER_KEY } from "@/db/domain";

const GitTutorial = () => {
  const call = getCookie(COOKIE_IDENTIFIER_KEY);

  return (
    <>
      <h1>Фиксация изменений в репозитории</h1>
      <h2>Подготовка репозитория</h2>
      <Command
        text={`${REPO_GO}
${REPO_CLONE(call)}`}
      />
      <br />
      <Example theme="git-clone" />
      <h2>Фиксация изменений</h2>
      <Command
        text={`${GIT_STAGE}
${GIT_COMMIT}
${GitPush(call)}`}
      />
      <br />
      <Example theme="git-commit" />
    </>
  );
};

export default GitTutorial;
