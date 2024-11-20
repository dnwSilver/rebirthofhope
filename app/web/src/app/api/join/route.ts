import { COOKIE_IDENTIFIER_KEY, EXAMPLE_TIME_AVAILABLE } from "@/db/domain";
import { joinSavior } from "@/server-functions/join-savior";
import { cookies } from "next/headers";

export const GET = async (): Promise<Response> => {
  const savior = await joinSavior();

  if (savior === null) {
    return new Response(`The quota has expired.`, {
      status: 402,
    });
  }
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_IDENTIFIER_KEY, savior.call, {
    httpOnly: true,
    sameSite: "strict",
    secure:true,
    expires: Date.now() + EXAMPLE_TIME_AVAILABLE
  });
  cookieStore.set("name", savior.name);

  return new Response();
};
