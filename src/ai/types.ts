// role в сообщении
export type AIRole = "system" | "user" | "assistant";

// одно сообщение диалога
export interface AIMessage {
  role: AIRole;
  content: string;
}

// запрос к AI
export interface AIRequest {
  messages: AIMessage[];
  locale?: string;        // "el", "en", etc
  temperature?: number;  // optional
}

// streaming handler
export type AIStreamHandler = (chunk: string) => void;

// transport interface (НЕ экспортируем наружу)
export interface AITransport {
  (
    request: AIRequest,
    onChunk: AIStreamHandler
  ): Promise<void>;
}
