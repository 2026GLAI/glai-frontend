// src/memory/sessionMemory.ts

export type SessionData = {
  name?: string;
  style?: string;
  mode?: 'daily' | 'travel';
  updatedAt: number;
};

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 минут

const sessions = new Map<string, SessionData>();

export function getSession(sessionId: string): SessionData {
  const now = Date.now();

  const existing = sessions.get(sessionId);

  if (!existing) {
    const fresh: SessionData = { updatedAt: now };
    sessions.set(sessionId, fresh);
    return fresh;
  }

  // TTL check
  if (now - existing.updatedAt > SESSION_TTL_MS) {
    const fresh: SessionData = { updatedAt: now };
    sessions.set(sessionId, fresh);
    return fresh;
  }

  return existing;
}

export function updateSession(
  sessionId: string,
  patch: Partial<Omit<SessionData, 'updatedAt'>>
): void {
  const session = getSession(sessionId);

  sessions.set(sessionId, {
    ...session,
    ...patch,
    updatedAt: Date.now(),
  });
}

// 🧹 Автоочистка старых сессий
setInterval(() => {
  const now = Date.now();

  for (const [id, session] of sessions.entries()) {
    if (now - session.updatedAt > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
}, 60 * 1000); // проверка раз в минуту
