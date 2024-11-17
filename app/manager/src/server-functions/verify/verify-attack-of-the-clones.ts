"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifyAttackOfTheClones = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "api.yaml.gotmpl");

  const isSuccess = config?.replicaCount === 2;

  if (isSuccess) {
    finishStep(call, "attack-of-the-clones");
  }

  return isSuccess;
};
