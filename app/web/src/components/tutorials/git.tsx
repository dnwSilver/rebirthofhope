"use client";

import { getCookie } from "@/helpers/cookies";
import Command from "../command";
import { GIT_COMMIT, GitPush, GIT_STAGE, REPO_CLONE, REPO_GO, RepoSwitch } from "./commands";
import Example from "../example";

const GitTutorial = () => {
  const call = getCookie("call");

  return (
    <>
      <h1>Фиксация изменений в репозитории</h1>
      <h2>Подготовка репозитория</h2>
      <Command
        text={`${REPO_GO}
${REPO_CLONE}
${RepoSwitch(call)}`}
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
