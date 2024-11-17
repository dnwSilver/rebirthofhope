import YAML from "yaml";

type DeployConfig = {
  replicaCount?: number;
  resources?: {
    limits?: {
      memory?: string;
    };
  };
  app: {
    db: string;
    log: { level: string };
  };
};

const origin = "https://raw.githubusercontent.com";
const repo = "/dnwSilver/rebirthofhope";
const branch = (call: string | undefined) => `/refs/heads/savior/${call}`;
const file = (config: string) => `/environments/production-app/${config}`;

export const deployConfig = async (
  call: string | undefined,
  config: "secrets.yaml" | "api.yaml.gotmpl" | "uix.yaml.gotmpl"
): Promise<DeployConfig> => {
  const endpoint =
    "https://raw.githubusercontent.com/dnwSilver/rebirthofhope/refs/heads/main/deploy/environments/production-app/secrets.yaml";

  //   const endpoint = `${origin}${repo}${branch(call)}${file(config)}`;

  const response = await fetch(endpoint);

  const body = await response.text();

  return YAML.parse(body);
};
