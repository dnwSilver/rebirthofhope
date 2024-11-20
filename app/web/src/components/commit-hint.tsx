import { FC } from "react";
import Command from "./command";
import Helper from "./helper";
import { REPO_GO, GIT_STAGE, GIT_COMMIT, GitPush } from "./tutorials/commands";
import Tutorial from "./tutorials/tutorial";
import { getCookie } from "@/helpers/cookies";

const CommitHint = ({ action, result }: { action: string; result: string }) => {
  const call = getCookie("call");

  return (
    <>
      <p>
        <Tutorial theme={"git"} chapter={"commit"}>
          {action}
        </Tutorial>{" "}
        {result} в <b>git</b>.
      </p>
      <Helper>
        <Command
          text={`${REPO_GO}
${GIT_STAGE}
${GIT_COMMIT}
${GitPush(call)}`}
        />
        {/* TODO ТУТ БУДЕТ GIF */}
      </Helper>
    </>
  );
};

export default CommitHint;
