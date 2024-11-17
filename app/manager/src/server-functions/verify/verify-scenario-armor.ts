"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifyScenarioArmor = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "api.yaml.gotmpl");

  const isSuccess = config?.app?.cors?.origins !== `https://${call}-uix.rebirthofhope.ru`;

  if (isSuccess) {
    finishStep(call, "scenario-armor");
  }

  return isSuccess;
};
