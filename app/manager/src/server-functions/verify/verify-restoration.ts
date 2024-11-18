"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifyRestoration = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "uix.yaml.gotmpl");

  const isSuccess = !!config?.volumeMounts?.some((volume) => volume.mountPath === "/.output/public/arts");

  if (isSuccess) {
    finishStep(call, "restoration");
  }
q
  return isSuccess;
};
