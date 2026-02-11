import React from "react";
import { motion } from "framer-motion";
import { usePlan } from "../../hooks/usePlan";
import OwlIcon from "./OwlIcon";

interface SideMenuProps {
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  const { aiAccentColor } = usePlan();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "460px",
        height: "100vh",
        background: "#1E1F20", // Чистый цвет Gemini
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        boxShadow: "none", // Удалена тень блока для чистоты края
        borderRight: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      {/* Header */}
      <div style={{ padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <OwlIcon size="22px" color={aiAccentColor} />
          <span style={{ color: "white", fontWeight: 700, letterSpacing: "2px", fontSize: "12px", textTransform: "uppercase" }}>History</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#8e918f", cursor: "pointer", fontSize: "24px" }}>✕</button>
      </div>

      {/* Текст (Без теней и бликов) */}
      <div className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "0 40px 60px", color: "#E3E3E3", fontSize: "15px", lineHeight: "1.8" }}>
        
        <p style={{ marginBottom: "25px" }}>
          В глубокой древности символом мудрости и проницательности в Афинах была <strong>γλαύξ</strong> — сова Афины. Она олицетворяла способность видеть то, что скрыто от других, и находить верные решения в хаосе событий.
        </p>

        <div style={{ 
          margin: "40px 0", 
          padding: "24px 0", 
          borderTop: "1px solid rgba(255,255,255,0.05)", 
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          textAlign: "center" 
        }}>
          <div style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "5px", color: aiAccentColor }}>
            GLAi = γλαύξ + AI
          </div>
        </div>

        <p style={{ marginBottom: "25px" }}>
          Мы создали <strong>GLAi</strong>, чтобы объединить античную глубину рассудка с безграничными возможностями искусственного интеллекта. Это цифровая инкарнация древнего символа, перенесенная в современный мир.
        </p>

        <p style={{ marginBottom: "25px" }}>
          Наша миссия — вернуть мудрость в повседневную жизнь. Система спроектирована так, чтобы быть безупречно точной в правовых вопросах, эффективной в задачах и доступной в любой момент.
        </p>

        <div style={{ marginTop: "40px", padding: "24px", background: "#131314", borderRadius: "16px" }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#C4C7C5" }}>
            Мудрость не требует восхождения на Акрополь. Она всегда рядом — на экране вашего компьютера и телефона.
          </p>
        </div>

        <footer style={{ marginTop: "60px", opacity: 0.2, fontSize: "10px", letterSpacing: "2px", fontWeight: 700 }}>
          GLAi SYSTEM // EST. 2026
        </footer>
      </div>
    </motion.div>
  );
};