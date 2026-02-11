import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlan } from "../hooks/usePlan";
import type { Plan } from "../hooks/usePlan";
import { SideMenu } from "../components/home/SideMenu";
import { Sidebar } from "../components/home/Sidebar";
import { HomeHeader } from "../components/home/HomeHeader";
import { Hero } from "../components/home/Hero";
import { Footer } from "./../components/home/Footer";
import { HOME_LOCALE } from "../constants/translations";

export default function HomePage() {
  const { currentPlan, savePlan, theme } = usePlan();
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState("el");

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    const finalLang = browserLang in HOME_LOCALE ? browserLang : "el";
    setLang(finalLang);
  }, []);

  const activeAccentColor = useMemo(() => {
    return (currentPlan === "pro" || currentPlan === "plus") ? "#FFD700" : "#007BFF";
  }, [currentPlan]);

  if (!theme) return null;

  return (
    <main style={{
      width: "100vw", height: "100vh", minHeight: "100dvh", background: theme.bgBase,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
        width: "80vw", height: "80vw", background: `radial-gradient(circle, ${activeAccentColor}08 0%, transparent 65%)`,
        zIndex: 1, pointerEvents: "none", filter: "blur(100px)"
      }} />
      
      <style>{`
        body { margin: 0; padding: 0; background: ${theme.bgBase}; -webkit-font-smoothing: antialiased; }
        @keyframes aiTextPulse {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 5px ${activeAccentColor}aa); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 10px ${activeAccentColor}); }
        }
        .ai-pulse-text { 
          animation: aiTextPulse 4s infinite ease-in-out; 
          color: ${activeAccentColor} !important; 
          font-weight: 950;
          transition: color 0.4s ease;
        }
      `}</style>

      {/* ИСПРАВЛЕННЫЙ БЛОК: Sidebar теперь соответствует новым SidebarProps */}
      <div className="desktop-sidebar" style={{ zIndex: 20 }}>
        <Sidebar onMenuClick={() => setIsMenuOpen(true)} />
      </div>

      <AnimatePresence>
        {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>

      <HomeHeader onAvatarClick={() => setIsSubModalOpen(true)} />

      <Hero lang={lang} accentColor={activeAccentColor} />

      <Footer lang={lang} />

      <AnimatePresence>
        {isSubModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSubModalOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(20px)" }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} 
              onClick={e => e.stopPropagation()} 
              style={{ background: "#0c121d", width: "360px", borderRadius: "40px", padding: "50px 40px", border: `1px solid rgba(255,255,255,0.05)` }}
            >
              <h3 style={{ color: "white", textAlign: "center", marginBottom: "30px", fontSize: "11px", fontWeight: 900, letterSpacing: "4px", opacity: 0.5 }}>SELECT SYSTEM PLAN</h3>
              {(["free", "pro"] as Plan[]).map(p => (
                <div key={p} onClick={() => { savePlan(p); setIsSubModalOpen(false); }} style={{ 
                  padding: "20px", marginBottom: "15px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", 
                  color: "white", textAlign: "center", cursor: "pointer",
                  background: currentPlan === p ? (p === 'pro' ? '#FFD70015' : '#007BFF15') : "rgba(255,255,255,0.02)",
                  borderColor: currentPlan === p ? (p === 'pro' ? '#FFD700' : '#007BFF') : "rgba(255, 255, 255, 0.1)"
                }}>
                  <span style={{ fontSize: "13px", fontWeight: 950, letterSpacing: "2px" }}>
                    {p === 'free' ? 'LIMIT (FREE)' : 'UNLIMIT (PRO)'}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}