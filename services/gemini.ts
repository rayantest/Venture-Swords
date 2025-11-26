import { GoogleGenAI } from "@google/genai";
import { ToolDefinition, AnalysisResult } from "../types";

// Helper to safely get the API key
const getApiKey = () => process.env.API_KEY || '';

export const analyzeStartup = async (
  tool: ToolDefinition,
  inputs: Record<string, any>
): Promise<AnalysisResult> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a Senior Investment Analyst at "VentureSwords", a specialized government venture arm in Saudi Arabia targeting dual-use technology and R&D (TRL 1-7).
    
    Task: Evaluate a startup using the "${tool.name}" framework, with a STRICT FOCUS on the Saudi Arabian market (KSA) and the MENA ecosystem.
    
    Inputs provided by the user:
    ${JSON.stringify(inputs, null, 2)}
    
    Instructions:
    1. CALCULATIONS: Perform all necessary math for the "${tool.name}" method based on the inputs.
    2. MARKET RESEARCH (MANDATORY - USE GOOGLE SEARCH):
       - Search for REAL-TIME benchmarks specifically in SAUDI ARABIA and MENA for the ${inputs.industry || 'relevant'} sector.
       - Identify relevant Saudi Vision 2030 initiatives (e.g., NEOM, localization mandates, PIF focus areas).
       - Check for local regulatory impacts (MISA, CMA, local content requirements).
       - If KSA-specific financial data is private/unavailable, use global benchmarks but explicitly ADJUST them for the Saudi market risk/opportunity profile.
    3. ANALYSIS:
       - Compare the startup's metrics against Saudi/MENA standards.
       - Assess alignment with National priorities (Vision 2030).
       - Highlight "Dual-Use" (Civilian + Defense/Security) potential if the technology allows.
       - Be critical: If the valuation is unrealistic for the Saudi market, say so.
    
    Output Format:
    Return a valid JSON object ONLY, with the following structure (do not use Markdown code blocks for the JSON):
    {
      "analysisText": "A detailed paragraph (approx 150 words) summarizing the findings. MUST mention Saudi market context, Vision 2030 relevance, and specific calculation details.",
      "keyMetrics": [
        { "label": "Metric Name", "value": "Metric Value", "status": "good" | "neutral" | "bad" }
      ],
      "recommendations": [
        "Strategic recommendation 1 (Saudi Context)",
        "Strategic recommendation 2 (Operational/Financial)",
        "Strategic recommendation 3 (Risk Mitigation)"
      ],
      "chartData": [
        { "name": "Label 1", "value": 100, "benchmark": 80 },
        { "name": "Label 2", "value": 200, "benchmark": 150 }
      ]
    }

    Note on chartData:
    - For '${tool.chartType}':
      - If 'pie': Use simple objects { "name": "Category", "value": number }.
      - If 'bar': Use { "name": "Metric", "value": number, "benchmark": number (optional - representing KSA Avg) }.
      - If 'radar': Use { "subject": "Dimension", "A": number (startup score 1-100), "B": number (KSA Benchmark 1-100), "fullMark": 100 }.
      - If 'composed': Use { "name": "Year/Category", "value": number, "benchmark": number (optional) }.
    
    Ensure the JSON is parseable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "{}";
    
    // Attempt to clean and parse JSON
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```/, '').replace(/```$/, '');
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", text);
      throw new Error("Analysis failed to generate valid structured data. Please try again.");
    }
    
    // Extract grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({ uri: chunk.web.uri, title: chunk.web.title }));

    // Remove duplicates from sources
    const uniqueSources = Array.from(new Map(sources.map((s:any) => [s.uri, s])).values());

    return {
      analysisText: parsedData.analysisText || "No analysis provided.",
      keyMetrics: parsedData.keyMetrics || [],
      recommendations: parsedData.recommendations || [],
      chartData: parsedData.chartData || [],
      sources: uniqueSources as any[],
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};