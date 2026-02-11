import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePlan } from "../hooks/usePlan";
import { SideMenu } from "../components/home/SideMenu";
import { Sidebar } from "../components/home/Sidebar";
import { sendToAI } from "../ai/aiClient";
import type { Message } from "../ai/types";

// ─── Markdown рендерер (без зависимостей) ────────────────────────────────────
function renderMarkdown(text: string): string {
  return text
    // Жирный + курсив
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    // Жирный
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Курсив
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Инлайн код
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:monospace">$1</code>')
    // Заголовки H3
    .replace(/^### (.*$)/gm, '<h3 style="color:white;font-size:15px;font-weight:800;margin:20px 0 8px;letter-spacing:0.5px">$1</h3>')
    // Заголовки H2
    .replace(/^## (.*$)/gm, '<h2 style="color:white;font-size:17px;font-weight:900;margin:24px 0 10px;letter-spacing:0.5px">$1</h2>')
    // Заголовки H1
    .replace(/^# (.*$)/gm, '<h1 style="color:white;font-size:20px;font-weight:950;margin:24px 0 12px">$1</h1>')
    // Нумерованные списки
    .replace(/^\d+\. (.*$)/gm, '<div style="display:flex;gap:10px;margin:5px 0"><span style="opacity:0.4;min-width:18px">•</span><span>$1</span></div>')
    // Маркированные списки
    .replace(/^[-*] (.*$)/gm, '<div style="display:flex;gap:10px;margin:5px 0"><span style="opacity:0.4;min-width:18px">–</span><span>$1</span></div>')
    // Горизонтальная линия
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:16px 0">')
    // Переносы строк → <br>
    .replace(/\n\n/g, '<div style="height:12px"></div>')
    .replace(/\n/g, "<br>");
}

// ─── Определение языка ────────────────────────────────────────────────────────
const LANG_MAP: Record<string, Record<string, string>> = {
  el: {
    placeholder: "Ρωτήστε τη GLAi...",
    thinking: "GLAi σκέφτεται...",
    empty: "Πώς μπορώ να βοηθήσω σήμερα;",
    disclaimer: "Η GLAi μπορεί να κάνει λάθη. Επαληθεύστε σημαντικές πληροφορίες.",
  },
  en: {
    placeholder: "Ask GLAi anything...",
    thinking: "GLAi is thinking...",
    empty: "How can I help you today?",
    disclaimer: "GLAi can make mistakes. Verify important information.",
  },
  ru: {
    placeholder: "Спросите GLAi...",
    thinking: "GLAi думает...",
    empty: "Чем могу помочь сегодня?",
    disclaimer: "GLAi может ошибаться. Проверяйте важную информацию.",
  },
  de: {
    placeholder: "Fragen Sie GLAi...",
    thinking: "GLAi denkt nach...",
    empty: "Wie kann ich heute helfen?",
    disclaimer: "GLAi kann Fehler machen. Wichtige Infos überprüfen.",
  },
};

function detectLang(): string {
  const lang = navigator.language.split("-")[0];
  return LANG_MAP[lang] ? lang : "en";
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingDots({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: 6, height: 6, borderRadius: "50%", background: color }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { aiAccentColor, theme } = usePlan();
  const lang = detectLang();
  const t = LANG_MAP[lang];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Автоскролл
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Авторазмер textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }
  }, [input]);

  if (!theme) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      let hasStarted = false;

      await sendToAI(
        { messages: [...messages, userMessage], mode: id },
        (chunk) => {
          if (!hasStarted) {
            hasStarted = true;
            setIsTyping(false);
            setMessages(prev => [...prev, { role: "ai", content: "" }]);
          }
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === "ai") {
              return [...prev.slice(0, -1), { ...last, content: last.content + chunk }];
            }
            return prev;
          });
        }
      );
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: "ai",
        content: lang === "el"
          ? "Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά."
          : lang === "ru"
          ? "Произошла ошибка. Попробуйте снова."
          : lang === "de"
          ? "Ein Fehler ist aufgetreten. Bitte erneut versuchen."
          : "An error occurred. Please try again."
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <main style={{
      width: "100vw", height: "100vh", minHeight: "100dvh",
      background: theme.bgBase, display: "flex", position: "relative", overflow: "hidden"
    }}>
      <style>{`
        .chat-input { font-family: inherit; }
        .chat-input:focus { border-color: ${aiAccentColor} !important; outline: none; }
        .chat-input::placeholder { color: rgba(255,255,255,0.2); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .msg-ai a { color: ${aiAccentColor}; text-decoration: underline; }
        .msg-ai strong { color: white; font-weight: 700; }
        @media (max-width: 1024px) { .desktop-sidebar { display: none; } }
      `}</style>

      <div className="desktop-sidebar">
        <Sidebar onInfoClick={() => setIsMenuOpen(true)} accentColor={aiAccentColor} />
      </div>

      <AnimatePresence>
        {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, minWidth: 0 }}>

        {/* Header */}
        <header style={{
          padding: "15px 25px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)", zIndex: 10
        }}>
          <div onClick={() => navigate("/")} style={{
            cursor: "pointer", color: "white", opacity: 0.4,
            fontSize: "11px", fontWeight: 900, letterSpacing: "1px",
            transition: "opacity 0.2s"
          }}>
            ← BACK
          </div>
          <div style={{ color: "white", fontWeight: 950, letterSpacing: "4px", fontSize: "14px" }}>
            GL<span style={{ color: aiAccentColor }}>Ai</span>{" "}
            <span style={{ opacity: 0.5 }}>{id?.toUpperCase()}</span>
          </div>
          <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer", display: "flex", gap: "4px", padding: "8px" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white", opacity: 0.6 }} />
            ))}
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "30px 20px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Пустой экран */}
            {messages.length === 0 && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: "center", marginTop: "12vh" }}
              >
                <div style={{ fontSize: "28px", marginBottom: "14px" }}>🦉</div>
                <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px", fontWeight: 300, letterSpacing: "0.3px" }}>
                  {t.empty}
                </div>
              </motion.div>
            )}

            {/* Сообщения */}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                }}
              >
                {msg.role === "user" ? (
                  // Сообщение пользователя
                  <div style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "12px 18px",
                    borderRadius: "18px 18px 4px 18px",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}>
                    {msg.content}
                  </div>
                ) : (
                  // Сообщение AI — с markdown
                  <div
                    className="msg-ai"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "15px",
                      lineHeight: 1.75,
                      paddingLeft: "4px",
                    }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                  />
                )}
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ alignSelf: "flex-start", paddingLeft: "4px" }}
                >
                  <TypingDots color={aiAccentColor} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Input */}
        <div style={{
          padding: "16px 20px 20px",
          background: `linear-gradient(to top, ${theme.bgBase} 80%, transparent)`,
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{
            maxWidth: "760px", margin: "0 auto",
            display: "flex", alignItems: "flex-end", gap: "12px"
          }}>
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="chat-input"
              placeholder={t.placeholder}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "13px 18px",
                color: "white",
                transition: "border-color 0.2s",
                resize: "none",
                fontSize: "14px",
                lineHeight: "1.5",
                maxHeight: "160px",
                overflowY: "auto",
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                background: input.trim() && !isLoading ? aiAccentColor : "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                width: "44px", height: "44px",
                flexShrink: 0,
                color: input.trim() && !isLoading ? "black" : "rgba(255,255,255,0.3)",
                cursor: input.trim() && !isLoading ? "pointer" : "default",
                transition: "all 0.25s",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", fontWeight: "bold",
              }}
            >
              ↑
            </button>
          </div>

          <div style={{
            textAlign: "center", marginTop: "10px",
            fontSize: "9px", color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.8px"
          }}>
            {t.disclaimer}
          </div>
        </div>

      </div>
    </main>
  );
}