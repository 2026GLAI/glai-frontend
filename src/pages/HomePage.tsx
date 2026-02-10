import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePlan } from "../hooks/usePlan";
import type { Plan } from "../hooks/usePlan";
import { SideMenu } from "../components/home/SideMenu";
import { Sidebar } from "../components/home/Sidebar";
import OwlIcon from "../components/home/OwlIcon";

export default function HomePage() {
  const navigate = useNavigate();
  const { currentPlan, savePlan, aiAccentColor, theme } = usePlan();
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState("el");

  useEffect(() => {
    const userLang = navigator.language.split("-")[0];
    setLang(userLang === "el" ? "el" : "en");
  }, []);

  const styles = useMemo(() => ({
    main: {
      width: "100vw", height: "100vh", minHeight: "100dvh",
      background: `radial-gradient(circle at 50% 20%, ${theme?.bgInner} 0%, ${theme?.bgBase} 100%)`,
      display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "space-between",
      padding: "env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0",
      boxSizing: "border-box" as const, position: "relative" as const, overflow: "hidden" as const
    },
    header: {
      width: "100%", padding: "25px 30px",
      display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" as const,
      zIndex: 10
    },
    hero: {
      flex: 1, display: "flex", flexDirection: "column" as const, justifyContent: "center",
      width: "100%", maxWidth: "550px", padding: "0 25px", zIndex: 5
    }
  }), [theme]);

  if (!theme) return null;

  return (
    <main style={styles.main}>
      <style>{`
        body { margin: 0; padding: 0; overflow: hidden; background: ${theme.bgBase}; -webkit-font-smoothing: antialiased; }
        @keyframes avatarPulseHome {
          0% { box-shadow: 0 0 0 0px ${aiAccentColor}66; border-color: ${aiAccentColor}; }
          70% { box-shadow: 0 0 0 15px ${aiAccentColor}00; border-color: ${aiAccentColor}aa; }
          100% { box-shadow: 0 0 0 0px ${aiAccentColor}00; border-color: ${aiAccentColor}; }
        }
        @keyframes aiTextPulse {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px ${aiAccentColor}); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 8px ${aiAccentColor}); }
        }
        .ai-pulse-text { animation: aiTextPulse 3s infinite ease-in-out; color: ${aiAccentColor}; font-weight: 400; }
        .avatar-home-pulse { animation: avatarPulseHome 2s infinite ease-in-out; border: 2px solid ${aiAccentColor} !important; }
        .mobile-info-btn {
          display: none; position: fixed; left: 20px; bottom: calc(30px + env(safe-area-inset-bottom)); 
          width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1); align-items: center; justify-content: center;
          z-index: 999; backdrop-filter: blur(20px); cursor: pointer;
        }
        @media (max-width: 1024px) { 
          .mobile-info-btn { display: flex; } 
          .main-header { padding: 20px !important; }
          .hero-container { padding-bottom: 80px !important; } 
          .desktop-sidebar { display: none; }
        }
        @media (min-width: 1025px) {
          .main-header { padding-left: 120px !important; padding-right: 60px !important; }
        }
      `}</style>

      <div className="desktop-sidebar">
        <Sidebar onInfoClick={() => setIsMenuOpen(true)} accentColor={aiAccentColor} />
      </div>

      <div className="mobile-info-btn" onClick={() => setIsMenuOpen(true)}>
         <span style={{ color: "white", fontSize: "18px", fontFamily: "serif", fontStyle: "italic" }}>i</span>
      </div>

      <AnimatePresence>
        {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>

      <header translate="no" style={styles.header} className="main-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <OwlIcon size="24px" color="white" />
            <div style={{ width: "1px", height: "16px", background: "white", opacity: 0.15 }} />
            <div style={{ fontSize: 20, fontWeight: 950, color: "white", letterSpacing: "5px" }}>
              GL<span className="ai-pulse-text">Ai</span>
            </div>
        </div>
        
        <div onClick={() => setIsSubModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", fontWeight: 900, color: "white" }}>{currentPlan.toUpperCase()}</div>
            </div>
            <div className="avatar-home-pulse" style={{ width: 36, height: 36, borderRadius: "50%", background: "#000" }} />
        </div>
      </header>

      <div className="hero-container" style={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 style={{ color: "white", fontSize: "34px", fontWeight: 950, marginBottom: "12px", lineHeight: 1.1 }}>
            {lang === "el" ? "Ρωτήστε τη διάνοια " : "Ask the mind "}
            <span translate="no" style={{ display: "inline-block", marginLeft: "4px", letterSpacing: "5px" }}>
              GL<span className="ai-pulse-text">Ai</span>
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "40px", fontSize: "13px", fontWeight: 300 }}>
            {lang === "el" ? "Κορυφαία ελληνική νοημοσύνη" : "Top-tier Greek intelligence"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {["hellas", "global"].map(id => (
              <div key={id} onClick={() => navigate(`/chat/${id}`)} style={{
                background: "rgba(255,255,255,0.02)", padding: "22px 20px", borderRadius: "18px", 
                border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", textAlign: "left"
              }}>
                <div translate="no" style={{ fontSize: 18, fontWeight: 950, color: "white", marginBottom: "6px", letterSpacing: "4px" }}>
                  GL<span className="ai-pulse-text">Ai</span> <span style={{ color: id === "hellas" ? "#00E5FF" : "white" }}>{id.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer style={{ width: "100%", padding: "20px 0 calc(35px + env(safe-area-inset-bottom))", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: "30px", fontSize: "10px", fontWeight: 900, letterSpacing: "2.5px", color: "rgba(255,255,255,0.2)" }}>
          <span>TERMS</span>
          <span>PRIVACY</span>
          <span style={{ color: aiAccentColor, opacity: 0.5 }}>GLAI.GR</span>
        </div>
      </footer>

      <AnimatePresence>
        {isSubModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSubModalOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()} style={{ background: theme.bgInner, width: "340px", borderRadius: "30px", padding: "40px", border: `1px solid ${theme.glassBorder}` }}>
                <h3 style={{ color: "white", textAlign: "center", marginBottom: "20px", letterSpacing: "1px" }}>SYSTEM PLAN</h3>
                {(["free", "plus", "pro"] as Plan[]).map(p => (
                  <div key={p} onClick={() => { savePlan(p); setIsSubModalOpen(false); }} style={{ 
                    padding: "15px", marginBottom: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", 
                    color: "white", textAlign: "center", cursor: "pointer", 
                    background: currentPlan === p ? `${aiAccentColor}22` : "transparent",
                    borderColor: currentPlan === p ? aiAccentColor : "rgba(255,255,255,0.1)"
                  }}>
                    {p.toUpperCase()}
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}