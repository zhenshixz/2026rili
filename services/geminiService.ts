import { GoogleGenAI, Type } from "@google/genai";
import { AlmanacData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const fetchAlmanacData = async (date: Date): Promise<AlmanacData> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please select an API Key.");
  }

  const dateString = date.toLocaleDateString('zh-CN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const prompt = `
    Generate a traditional Chinese Almanac (Huangli) insight for ${dateString}.
    The response must be in JSON format and **ALL TEXT MUST BE IN SIMPLIFIED CHINESE**.
    Include:
    1. 'auspicious': An array of 3-4 suitable activities (Yi) in Chinese (e.g., "出行", "嫁娶").
    2. 'inauspicious': An array of 3-4 unsuitable activities (Ji) in Chinese (e.g., "动土", "安葬").
    3. 'description': A short, poetic description of the day's energy, season, or solar term effect in Chinese (max 2 sentences).
    4. 'dailyQuote': A wise philosophical quote related to time, nature, or life (Confucian/Taoist/Zen style) in Chinese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            auspicious: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            inauspicious: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            description: { type: Type.STRING },
            dailyQuote: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AlmanacData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};