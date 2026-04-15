// utils/extractText.js

const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

async function extractTextFromFile(file) {
  const buffer = file.buffer;
  const mimeType = file.mimetype;

  console.log(`📄 Extracting text from: ${file.originalname} (${mimeType})`);

  // 📄 PDF
  if (mimeType === "application/pdf") {
    try {
      const data = await pdfParse(buffer);

      if (!data.text || data.text.trim().length === 0) {
        throw new Error("Empty text");
      }

      console.log(`✅ PDF parsed. Length: ${data.text.length}`);
      return data.text.trim();

    } catch (err) {
      console.error("❌ PDF Parse Error:", err.message);

      throw new Error(
        "Failed to parse PDF. It may be scanned (image-based)."
      );
    }
  }

  // 📄 DOCX
  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer });

      if (!result.value || result.value.trim().length === 0) {
        throw new Error("Empty text");
      }

      console.log(`✅ DOCX parsed. Length: ${result.value.length}`);
      return result.value.trim();

    } catch (err) {
      console.error("❌ DOCX Parse Error:", err.message);
      throw new Error("Failed to parse DOCX file.");
    }
  }

  throw new Error("Unsupported file type. Only PDF and DOCX allowed.");
}

module.exports = { extractTextFromFile };