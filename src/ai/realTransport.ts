import type { AIRequest, AIStreamHandler } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "https://glai-core-production.up.railway.app/chat";

/**
 * ПРОФЕССИОНАЛЬНЫЙ ТРАНСПОРТНЫЙ УРОВЕНЬ
 * Чистит поток от технических префиксов OpenAI и передает только текст.
 */
export async function realTransport(
  request: AIRequest,
  onChunk: AIStreamHandler
): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // Увеличил до 60 сек для длинных ответов

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
      },
      signal: controller.signal,
      body: JSON.stringify({
        messages: request.messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error ${response.status}`);
    }

    if (!response.body) throw new Error("Response body is null");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      
      // ПАРСИНГ SSE: разбиваем полученные данные на строки
      const lines = chunk.split("\n");
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === "data: [DONE]") continue;

        if (trimmed.startsWith("data: ")) {
          try {
            const jsonString = trimmed.replace("data: ", "");
            const parsed = JSON.parse(jsonString);
            const content = parsed.choices?.[0]?.delta?.content || "";
            if (content) onChunk(content);
          } catch (e) {
            // Если это не JSON, а чистый текст (зависит от настроек бэкенда)
            onChunk(trimmed.replace("data: ", ""));
          }
        }
      }
    }

  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error("Request timed out");
    }
    console.error("Critical Transport Error:", error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}