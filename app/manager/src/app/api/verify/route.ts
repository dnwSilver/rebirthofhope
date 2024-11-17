import { savior } from "@/db";
import { ISavior } from "@/db/domain";

export const POST = async (request: Request): Promise<Response> => {
  const body = await request.json();
  const call = body.call;

  await savior.updateOne<ISavior>({ call }, { linting: true });

  return new Response();
};
