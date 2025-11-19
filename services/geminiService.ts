import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMood = async (text) => {
  // Define the schema for structured JSON output
  const schema = {
    type: Type.OBJECT,
    properties: {
      sentimentScore: {
        type: Type.NUMBER,
        description: "A score from 1 (extremely negative) to 10 (extremely positive) reflecting the mood.",
      },
      emotionalTone: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 3-5 adjectives describing the emotional tone (e.g., Anxious, Hopeful, Frustrated).",
      },
      empatheticResponse: {
        type: Type.STRING,
        description: "A warm, empathetic, and psychological supportive paragraph (approx 50 words) responding to the user.",
      },
      actionableAdvice: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 specific, small, actionable steps the user can take right now.",
      },
      colorHex: {
        type: Type.STRING,
        description: "A soft pastel hex color code that represents the mood (e.g. #FFD1DC, #AEC6CF). Avoid neon/harsh colors.",
      },
      shortSummary: {
        type: Type.STRING,
        description: "A 3-5 word summary of the entry title.",
      }
    },
    required: ["sentimentScore", "emotionalTone", "empatheticResponse", "actionableAdvice", "colorHex", "shortSummary"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this journal entry. Be a kind, non-judgmental therapist. Entry: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are MindfulAI, a compassionate mental health companion. Your goal is to validate feelings, offer perspective, and suggest gentle coping mechanisms. Always be supportive.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    } else {
      throw new Error("No response text generated");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Graceful fallback
    return {
      sentimentScore: 5,
      emotionalTone: ["Neutral", "Quiet"],
      empatheticResponse: "I'm having a little trouble connecting to my analysis engine right now, but please know your feelings are valid. Writing them down is a great first step.",
      actionableAdvice: ["Take a deep breath", "Hydrate", "Try again in a moment"],
      colorHex: "#E5E7EB",
      shortSummary: "Analysis Unavailable"
    };
  }
};
