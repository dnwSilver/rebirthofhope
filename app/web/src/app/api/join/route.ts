import { joinSavior } from "@/server-functions/join-savior";

export const GET = async (): Promise<Response> => {
  await joinSavior();

  return new Response();
};
