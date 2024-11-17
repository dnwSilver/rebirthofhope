"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifyReunion = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "uix.yaml.gotmpl");

  const isSuccess = config?.app?.api === `https://${call}-api.rebirthofhope.ru`;

  if (isSuccess) {
    finishStep(call, "reunion");
  }

  return isSuccess;
};
