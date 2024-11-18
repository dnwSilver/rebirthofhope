import { FC } from "react";
import Command from "./command";
import Helper from "./helper";
import { GO_REPO, RUN_LINTING, GIT_STAGE, GIT_COMMIT, GIT_PUSH, RUN_DEPLOY } from "./tutorials/commands";
import Tutorial from "./tutorials/tutorial";

const DeployHint: FC = () => (
  <>
    <p>
      <Tutorial theme={"helmfile"} chapter="linting">
        Проверим конфигурацию
      </Tutorial>{" "}
      и{" "}
      <Tutorial theme={"helmfile"} chapter="deploy">
        обновим нашу инфраструктуру
      </Tutorial>
      .
    </p>
    <Helper>
      <Command
        text={`${GO_REPO}
${RUN_LINTING}
${RUN_DEPLOY}`}
      />
    </Helper>
  </>
);

export default DeployHint;
