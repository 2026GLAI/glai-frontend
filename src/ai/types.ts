export interface Message {
  role: "system" | "user" | "ai";
  content: string;
}

export interface AIRequest {
  messages: Message[];
  // Добавляем опциональное поле mode
  mode?: string;
}

export type AIStreamHandler = (chunk: string) => void;

export interface AIResponseChunk {
  content: string;
  done: boolean;
}