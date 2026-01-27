import type { AIRequest, AIStreamHandler } from "./types";

const API_URL = "https://glai-core-production.up.railway.app/chat";

export async function realTransport(
  request: AIRequest,
  onChunk: AIStreamHandler
): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: request.messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`);
  }

  const data = await response.json();

  // backend уже возвращает финальный текст
  if (data?.content) {
    onChunk(data.content);
    return;
  }

  // fallback (на случай будущего стриминга)
  if (data?.message) {
    onChunk(data.message);
    return;
  }

  throw new Error("Invalid backend response");
}
