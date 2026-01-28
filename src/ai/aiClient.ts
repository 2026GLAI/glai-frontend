import type { AIRequest, AIStreamHandler } from "./types";
import { realTransport } from "./realTransport";

/**
 * ГЛАВНЫЙ КЛИЕНТ GLAi
 * Этот файл является единственной точкой входа для отправки сообщений.
 * Мы используем realTransport для прямой связи с сервером на Railway.
 */

export async function sendToAI(
  request: AIRequest,
  onChunk: AIStreamHandler
): Promise<void> {
  // Прямой вызов транспорта без лишних переменных и проверок
  return realTransport(request, onChunk);
}