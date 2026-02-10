import { motion } from "framer-motion";
import { usePlan } from "../../hooks/usePlan";

interface SideMenuProps {
  onClose: () => void;
}

/**
 * SIDE MENU (SYSTEM CONTROL)
 * Управляет переключением стилей общения и режимов системы.
 * Интегрирован с глобальным состоянием планов (Free, Plus, Pro).
 */
export const SideMenu = ({ onClose }: SideMenuProps) => {
  const { currentPlan, savePlan, theme, aiAccentColor } = usePlan();

  if (!theme) return null;

  const communicationStyles = [
    "Standard", "Philosophical", "Humor", 
    "Technical", "Diplomatic", "Creative"
  ];

  return (
    <>
      {/* Overlay для закрытия меню */}
      <div 
        onClick={onClose} 
        style={{ 
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", 
          backdropFilter: "blur(8px)", zIndex: 1000, cursor: "pointer" 
        }} 
      />
      
      <motion.div
        initial={{ x: "-100%" }} 
        animate={{ x: 0 }} 
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, width: "300px", 
          background: theme.bgInner, zIndex: 1001,
          borderRight: `1px solid ${theme.glassBorder}`, 
          display: "flex", flexDirection: "column", padding: "30px 20px"
        }}
      >
        {/* HEADER МЕНЮ */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <h2 style={{ color: "white", fontSize: "16px", fontWeight: 950, letterSpacing: "2px", margin: 0 }}>
            SYSTEM CONTROL
          </h2>
          <div onClick={onClose} style={{ color: "white", opacity: 0.3, cursor: "pointer", fontSize: "20px" }}>✕</div>
        </div>

        {/* СТИЛИ ОБЩЕНИЯ */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: "1.5px", marginBottom: "15px" }}>
            COMMUNICATION STYLES
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {communicationStyles.map((style) => (
              <div 
                key={style} 
                style={{ 
                  padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", 
                  border: "1px solid rgba(255,255,255,0.08)", color: "white", 
                  fontSize: "9px", textAlign: "center", fontWeight: 700, cursor: "pointer" 
                }}
              >
                {style.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* СИСТЕМНЫЕ РЕЖИМЫ (ПЕРЕКЛЮЧАТЕЛЬ ПЛАНОВ) */}
        <div style={{ marginBottom: "35px" }}>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: "1.5px", marginBottom: "15px" }}>
            SYSTEM MODES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {(["free", "plus", "pro"] as const).map(mode => (
              <div 
                key={mode} 
                onClick={() => {
                  savePlan(mode);
                  // Опционально: onClose(); если хочешь, чтобы меню закрывалось при выборе
                }} 
                style={{ 
                  padding: "16px", borderRadius: "14px", fontSize: "11px", fontWeight: 900,
                  background: currentPlan === mode ? `${aiAccentColor}15` : "transparent",
                  border: `1px solid ${currentPlan === mode ? aiAccentColor : "rgba(255,255,255,0.05)"}`,
                  color: currentPlan === mode ? aiAccentColor : "rgba(255,255,255,0.3)",
                  cursor: "pointer", textAlign: "center", letterSpacing: "1px",
                  transition: "all 0.3s ease"
                }}
              >
                {mode.toUpperCase()} ENGINE
              </div>
            ))}
          </div>
        </div>

        {/* НИЖНИЙ ИНДИКАТОР СТАТУСА (ДЛЯ ПОЛЬЗОВАТЕЛЯ) */}
        <div style={{ marginTop: "auto", paddingTop: "20px", display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ 
              width: "8px", height: "8px", borderRadius: "50%", 
              background: "#00E5FF", boxShadow: "0 0 10px #00E5FF" 
            }} />
            <span style={{ color: "white", fontSize: "10px", fontWeight: 900, letterSpacing: "1px", opacity: 0.6 }}>
              GLAI.GR ONLINE
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};