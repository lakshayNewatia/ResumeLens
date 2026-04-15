const { extractTextFromFile } = require("../utils/extractText");
const axios = require("axios");

const MODEL = "llama-3.3-70b-versatile";

const systemPrompt = `
You are an expert ATS resume analyzer.

Return ONLY valid JSON. No markdown. No backticks.

Schema:
{
  "overall_score": number,
  "sub_scores": {
    "formatting_structure": number,
    "keyword_optimisation": number,
    "clarity_readability": number,
    "impact_achievements": number
  },
  "critical_issues": [{"title": "", "description": ""}],
  "suggested_improvements": [{"title": "", "description": ""}],
  "whats_working": [{"title": "", "description": ""}],
  "missing_keywords": ["string"],
  "rewrite_suggestions": [{"section": "", "before": "", "after": ""}],
  "summary": ""
}
`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cleanText(text) {
  if (!text) return "";
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

// 🔥 GROQ CALL
async function callGroq(payload) {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  for (let i = 0; i < 2; i++) {
    try {
      return await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log("❌ STATUS:", err?.response?.status);
      console.log("❌ ERROR:", JSON.stringify(err?.response?.data, null, 2));
      console.log("❌ MESSAGE:", err.message);

      const status = err?.response?.status;

      if (status === 429 || status === 503) {
        await sleep(2000 * (i + 1));
        continue;
      }

      throw err;
    }
  }

  throw new Error("Groq request failed after retries");
}

// 🔥 safe JSON parse
function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    const cleaned = cleanText(text);
    return JSON.parse(cleaned);
  }
}

const analyseResumeHandler = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const resumeText = await extractTextFromFile(file);
    if (!resumeText)
      return res.status(400).json({ error: "Could not extract text" });

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const payload = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `RESUME:\n${resumeText}`,
        },
      ],
      temperature: 0.2,
    };

    const response = await callGroq(payload);

    let text = response.data?.choices?.[0]?.message?.content;

    console.log("🧠 RAW RESPONSE:\n", text);

    const parsed = safeParse(text);

    return res.json(parsed);
  } catch (err) {
    console.error("❌ AI FAILED:", err?.response?.data || err.message);

    return res.status(500).json({
      error:
        err?.response?.data?.error?.message ||
        "Failed to analyse resume. Try again later.",
    });
  }
};

module.exports = analyseResumeHandler;