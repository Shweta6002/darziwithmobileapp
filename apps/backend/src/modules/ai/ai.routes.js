const { Router } = require("express");
const { GoogleGenAI, Type } = require("@google/genai");
const { env } = require("../../config/env");
const aiRoutes = Router();
let aiClient = null;
function getGeminiClient() {
    if (!aiClient && env.geminiApiKey && env.geminiApiKey !== "MY_GEMINI_API_KEY") {
        aiClient = new GoogleGenAI({
            apiKey: env.geminiApiKey,
            httpOptions: { headers: { "User-Agent": "darzi-commerce-api" } },
        });
    }
    return aiClient;
}
aiRoutes.post("/consult", async (req, res, next) => {
    const { message, history = [], measurements } = req.body;
    try {
        const client = getGeminiClient();
        if (!client) {
            return res.json({
                reply: "Darzi AI Assistant: I can help choose premium officewear, fabrics, fit profiles, and tailoring details. Share your measurements or the work occasion you are dressing for.",
                isSimulated: true,
            });
        }
        const chatPrompt = `You are Darzi's lead designer and sizing advisor for premium women's corporate fashion. Client message: "${message}". Measurements: ${JSON.stringify(measurements || "None")}. Reply in under 200 words with polished, practical guidance.`;
        const chatHistory = history.map((h) => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.text }] }));
        const response = await client.models.generateContent({
            model: "gemini-3.5-flash",
            contents: [...chatHistory, { role: "user", parts: [{ text: chatPrompt }] }],
        });
        return res.json({ reply: response.text, isSimulated: false });
    }
    catch (error) {
        return next(error);
    }
});
aiRoutes.post("/analyze-measurements", async (req, res, next) => {
    const { measurements } = req.body;
    if (!measurements)
        return res.status(400).json({ error: "No measurements provided for AI analysis" });
    try {
        const client = getGeminiClient();
        if (!client) {
            return res.json({
                predictedSize: `DRZ-${Math.max(34, Math.min(42, Math.round((measurements.bust || 36) + 2)))}T`,
                fitConfidence: 96,
                bodyShapeAnalysis: "Balanced professional fit profile detected from the submitted measurements.",
                recommendedFitType: "Tailored Comfort",
                suggestedAdjustments: {
                    bust: "Contour side darts to prevent front gaping.",
                    waist: "Add sitting ease for desk comfort.",
                    hip: "Keep a clean straight drape.",
                    shoulder: "Align shoulder point to avoid sleeve drag.",
                },
                isSimulated: true,
            });
        }
        const response = await client.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `Analyze these Darzi womenswear measurements: ${JSON.stringify(measurements)}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        predictedSize: { type: Type.STRING },
                        fitConfidence: { type: Type.INTEGER },
                        bodyShapeAnalysis: { type: Type.STRING },
                        recommendedFitType: { type: Type.STRING },
                        suggestedAdjustments: {
                            type: Type.OBJECT,
                            properties: {
                                bust: { type: Type.STRING },
                                waist: { type: Type.STRING },
                                hip: { type: Type.STRING },
                                shoulder: { type: Type.STRING },
                            },
                            required: ["bust", "waist", "hip", "shoulder"],
                        },
                    },
                    required: ["predictedSize", "fitConfidence", "bodyShapeAnalysis", "recommendedFitType", "suggestedAdjustments"],
                },
            },
        });
        return res.json({ ...JSON.parse(response.text || "{}"), isSimulated: false });
    }
    catch (error) {
        return next(error);
    }
});
module.exports = {
  aiRoutes
};
