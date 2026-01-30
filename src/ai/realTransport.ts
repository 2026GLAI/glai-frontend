import type { AIRequest, AIStreamHandler } from "./types";

const API_URL = "https://glai-core-production.up.railway.app/chat";

/**
 * ТРАНСПОРТНЫЙ УРОВЕНЬ
 * Работает в режиме Request-Response. Ожидает полного ответа от Railway.
 */
export async function realTransport(
  request: AIRequest,
  onChunk: AIStreamHandler
): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: request.messages,
      }),
    });

    // 1. Проверка на системные ошибки (404, 500, и т.д.)
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Server error (${response.status}): ${errorText}`);
    }

    // 2. Ожидание полного JSON от бэкенда
    const data = await response.json();

    // 3. Извлечение контента (поддержка разных форматов ответа)
    const content = data?.content || data?.message;

    if (content) {
      onChunk(content);
      return;
    }

    throw new Error("Invalid backend response: No content found");
  } catch (error) {
    // Пробрасываем ошибку выше для обработки в UI (ChatPage)
    console.error("AI Transport Error:", error);
    throw error;
  }
}