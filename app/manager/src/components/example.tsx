import { FC } from "react";

const Example: FC<{
  theme:
    | "docker-run"
    | "git-clone"
    | "git-commit"
    | "helmfile-linting"
    | "helmfile-verify"
    | "helmfile-deploy"
    | "k9s-ingress"
    | "k9s-pods"
    | "k9s-logs"
    | "httpie-metrics"
    | "vim-edit"
    | "nano-edit";
}> = ({ theme }) => (
  <img
    src={`/example/${theme}.gif`}
    style={{ borderRadius: "0.5rem", width: "100%", maxWidth: " 100%", height: "auto" }}
  />
);

export default Example;
