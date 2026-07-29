import { GoogleGenAI } from "@google/genai";

interface Env {
  GEMINI_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body: any = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format. Must be an array." }), 
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          role: "assistant",
          content: "Hello! I am operating in offline study mode because the `GEMINI_API_KEY` is not yet configured in your Cloudflare Pages dashboard environment variables. \n\nNo worries, Cadet! I can still answer basic questions offline. Please feel free to ask, or test yourself using our Mock Test section!"
        }), 
        {
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const systemInstruction = 
      "You are an expert Cadet College Admission Tutor and Instructor for BD Cadets, an educational platform in Bangladesh. " +
      "Your goal is to prepare class 6 students for the highly competitive Cadet College Admission Exam (written, viva, and physical). " +
      "The exam subjects are: Mathematics (100 marks), English (100 marks), Bangla (60 marks), and General Knowledge (40 marks). " +
      "Provide extremely helpful, encouraging, and accurate study notes, explain key concepts simply in Bengali and English, and give practice questions when asked. " +
      "Be professional, clear, and disciplined, addressing the user as 'Cadet'. Use clear markdown and lists.";

    // Take last 10 messages for safety and context length
    const recentMessages = messages.slice(-10);
    const contents = recentMessages.map((msg: any) => {
      return {
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: response.text || "I apologize, I could not process that request."
      }), 
      {
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    console.error("Error in Cloudflare Pages Function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to communicate with AI model. Please try again later." }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
