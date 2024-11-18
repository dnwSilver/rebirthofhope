import { FC } from "react";

const Example: FC<{
  theme:
    | "docker-run"
    | "git-clone"
    | "helmfile-linting"
    | "helmfile-verify"
    | "helmfile-deploy"
    | "k9s-ingress"
    | "k9s-pods"
    | "httpie-metrics"
    | "vim-edit";
}> = ({ theme }) => (
  <img
    src={`/example/${theme}.gif`}
    style={{ borderRadius: "0.5rem", width: "100%", maxWidth: " 100%", height: "auto" }}
  />
);

export default Example;
