let approach = 0;

export const GET = async (): Promise<Response> => {
  approach++;
  return new Response(approach.toString());
};
