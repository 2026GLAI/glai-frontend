import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePlan } from "../hooks/usePlan";
import { SideMenu } from "../components/home/SideMenu";
import { Sidebar } from "../components/home/Sidebar";
import { sendToAI } from "../ai/aiClient";
import type { Message } from "../ai/types";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { aiAccentColor, theme } = usePlan();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Автоматический сκροлл к последнему сообщению
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!theme) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Добавляем пустое сообщение AI, которое будем наполнять чанками
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    try {
      await sendToAI(
        { messages: [...messages, userMessage], mode: id },
        (chunk) => {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.role === "ai") {
              const updated = { ...last, content: last.content + chunk };
              return [...prev.slice(0, -1), updated];
            }
            return prev;
          });
        }
      );
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @media (max-width: 1024px) { .desktop-sidebar { display: none; } }
      `}</style>

      <div className="desktop-sidebar">
        <Sidebar onInfoClick={() => setIsMenuOpen(true)} accentColor={aiAccentColor} />
      </div>

      <AnimatePresence>
        {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" as const }}>
        {/* Header */}
        <header style={{ 
          padding: "15px 25px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)", zIndex: 10
        }}>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer", color: "white", opacity: 0.5, fontSize: "11px", fontWeight: 900, letterSpacing: "1px" }}>
            ← BACK
          </div>
          <div style={{ color: "white", fontWeight: 950, letterSpacing: "4px", fontSize: "14px" }}>
            GL<span style={{ color: aiAccentColor }}>Ai</span> {id?.toUpperCase()}
          </div>
          <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer", display: "flex", gap: "4px" }}>
             <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }} />
             <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }} />
             <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }} />
          </div>
        </header>

        {/* Chat Messages Area */}
        <div ref={scrollRef} className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "30px 20px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "25px" }}>
            {messages.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", marginTop: "10vh" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>🦉</div>
                <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", fontWeight: 300 }}>
                  {id === "hellas" ? "Πώς μπορώ να βοηθήσω την Ελλάδα σήμερα;" : "How can I help you today?"}
                </div>
              </motion.div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                display: "flex",
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-end" : "flex-start"
              }}>
                <div style={{ 
                  background: msg.role === "user" ? "rgba(255,255,255,0.05)" : "transparent",
                  padding: msg.role === "user" ? "12px 18px" : "0",
                  borderRadius: "18px",
                  color: "white",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap"
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length-1]?.content === "" && (
              <div style={{ color: aiAccentColor, fontSize: "12px", opacity: 0.5 }}>GLAi thinking...</div>
            )}
          </div>
        </div>

        {/* Input Control Area */}
        <div style={{ padding: "20px", background: `linear-gradient(to top, ${theme.bgBase}, transparent)` }}>
          <div style={{ 
            maxWidth: "800px", margin: "0 auto", position: "relative" as const,
            display: "flex", alignItems: "center", gap: "12px"
          }}>
            <textarea 
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="chat-input"
              placeholder="Ask GLAi anything..."
              style={{
                flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", padding: "14px 20px", color: "white", transition: "all 0.3s",
                resize: "none", fontSize: "14px", fontFamily: "inherit"
              }}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                background: input.trim() ? aiAccentColor : "rgba(255,255,255,0.05)", 
                border: "none", borderRadius: "50%",
                width: "42px", height: "42px", color: "black", 
                cursor: input.trim() ? "pointer" : "default",
                transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>↑</span>
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "12px", fontSize: "9px", color: "rgba(255,255,255,0.15)", letterSpacing: "1px" }}>
            GLAi CAN MAKE MISTAKES. VERIFY IMPORTANT INFO.
          </div>
        </div>
      </div>
    </main>
  );
}