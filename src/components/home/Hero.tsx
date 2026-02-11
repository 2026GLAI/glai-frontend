import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HOME_LOCALE } from "../../constants/translations";
import OwlIcon from "./OwlIcon";

interface Props {
  lang: string;
  accentColor: string;
}

export const Hero: React.FC<Props> = ({ lang, accentColor }) => {
  const navigate = useNavigate();
  const currentLang = (HOME_LOCALE[lang as keyof typeof HOME_LOCALE] ? lang : "el") as keyof typeof HOME_LOCALE;
  const t = HOME_LOCALE[currentLang];

  return (
    <div className="hero-container" style={{
      flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
      width: "100%", maxWidth: "420px", padding: "0 20px", zIndex: 5, textAlign: "center"
    }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <div style={{
            padding: "24px", borderRadius: "50%", border: `1px solid ${accentColor}44`,
            background: `radial-gradient(circle, ${accentColor}08 0%, transparent 75%)`,
            boxShadow: `0 0 40px ${accentColor}15`
          }}>
             <OwlIcon size="52px" color="white" />
          </div>
        </div>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "4px", marginBottom: "10px" }}>
          {t.greeting}
        </p>
        
        {/* translate="no" защищает от пробелов Google Translate */}
        <h1 translate="no" style={{ 
          color: "white", fontSize: "44px", fontWeight: 950, marginBottom: "25px", letterSpacing: "8px",
          display: "flex", justifyContent: "center", alignItems: "baseline" 
        }}>
          GL<span className="ai-pulse-text" style={{ color: accentColor, marginLeft: "-2px" }}>Ai</span>
        </h1>

        <div style={{ marginBottom: "45px" }}>
          <p style={{ color: "white", fontSize: "17px", fontWeight: 300, lineHeight: 1.4, marginBottom: "12px" }}>
            {t.description}
          </p>
          <p style={{ color: accentColor, fontSize: "12px", fontWeight: 800, letterSpacing: "2px", opacity: 0.9, marginBottom: "15px" }}>
            {t.etymology}
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontWeight: 300, lineHeight: 1.6 }}>
            {t.benefits}
          </p>
        </div>

        <motion.div 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/chat/global')} 
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            padding: "20px", borderRadius: "22px", border: `1px solid ${accentColor}44`,
            cursor: "pointer", backdropFilter: "blur(15px)"
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 900, color: "white", letterSpacing: "5px" }}>
            {t.chatButton}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};