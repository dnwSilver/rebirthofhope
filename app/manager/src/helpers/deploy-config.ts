import YAML from "yaml";

type DeployConfig = {
  replicaCount?: number;
  resources?: {
    limits?: {
      memory?: string;
    };
  };
};

const origin = "https://raw.githubusercontent.com";
const repo = "/dnwSilver/rebirthofhope";
const branch = (call: string | undefined) => `/refs/heads/savior/${call}`;
const file = (app: string) => `/environments/production-app/${app}.yaml.gotmpl`;

export const deployConfig = async (call: string | undefined, app: "api" | "uix"): Promise<DeployConfig> => {
  //   const endpoint =
  // "https://raw.githubusercontent.com/dnwSilver/rebirthofhope/refs/heads/main/deploy/environments/production-app/api.yaml.gotmpl";

  const endpoint = `${origin}${repo}${branch(call)}${file(app)}`;

  const response = await fetch(endpoint);

  const body = await response.text();

  const config = YAML.parse(body);
  //   console.log(config);
  return config;
};
