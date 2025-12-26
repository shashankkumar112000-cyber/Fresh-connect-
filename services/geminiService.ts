
import { GoogleGenAI, Type } from "@google/genai";
import { Hostel } from "../types";

export const fetchHostels = async (universityName: string): Promise<Hostel[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `List 5 realistic, high-quality hostels or PGs (paying guest accommodations) for students attending ${universityName}. Provide name, specific location, monthly price range, a contact number/email, and a brief description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              location: { type: Type.STRING },
              priceRange: { type: Type.STRING },
              contact: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["name", "location", "priceRange", "contact", "description"]
          }
        }
      }
    });

    const results = JSON.parse(response.text || "[]");
    return results;
  } catch (error) {
    console.error("Failed to fetch hostels:", error);
    return [];
  }
};
