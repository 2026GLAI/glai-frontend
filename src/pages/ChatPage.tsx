import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVisualViewport } from "../hooks/useVisualViewport";
import { motion, AnimatePresence } from "framer-motion";
import { sendToAI } from "../ai/aiClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// --- Types ---
type Plan = "free" | "plus" | "pro";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
  isError?: boolean;
}

const OwlIcon = ({ size, color = "white", opacity = 1 }: { size: number | string, color?: string, opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 43349.2 43349.2" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    <path fill={color} d="M26970.1 19014.4c104.8,86.4 49.7,36.4 156,159.4 285.1,329.7 354.7,604.9 1001.9,871.9 500.2,206.4 1166.1,165 1651.1,-66.1 1660.4,-791.1 852.3,-2776.1 818.5,-3030.9l924.8 -387.7c307.7,865.6 635.8,1562.5 274.2,2684.6 -966.1,2998.4 -5195,2319.1 -5517.8,258.7l691.3 -489.9zm-5307.2 10577.6c170.3,-226 1765.2,-3119.2 1824.4,-3336.8 105.7,-387.7 -1185.8,-2585.5 -1609,-3109.2l-215.4 -210.9c-239.7,201.4 -1940.7,2834.7 -1858,3245.5l1752.9 3299.3c12.9,16.1 40.6,43.7 51.5,56.5 11.1,13 34.3,38.5 53.6,55.6zm-7721.3 -921.6c188.4,142 2767.6,1090.4 4310.1,2134.3 691.4,467.9 1235.6,888.2 1782.3,1459.2 291.4,304.1 532.2,522.2 832.9,840.4 143.3,151.6 223.1,203.7 393.5,387.9 233.1,251.9 124.8,227.9 402.5,413.3 279.4,-223.2 560.2,-601 812.3,-884.6 2692.1,-3028.2 6451.2,-3992.9 6938.2,-4350.5 -737.2,-284.4 -1793.7,-321.2 -2723.2,-701.8 -791.3,-324 -1680.5,-945.5 -2282.8,-1158.4l-2689.5 4196c-7.9,-16.6 -35.9,36.1 -89.6,74.7l-2694.8 -4269.6c-580.1,161.7 -1504,859.9 -2286.5,1166.9 -1361.9,534.4 -2265.7,514.5 -2705.4,692.2zm16812.2 7412.6c1618.8,-1271.8 2753.9,-1990.2 4025.9,-4025.2 951,-1521.4 1858.9,-3864.9 1898.4,-6119.6 -325.9,125.8 -651.1,487.1 -988.4,738.4 -2456.3,1830.5 -4976.2,1694.9 -7727.9,4362 -2052.6,1989.4 -4082.7,6683.1 -4336.6,9515.9 2188.7,-419.2 4967.7,-2897.8 6129.8,-4969.7l926.2 -1827.1c246.4,-510.6 267.3,-431.5 416.8,-468.5 318.7,1077.4 -303.1,1998.8 -344.2,2793.8zm-11064.8 4450.1c-49.6,-1161.1 -1123,-4291.7 -1568.8,-5275.5 -1568.3,-3460.5 -3307.1,-5403.7 -6950.7,-6807.5 -3622.8,-1395.8 -3970.1,-2237.5 -4488.1,-2442.2 61.7,3942.3 2817.6,8482.6 5934.2,10098.2 -102.8,-808.8 -682.7,-1732.7 -387.9,-2794.3 228.3,27.7 211.7,-23.8 450.3,511 95.1,213 187.1,392 289.5,593.3 224.6,441.8 396.4,834.8 635.5,1233.1 1311.6,2184.7 3699.4,4297.5 6086,4883.9zm-2632.7 -20904.7c-665.4,1322.8 -2458.1,2347.9 -4255.9,1196.2 -1770.5,-1134.4 -1708.6,-3554.2 -865.5,-4297.8l814.9 358.1c-54.6,360.6 -870.8,2185 749.4,3044.2 1404,744.6 2247.6,-180.4 2856.4,-941.4 332.1,171.6 490.9,232.4 700.7,640.7zm-9566.9 -10004.8c-1297.3,-204.9 -2275,-1415.3 -2619.6,-1600.6 105.3,1057.1 483,1759.5 993.2,2441 339.5,453.5 457.3,540.4 897.2,873 338,255.5 785.5,501 1022.2,709.8 -315.5,877.4 -1946.8,2433 -2439.8,5713.6 -1514.5,10079.6 9906.1,11987.7 12519.4,8066.6 -2250.5,327 -3098.7,723.8 -5519.2,70 -5093.7,-1375.9 -6549.6,-6576.1 -4210.9,-10952 114.2,-213.6 158.1,-306.9 282.8,-501.3 32,-50.1 119.6,-180.1 166.2,-229.9 188.4,-201.1 -7.4,-53.4 240.5,-198 479.2,838.2 973.5,1174.3 1685.1,1730.1l275.1 246.1c-2113.3,4465.2 2094.7,7730.6 5464.1,6082.1 436.2,-213.5 862.3,-668 1152.9,-735.3 237.3,1135 -122.5,1840.4 -308.2,2827.3 308.4,-128.8 139.9,-25.5 407.6,-255.7 968.2,-833 1329.3,-2310.5 1002.1,-3573 -632.3,-2440.6 -4049,-3697.8 -6128.5,-4684.7 -1079.1,-512.2 -2939,-1216.8 -3384.2,-2019.5 46,-327.6 174,-581.1 390.2,-789.9 1181.5,336.7 5844.2,3200.1 6819.4,3898.2 1218.1,872 1804.8,1423.1 2864.2,2441.7 844.6,812.2 2102.3,2375 2601.7,2821.5 234.8,-130.3 2026.1,-2278.5 2541.9,-2782.3 1759.2,-1718.1 3878,-3325.7 6160.8,-4552.5 579.6,-311.4 3079,-1735.3 3582.7,-1825l414.8 767.4c-1647.4,2038.3 -8704.2,3246.2 -9541,6821.5 -394.1,1683.7 375.8,3312.3 1428.8,3778.7 -269.8,-1047.4 -562.2,-1566.9 -345.8,-2894.6 504.5,168.2 834.7,1014.6 2636.4,1173.4 2143.2,188.8 4086.6,-1240.1 4518.6,-3349.7 315.1,-1538.9 -143.8,-2074.7 -541.7,-3149.6 147.7,-217.7 786.2,-643.9 1051,-869 413.4,-351.3 627.4,-670.7 949.3,-1083.9 906.7,496.3 3231.1,5910.2 356.1,9365.9 -1577.3,1895.8 -3905.8,2887.6 -6627.7,2834.9 -1034.1,-20.1 -2047,-398.5 -2813.7,-402.2 3047.9,3305.1 8749.8,1989.4 11221.6,-1436.9 2353.3,-3262.1 1704.9,-7704.6 -341.5,-11070.7 -254,-417.8 -616.5,-854.7 -766.5,-1269.5 271.7,-327.7 2733.7,-1393.1 2918.5,-4025.7 -417.1,297 -695.8,612.5 -1204.2,949.1 -425.1,281.4 -895.2,502.5 -1423.1,678.5 177.9,-408.1 1309.3,-1165.8 2229.8,-2814.5 662.6,-1186.8 1025,-2425.9 1106.6,-4053.4 -21.5,15.4 -52,15.2 -61.2,50.4l-799.7 1001.3c-2448.9,2729.9 -4487.2,3410.9 -7612.4,5654.2 -790,567.1 -1359.3,1050.4 -2061.6,1672.2 -1468.9,1300.7 -2390.9,2350.6 -3565.7,4005.7 -224.7,316.7 -1323.1,2140.9 -1503.1,2264.3 557.9,-2415.8 2506.3,-5245.7 4224.4,-6914.1 286.2,-277.8 658.3,-573.8 1018.1,-851.2 304,-234.5 878.8,-621.7 1102.4,-860.1 -1243.7,-836.8 -6362.5,-1231.3 -8252.9,-1226.4 -2252.3,5.7 -4299.5,204.2 -6450.7,671 -341.4,74 -646,144.7 -954.5,224.3 -138.2,35.7 -363.7,89.4 -467.7,124.3 -218.5,73 -49.7,-0.2 -207.8,83.4 -137.5,72.8 -110.6,63.4 -173.9,123.4 770.7,705.3 1898.4,1278.4 2986.4,2613.4 291.2,357.3 525.2,618.8 837.4,1030.9 773.4,1020.7 2215.5,3465.7 2523.9,4972 -1130.3,-1174.2 -1650.5,-3446.8 -6011.7,-7085.4 -2041.9,-1703.6 -5376,-3426.3 -7264.3,-5023 -926.4,-783.2 -2207.1,-2410.5 -2304.8,-2494.2 -26.3,2180 862.3,3928.8 2082.3,5469.5 391.9,495 946,924.3 1231.9,1323.1z" />
  </svg>
);

export default function ChatPage() {
  const navigate = useNavigate();
  const { mode } = useParams<{ mode: string }>();
  const { height, offsetTop } = useVisualViewport();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [currentPlan, setCurrentPlan] = useState<Plan>(() => (localStorage.getItem("glai_plan") as Plan) || "free");
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const theme = useMemo(() => ({
    bgBase: "#0D1B2A", bgInner: "#1B263B", white: "#FFFFFF", aiText: "#C9D1D9",
    freeColor: "#8E9AAF", plusColor: "#00B4FF", proColor: "#D4AF37",
    glassBorder: "rgba(255, 255, 255, 0.12)", errColor: "#FF4D4D"
  }), []);

  const aiAccentColor = useMemo(() => {
    if (currentPlan === "pro") return theme.proColor;
    if (currentPlan === "plus") return theme.plusColor;
    return theme.freeColor;
  }, [currentPlan, theme]);

  const storageKey = useMemo(() => `glai_history_${mode || 'global'}`, [mode]);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [{ id: "init", role: "ai", text: `GLAi ${mode?.toUpperCase()} активен.`, timestamp: Date.now() }];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
    localStorage.setItem("glai_plan", currentPlan);
  }, [messages, storageKey, currentPlan]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{name: string, url: string}[]>([]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, selectedFiles]);

  const handleSend = useCallback(async () => {
    const trimmedInput = input.trim();
    if ((!trimmedInput && selectedFiles.length === 0) || isTyping) return;
    const userMessage: Message = { id: `user-${Date.now()}`, role: "user", text: trimmedInput || "Файл отправлен", timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput(""); setSelectedFiles([]); setIsTyping(true);
    try {
      const history = [...messages, userMessage].map(m => ({ role: m.role === "ai" ? "assistant" as const : "user" as const, content: m.text }));
      await sendToAI({ messages: history }, (res) => {
        setMessages(prev => [...prev, { id: `ai-${Date.now()}`, role: "ai", text: res, timestamp: Date.now() }]);
      });
    } catch {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, role: "ai", text: "Ошибка связи.", isError: true, timestamp: Date.now() }]);
    } finally { setIsTyping(false); }
  }, [input, isTyping, messages, selectedFiles]);

  const clearChat = () => { if (window.confirm("Очистить чат?")) { setMessages([{ id: "init", role: "ai", text: "Чат очищен.", timestamp: Date.now() }]); setShowActionMenu(false); } };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFiles(p => [...p, { name: file.name, url: URL.createObjectURL(file) }]); setShowActionMenu(false); }
  };

  return (
    <main style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: `${height}px`,
      transform: `translateY(${offsetTop}px)`, overflow: "hidden",
      background: `radial-gradient(circle at 50% 20%, ${theme.bgInner} 0%, ${theme.bgBase} 100%)`,
      display: "flex", flexDirection: "column"
    }}>
      <style>{`
        @keyframes avatarPulse {
          0% { box-shadow: 0 0 0 0px ${aiAccentColor}66; }
          70% { box-shadow: 0 0 0 15px ${aiAccentColor}00; }
          100% { box-shadow: 0 0 0 0px ${aiAccentColor}00; }
        }
        .avatar-pulse { animation: avatarPulse 2s infinite; }
        .file-preview { position: relative; width: 60px; height: 60px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); }
        .file-preview img { width: 100%; height: 100%; object-fit: cover; }
        .file-remove { position: absolute; top: -5px; right: -5px; background: #FF4D4D; color: white; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; cursor: pointer; border: 2px solid #0D1B2A; }
      `}</style>
      
      <header style={{
        position: "absolute", top: 0, left: 0, width: "100%",
        padding: "calc(25px + env(safe-area-inset-top)) 20px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        background: `linear-gradient(to bottom, ${theme.bgBase} 40%, rgba(13, 27, 42, 0.5) 100%)`,
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
      }}>
        {/* Левая часть: Стрелка + Лого */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </div>
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <OwlIcon size="26px" color={aiAccentColor} />
            <div style={{ fontSize: 18, fontWeight: 900, color: "white", letterSpacing: "4px" }}>GL<span style={{ color: aiAccentColor, fontWeight: 400 }}>Ai</span></div>
          </div>
        </div>
        
        {/* Правая часть: Статус + Аватар */}
        <div onClick={() => setIsSubModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "white", opacity: 0.4, letterSpacing: "2px" }}>{mode?.toUpperCase()}</div>
            <div style={{ fontSize: 9, fontWeight: 900, color: aiAccentColor, letterSpacing: "1px" }}>{currentPlan.toUpperCase()}</div>
          </div>
          <div className="avatar-pulse" style={{ width: 38, height: 38, borderRadius: "50%", border: `2.5px solid ${aiAccentColor}`, background: "#1a1a1a" }} />
        </div>
      </header>

      {/* Subscription Modal */}
      <AnimatePresence>
        {isSubModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={{ background: theme.bgInner, width: "100%", maxWidth: "400px", borderRadius: "30px", padding: "30px", border: `1px solid ${theme.glassBorder}` }}>
              <h2 style={{ color: "white", marginBottom: "20px", textAlign: "center" }}>Выберите ваш план</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {(["free", "plus", "pro"] as Plan[]).map(plan => (
                  <div key={plan} onClick={() => { setCurrentPlan(plan); setIsSubModalOpen(false); }} style={{ padding: "20px", borderRadius: "20px", border: `2px solid ${currentPlan === plan ? (theme as any)[plan + 'Color'] : "rgba(255,255,255,0.05)"}`, cursor: "pointer", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ color: (theme as any)[plan + 'Color'], fontWeight: 900, marginBottom: "4px" }}>{plan.toUpperCase()}</div>
                    <div style={{ color: "white", opacity: 0.6, fontSize: 13 }}>{plan === "pro" ? "Безлимитный доступ ко всем функциям" : plan === "plus" ? "Увеличенные лимиты и приоритет" : "Базовые возможности"}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsSubModalOpen(false)} style={{ width: "100%", marginTop: "20px", padding: "15px", borderRadius: "15px", background: "white", color: "black", border: "none", fontWeight: 700 }}>Закрыть</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "130px 25px 160px", scrollbarWidth: "none" }}>
        <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-start", gap: "20px" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: msg.role === "user" ? `1.5px solid ${aiAccentColor}` : "1.5px solid rgba(255,255,255,0.2)" }}>
                  <OwlIcon size="18px" color={msg.role === "ai" ? "white" : aiAccentColor} opacity={msg.role === "user" ? 0.3 : 1} />
                </div>
                <div style={{ maxWidth: "80%", fontSize: 17, color: msg.isError ? theme.errColor : (msg.role === "user" ? "white" : theme.aiText) }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "20px 20px calc(25px + env(safe-area-inset-bottom, 20px))", background: `linear-gradient(to top, ${theme.bgBase} 80%, transparent)`, zIndex: 90 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <AnimatePresence>
            {selectedFiles.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={{ display: "flex", gap: "12px", marginBottom: "15px" }}>
                {selectedFiles.map((f, i) => (
                  <div key={i} className="file-preview"><img src={f.url} /><div className="file-remove" onClick={() => setSelectedFiles(p => p.filter((_, idx) => idx !== i))}>×</div></div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(30px)", borderRadius: "35px", border: `1px solid ${theme.glassBorder}`, display: "flex", alignItems: "flex-end", padding: "12px 18px", gap: "10px" }}>
            <input type="file" ref={photoInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
            <input type="file" ref={cameraInputRef} style={{ display: "none" }} capture="environment" accept="image/*" onChange={handleFileChange} />
            <input type="file" ref={docInputRef} style={{ display: "none" }} accept=".pdf,.txt,.doc,.docx" onChange={handleFileChange} />
            <div style={{ position: "relative", display: "flex", alignItems: "center", flexShrink: 0, marginBottom: "3px" }}>
              <AnimatePresence>
                {showActionMenu && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: -20, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }} style={{ position: "absolute", bottom: "100%", left: 0, background: "#1B263B", borderRadius: "24px", padding: "10px", border: `1px solid ${theme.glassBorder}`, width: "260px", boxShadow: "0 15px 45px rgba(0,0,0,0.6)", zIndex: 100 }}>
                    <div onClick={() => photoInputRef.current?.click()} style={{ padding: "14px", color: "white", cursor: "pointer" }}>🖼️ Галерея</div>
                    <div onClick={() => cameraInputRef.current?.click()} style={{ padding: "14px", color: "white", cursor: "pointer" }}>📸 Камера</div>
                    <div onClick={() => docInputRef.current?.click()} style={{ padding: "14px", color: "white", cursor: "pointer" }}>📁 Документы</div>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "5px 10px" }} />
                    <div onClick={clearChat} style={{ padding: "14px", color: "#FF4D4D", fontWeight: 600, cursor: "pointer" }}>🗑️ Очистить чат</div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div whileTap={{ scale: 0.9 }} onClick={() => setShowActionMenu(!showActionMenu)} style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "rgba(255,255,255,0.05)" }}>
                <motion.svg width="22" height="22" viewBox="0 0 24 24" animate={{ rotate: showActionMenu ? 45 : 0 }}><path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity={0.7}/></motion.svg>
              </motion.div>
            </div>
            <textarea rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder="Спроси GLAi..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: 17, padding: "8px 0", resize: "none" }} />
            <motion.div onClick={handleSend} whileTap={{ scale: 0.92 }} style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: input.trim() || selectedFiles.length > 0 ? aiAccentColor : "rgba(255,255,255,0.05)", border: `2px solid ${aiAccentColor}`, marginBottom: "2px" }}>
              <div style={{ width: "82%", height: "82%", borderRadius: "50%", background: "#0D1B2A", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="18" height="18" viewBox="0 0 24 24" style={{ transform: "rotate(-45deg)" }}><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg></div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}