"use server";

import { currentCall } from "@/helpers/current-call";
import { deployConfig } from "@/helpers/deploy-config";
import { finishStep } from "../finish-step";

export const verifySecretMaterial = async (): Promise<boolean> => {
  const call = await currentCall();

  const config = await deployConfig(call, "secrets.yaml");

  const isSuccess =
    config?.app?.db !==
    "ENC[AES256_GCM,data:JiOXhbrDxk8jV/dxArhuvImjVvrhRF3dxotaFls4,iv:20SGOfxSMhSznSz2lb7ZwGbCmIfYVYahMbHkz12woPY=,tag:8ZQdvZqWH+EDTkVdxTJi6Q==,type:str]";

  if (isSuccess) {
    finishStep(call, "secret-materials");
  }

  return isSuccess;
};
