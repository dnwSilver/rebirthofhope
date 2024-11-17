"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifyMaundyThursday = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "api.yaml.gotmpl");
  console.log(config);

  const isSuccess = !!config?.extraIngress;

  if (isSuccess) {
    finishStep(call, "maundy-thursday");
  }

  return isSuccess;
};
