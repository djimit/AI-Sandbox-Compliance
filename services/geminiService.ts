
import { GoogleGenAI, Type } from "@google/genai";

// Removed global 'ai' instance to comply with "Create a new GoogleGenAI instance right before making an API call" rule.

export const geminiService = {
  async generateTechnicalDoc(systemInfo: any) {
    // Initializing 'ai' directly with process.env.API_KEY per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional summary for the Annex IV Technical Documentation of the following AI system based on the EU AI Act: ${JSON.stringify(systemInfo)}`,
      config: {
        systemInstruction: "You are a regulatory compliance expert specializing in the EU AI Act. Provide clear, concise, and professional technical documentation sections.",
      }
    });
    return response.text;
  },

  async analyzeDrift(logs: string) {
    // Initializing 'ai' directly with process.env.API_KEY per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these audit logs for potential model drift or performance degradation: ${logs}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            driftDetected: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            recommendedAction: { type: Type.STRING }
          },
          required: ["driftDetected", "confidence", "reasoning", "recommendedAction"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  }
};
