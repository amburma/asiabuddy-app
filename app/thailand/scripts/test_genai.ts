import { GoogleGenAI } from "@google/genai";
async function test() {
  try {
    const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });
    console.log("Methods:", Object.keys(genAI));
    // @ts-ignore
    console.log("Prototype Methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(genAI)));
  } catch (e) {
    console.error(e);
  }
}
test();
