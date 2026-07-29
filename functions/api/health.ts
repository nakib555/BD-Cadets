interface Env {
  GEMINI_API_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const hasKey = !!context.env.GEMINI_API_KEY;
  return new Response(
    JSON.stringify({ status: "ok", apiInitialized: hasKey }), 
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};
