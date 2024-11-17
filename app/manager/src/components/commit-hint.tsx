import { FC } from "react";
import Command from "./command";
import Helper from "./helper";
import { GO_REPO, GIT_STAGE, GIT_COMMIT, GIT_PUSH } from "./tutorials/commands";
import Tutorial from "./tutorials/tutorial";

const CommitHint = ({ action, result }: { action: string; result: string }) => {
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
          text={`${GO_REPO}
${GIT_STAGE}
${GIT_COMMIT}
${GIT_PUSH}`}
        />
      </Helper>
    </>
  );
};

export default CommitHint;
