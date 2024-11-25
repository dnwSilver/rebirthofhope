import { joinSavior } from "@/server-functions/join-savior";

export const GET = async (): Promise<Response> => {
  const savior = await joinSavior();

  if (savior === null) {
    return new Response(`The quota has expired.`, {
      status: 402,
    });
  }

  return new Response();
};
