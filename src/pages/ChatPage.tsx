import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logoGold from "../assets/logo-gold.png";
import logoDark from "../assets/logo.png";
import { useVisualViewport } from "../hooks/useVisualViewport";

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { height, offsetTop } = useVisualViewport();
  const isDarkMode = new Date().getHours() < 7 || new Date().getHours() >= 19;

  const theme = {
    bgBase: isDarkMode ? "#0D1B2A" : "#AD7858",
    bgInner: isDarkMode ? "#1B263B" : "#AD7858",
    textAssistant: isDarkMode ? "#E6D3B1" : "#1F2A30",
    textUser: isDarkMode ? "#DCE3E8" : "#AD7858",
    accent: isDarkMode ? "#AD7858" : "#AD7858",
    border: isDarkMode ? "rgba(230, 211, 177, 0.2)" : "rgba(31, 42, 48, 0.15)"
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }, { role: "assistant", content: "OK" }]);
    setInput("");
  };

  return (
    <main style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: `${height}px`,
      transform: `translateY(${offsetTop}px)`, overflow: "hidden",
      background: `radial-gradient(circle at 50% 10%, ${theme.bgInner} 0%, ${theme.bgBase} 100%)`
    }}>
      {/* ТЕКСТУРА МАТЕРИАЛА */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.03, pointerEvents: "none", zIndex: 1
      }} />

      {/* HEADER (100% Прозрачный) */}
      <header style={{ 
        position: "absolute", top: 0, left: 0, right: 0, height: 60, padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20,
        backgroundColor: "transparent", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${theme.border}`
      }}>
        <img src={isDarkMode ? logoGold : logoDark} alt="Logo" style={{ width: 30, cursor: "pointer" }} onClick={() => navigate("/")} />
        <div style={{ width: 32, height: 32, borderRadius: "100%", border: `1px solid ${theme.accent}`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.accent, fontSize: 12 }}>U</div>
      </header>

      {/* MESSAGES */}
      <section style={{ 
        height: "100%", overflowY: "auto", display: "flex", flexDirection: "column",
        padding: "75px 20px 100px 20px", position: "relative", zIndex: 10
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            color: m.role === "user" ? theme.textUser : theme.textAssistant, 
            marginBottom: 16, padding: "12px 16px", borderRadius: "16px",
            maxWidth: "85%", alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            background: m.role === "user" ? "rgba(230, 211, 177, 0.08)" : "transparent",
            border: m.role === "user" ? `1px solid ${theme.border}` : "none",
            fontSize: "17px", lineHeight: "1.4"
          }}>{m.content}</div>
        ))}
        <div ref={bottomRef} />
      </section>

      {/* FOOTER (100% Прозрачный) */}
      <footer style={{ 
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom))", zIndex: 20,
        backgroundColor: "transparent", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderTop: `1px solid ${theme.border}`
      }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type..." style={{ flex: 1, height: 44, borderRadius: 22, padding: "0 18px", fontSize: "16px", border: "none", outline: "none", backgroundColor: isDarkMode ? "#DCE3E8" : "#F5F2EB", color: "#1F2A30" }} />
          <button onClick={sendMessage} style={{ width: 44, height: 44, borderRadius: "50%", background: theme.accent, color: "#FFF", border: "none" }}>↑</button>
        </div>
      </footer>
    </main>
  );
}