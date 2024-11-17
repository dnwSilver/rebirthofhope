"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifySortWheatFromChaff = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "api.yaml.gotmpl");

  const isSuccess = config?.app?.log?.level === "info";
  if (isSuccess) {
    finishStep(call, "sort-wheat-from-chaff");
  }

  return isSuccess;
};
