import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Импорт SDK
import { usePlan } from "../hooks/usePlan";
import type { Plan } from "../hooks/usePlan";
import { Sidebar } from "../components/home/Sidebar";
import { SideMenu } from "../components/home/SideMenu";
import { Avatar } from "../components/ui/Avatar";
import OwlIcon from "../components/home/OwlIcon";

export default function ChatPage() {
  const navigate = useNavigate();
  const { theme, aiAccentColor, currentPlan, savePlan } = usePlan();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false); 
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Приветствую. Я GLAi — мудрость Афин в цифровой форме. Чем я могу быть полезен сегодня?" }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!theme) return null;

  // РЕАЛЬНАЯ ЛОГИКА ОТВЕТА GEMINI
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Инициализация API ключа из вашего .env
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Формирование истории чата для контекста
      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.role === "ai" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: "ai", content: text }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "Критическая ошибка связи с ядром. Проверьте настройки API в .env или лимиты плана." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{
      width: "100vw", height: "100vh", minHeight: "100dvh",
      background: "#0D121F", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-start",
      position: "relative", overflow: "hidden", fontFamily: "'Montserrat', sans-serif"
    }}>
      <style>{`
        body { margin: 0; padding: 0; background: #0D121F; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        @keyframes avatarPulse {
          0%, 100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 2px ${aiAccentColor}66); }
          50% { transform: scale(1.02); opacity: 0.8; filter: drop-shadow(0 0 10px ${aiAccentColor}aa); }
        }
        .live-avatar { animation: avatarPulse 3s infinite ease-in-out; cursor: pointer; }

        @keyframes typing {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .typing-dot { animation: typing 1s infinite; margin-right: 4px; }

        .back-nav-container { display: flex; align-items: center; cursor: pointer; transition: opacity 0.2s; }
        .back-nav-container:hover { opacity: 0.6; }
        .premium-arrow-icon { color: white; display: flex; align-items: center; opacity: 0.6; margin-right: 12px; }
      `}</style>

      <div style={{ zIndex: 100 }}>
        <Sidebar onMenuClick={() => setIsMenuOpen(true)} />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50000 }}>
            <SideMenu onClose={() => setIsMenuOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      <header translate="no" style={{
        width: "100%", padding: "32px 40px 32px 85px", 
        display: "flex", justifyContent: "space-between", 
        alignItems: "center", zIndex: 10, boxSizing: "border-box"
      }}>
        <div className="back-nav-container" onClick={() => navigate("/")}>
          <div className="premium-arrow-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", height: "32px" }}>
            <div style={{ display: "flex", alignItems: "baseline", fontSize: "22px", letterSpacing: "0.15em", lineHeight: "1", userSelect: "none" }}>
              <span style={{ fontWeight: 800, color: "white", textTransform: "uppercase" }}>GL</span>
              <span style={{ color: aiAccentColor, fontWeight: 400, marginLeft: "6px" }}>Ai</span>
            </div>
          </div>
        </div>
        <div className="live-avatar">
          <Avatar onClick={() => setIsSubModalOpen(true)} />
        </div>
      </header>

      <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div ref={scrollRef} className="chat-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 0" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", gap: "24px", marginBottom: "44px", alignItems: "flex-start" }}>
                <div className="live-avatar" style={{ 
                  width: "38px", height: "38px", borderRadius: "10px", 
                  background: msg.role === "ai" ? "#161B2E" : aiAccentColor,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${aiAccentColor}44`
                }}>
                  {msg.role === "ai" ? <OwlIcon size="20px" color={aiAccentColor} /> : <span style={{ color: "black", fontWeight: 900, fontSize: "12px" }}>U</span>}
                </div>
                <div style={{ color: "#E3E3E3", fontSize: "16px", lineHeight: "1.7", fontWeight: 400 }}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: "flex", gap: "24px", marginBottom: "44px", alignItems: "flex-start" }}>
                <div className="live-avatar" style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#161B2E", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${aiAccentColor}44` }}>
                  <OwlIcon size="20px" color={aiAccentColor} />
                </div>
                <div style={{ display: "flex", paddingTop: "10px" }}>
                  <span className="typing-dot" style={{ color: aiAccentColor }}>●</span>
                  <span className="typing-dot" style={{ color: aiAccentColor, animationDelay: "0.2s" }}>●</span>
                  <span className="typing-dot" style={{ color: aiAccentColor, animationDelay: "0.4s" }}>●</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "20px 0 60px 0" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ background: "#161B2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", display: "flex", alignItems: "flex-end", padding: "12px 16px", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? "GLAi обрабатывает запрос..." : "Спроси сову Афины..."}
                style={{ flex: 1, minHeight: "24px", maxHeight: "200px", background: "transparent", border: "none", padding: "8px 10px", color: "white", fontFamily: "inherit", fontSize: "16px", resize: "none", lineHeight: "1.5", outline: "none", opacity: isLoading ? 0.5 : 1 }}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button onClick={handleSend} disabled={!input.trim() || isLoading} style={{ background: input.trim() && !isLoading ? "white" : "rgba(255,255,255,0.1)", border: "none", borderRadius: "12px", width: "36px", height: "36px", cursor: "pointer", color: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSubModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSubModalOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 60000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(20px)" }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()} style={{ background: "#0c121d", width: "360px", borderRadius: "40px", padding: "50px 40px", border: `1px solid rgba(255,255,255,0.05)` }}>
              <h3 style={{ color: "white", textAlign: "center", marginBottom: "30px", fontSize: "11px", fontWeight: 900, letterSpacing: "4px", opacity: 0.5 }}>SELECT SYSTEM PLAN</h3>
              {(["free", "pro"] as Plan[]).map(p => (
                <div key={p} onClick={() => { savePlan(p); setIsSubModalOpen(false); }} style={{ padding: "20px", marginBottom: "15px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", color: "white", textAlign: "center", cursor: "pointer", background: currentPlan === p ? (p === 'pro' ? '#FFD70015' : '#007BFF15') : "rgba(255,255,255,0.02)", borderColor: currentPlan === p ? (p === 'pro' ? '#FFD700' : '#007BFF') : "rgba(255, 255, 255, 0.1)" }}>
                  <span style={{ fontSize: "13px", fontWeight: 950, letterSpacing: "2px" }}>{p === 'free' ? 'LIMIT (FREE)' : 'UNLIMIT (PRO)'}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}