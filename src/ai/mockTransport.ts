import { AIRequest, AIStreamHandler } from "./types";

const MOCK_RESPONSE =
  "Γεια σου! Είμαι ο GLAi. Μπορώ να σε βοηθήσω με την Ελλάδα, ταξίδια και καθημερινή ζωή.";

export async function mockTransport(
  request: AIRequest,
  onChunk: AIStreamHandler
) {
  // имитация streaming
  for (let i = 0; i < MOCK_RESPONSE.length; i++) {
    await new Promise((r) => setTimeout(r, 20));
    onChunk(MOCK_RESPONSE[i]);
  }
}
