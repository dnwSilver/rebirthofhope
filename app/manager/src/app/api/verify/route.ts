import { savior } from "@/db";
import { ISavior } from "@/db/domain";

export const POST = async (request: Request): Promise<Response> => {
  const body = await request.json();
  const call = body.call;
  const task = body.task;

  if (task === "linting") await savior.updateOne<ISavior>({ call }, { linting: true });

  if (task === "metrics") await savior.updateOne<ISavior>({ call }, { metrics: true });

  return new Response();
};
