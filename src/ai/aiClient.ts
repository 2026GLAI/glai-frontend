import type { AIRequest, AIStreamHandler } from "./types";
import { realTransport } from "./realTransport";

const MODE: "real" = "real"; // ФИНАЛ. mock больше не существует.

export async function sendToAI(
  request: AIRequest,
  onChunk: AIStreamHandler
): Promise<void> {
  return realTransport(request, onChunk);
}
