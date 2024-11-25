import { savior } from "@/db";
import { ISavior } from "@/db/domain";
import mongoose from "mongoose";

type Parameters = {
  params: { step: string };
};

export const POST = async (request: Request, { params }: Parameters): Promise<Response> => {
  const call = await request.text();
  const { step } = await params;


  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const currentSavior = await savior.findOne({ call });

  if(currentSavior[step] === null){
  await savior.updateOne<ISavior>(
    { call },
    {
      [step]: Date.now(),
    }
  );}

  return new Response();
};
