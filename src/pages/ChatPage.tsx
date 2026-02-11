import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePlan } from "../hooks/usePlan";
import { SideMenu } from "../components/home/SideMenu";
import { Sidebar } from "../components/home/Sidebar";
import { sendToAI } from "../ai/aiClient";
import type { Message } from "../ai/types";

// ─── Markdown рендерер ───────────────────────────────────────────────────────
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:monospace">$1</code>')
    .replace(/^### (.*$)/gm, '<h3 style="color:white;font-size:15px;font-weight:800;margin:20px 0 8px;letter-spacing:0.5px">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 style="color:white;font-size:17px;font-weight:900;margin:24px 0 10px;letter-spacing:0.5px">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 style="color:white;font-size:20px;font-weight:950;margin:24px 0 12px">$1</h1>')
    .replace(/^\d+\. (.*$)/gm, '<div style="display:flex;gap:10px;margin:5px 0"><span style="opacity:0.4;min-width:18px">•</span><span>$1</span></div>')
    .replace(/^[-*] (.*$)/gm, '<div style="display:flex;gap:10px;margin:5px 0"><span style="opacity:0.4;min-width:18px">–</span><span>$1</span></div>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:166px 0">')
    .replace(/\n\n/g, '<div style="height:12px"></div>')
    .replace(/\n/g, "<br>");
}

const LANG_MAP: Record<string, Record<string, string>> = {
  el: { placeholder: "Ρωτήστε τη GLAi...", thinking: "GLAi σκέφτεται...", empty: "Πώς μπορώ να βοηθήσω σήμερα;", disclaimer: "Η GLAi μπορεί να κάνει λάθη." },
  en: { placeholder: "Ask GLAi anything...", thinking: "GLAi is thinking...", empty: "How can I help you today?", disclaimer: "GLAi can make mistakes." },
  ru: { placeholder: "Спросите GLAi...", thinking: "GLAi думает...", empty: "Чем могу помочь сегодня?", disclaimer: "GLAi может ошибаться." },
};

function detectLang(): string {
  const lang = navigator.language.split("-")[0];
  return LANG_MAP[lang] ? lang : "en";
}

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
      setMessages(prev => [...prev, { role: "ai", content: "Error. Please try again." }]);
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
        .chat-input:focus { border-color: ${aiAccentColor} !important; outline: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .msg-ai a { color: ${aiAccentColor}; text-decoration: underline; }
        @media (max-width: 1024px) { .desktop-sidebar { display: none; } }
      `}</style>

      {/* FIXED SIDEBAR CALL */}
      <div className="desktop-sidebar">
        <Sidebar onMenuClick={() => setIsMenuOpen(true)} />
      </div>

      <AnimatePresence>
        {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{
          padding: "15px 25px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)", zIndex: 10
        }}>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer", color: "white", opacity: 0.4, fontSize: "11px", fontWeight: 900, letterSpacing: "1px" }}>
            ← BACK
          </div>
          <div style={{ color: "white", fontWeight: 950, letterSpacing: "4px", fontSize: "14px" }}>
            GL<span style={{ color: aiAccentColor }}>Ai</span>{" "}
            <span style={{ opacity: 0.5 }}>{id?.toUpperCase()}</span>
          </div>
          <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer", display: "flex", gap: "4px", padding: "8px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white", opacity: 0.6 }} />)}
          </div>
        </header>

        <div ref={scrollRef} className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "30px 20px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            {messages.length === 0 && !isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginTop: "12vh" }}>
                <div style={{ fontSize: "28px", marginBottom: "14px" }}>🦉</div>
                <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px", fontWeight: 300 }}>{t.empty}</div>
              </motion.div>
            )}

            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
                {msg.role === "user" ? (
                  <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "18px 18px 4px 18px", color: "rgba(255,255,255,0.9)", fontSize: "15px" }}>
                    {msg.content}
                  </div>
                ) : (
                  <div className="msg-ai" style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                )}
              </motion.div>
            ))}

            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ alignSelf: "flex-start" }}>
                  <TypingDots color={aiAccentColor} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div style={{ padding: "16px 20px 20px", background: `linear-gradient(to top, ${theme.bgBase} 80%, transparent)`, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", alignItems: "flex-end", gap: "12px" }}>
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              className="chat-input"
              placeholder={t.placeholder}
              style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "13px 18px", color: "white", resize: "none", fontSize: "14px" }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{ background: input.trim() && !isLoading ? aiAccentColor : "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: "44px", height: "44px", color: input.trim() && !isLoading ? "black" : "rgba(255,255,255,0.3)", cursor: input.trim() && !isLoading ? "pointer" : "default", transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              ↑
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "9px", color: "rgba(255,255,255,0.12)" }}>{t.disclaimer}</div>
        </div>
      </div>
    </main>
  );
}