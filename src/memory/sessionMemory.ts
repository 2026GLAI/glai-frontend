// src/memory/sessionMemory.ts

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type SessionData = {
  messages: Message[];
  name?: string;
  style?: string;
  mode?: 'daily' | 'travel';
  updatedAt: number;
};

const SESSION_KEY_PREFIX = 'glai_session_';
const SESSION_TTL_MS = 30 * 60 * 1000;

/**
 * Синхронизированное получение сессии (LocalStorage + TTL)
 */
export function getSession(sessionId: string): SessionData {
  const now = Date.now();
  const raw = localStorage.getItem(`${SESSION_KEY_PREFIX}${sessionId}`);
  
  if (raw) {
    try {
      const session: SessionData = JSON.parse(raw);
      if (now - session.updatedAt < SESSION_TTL_MS) {
        return session;
      }
    } catch (e) {
      console.error("Failed to parse session", e);
    }
  }

  const fresh: SessionData = {
    messages: [],
    updatedAt: now,
  };
  saveSession(sessionId, fresh);
  return fresh;
}

export function updateSession(
  sessionId: string,
  patch: Partial<Omit<SessionData, 'updatedAt'>>
): void {
  const current = getSession(sessionId);
  const updated: SessionData = {
    ...current,
    ...patch,
    updatedAt: Date.now(),
  };
  saveSession(sessionId, updated);
}

function saveSession(sessionId: string, data: SessionData): void {
  localStorage.setItem(`${SESSION_KEY_PREFIX}${sessionId}`, JSON.stringify(data));
}

/**
 * Очистка устаревших данных (вызывать при инициализации App)
 */
export function purgeOldSessions(): void {
  const now = Date.now();
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(SESSION_KEY_PREFIX)) {
      try {
        const session: SessionData = JSON.parse(localStorage.getItem(key) || '');
        if (now - session.updatedAt > SESSION_TTL_MS) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  });
}