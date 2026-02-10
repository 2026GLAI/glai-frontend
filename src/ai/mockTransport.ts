import type { AIRequest, AIStreamHandler } from "./types";

/**
 * ТЕСТОВЫЙ ТРАНСПОРТ (MOCK)
 * Используется для отладки интерфейса без реальных запросов к Railway.
 */
export async function mockTransport(
  request: AIRequest,
  onChunk: AIStreamHandler
): Promise<void> {
  const mode = request.mode || "core";
  const mockText = `[MOCK RESPONSE - MODE: ${mode.toUpperCase()}] Я получил ваш запрос и готов помочь. Это тестовый поток данных для проверки стабильности интерфейса.`;
  
  const words = mockText.split(" ");
  
  for (const word of words) {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 100));
    onChunk(word + " ");
  }
}