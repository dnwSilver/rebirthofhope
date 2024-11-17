"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifyNeedMoreGold = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "uix");

  const isSuccess = config?.resources?.limits?.memory === "8Mi";

  if (isSuccess) {
    finishStep(call, "need-more-gold");
  }

  return isSuccess;
};
