import mongoose from "mongoose";
import { savior } from "@/db";

type Parameters = {
  params: { call: string };
};

export const GET = async (request: Request, { params }: Parameters): Promise<Response> => {
  const { call } = await params;

  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  }

  const currentSavior = await savior.findOne({ call });

  return new Response(JSON.stringify(currentSavior));
};
