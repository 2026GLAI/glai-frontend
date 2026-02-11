import React from "react";
import { usePlan } from "../../hooks/usePlan";
import { HOME_LOCALE } from "../../constants/translations";

interface FooterProps {
  lang: string;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const { currentPlan } = usePlan();
  
  const t = lang in HOME_LOCALE ? HOME_LOCALE[lang as keyof typeof HOME_LOCALE] : HOME_LOCALE["el"];
  
  const isPro = currentPlan === "pro" || currentPlan === "plus";
  const accentColor = isPro ? "#FFD700" : "#007BFF";
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      width: "100%",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      zIndex: 10,
      background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
    }}>
      <div style={{
        width: "80%",
        height: "1px",
        background: `linear-gradient(to right, transparent, ${accentColor}44, transparent)`,
        marginBottom: "10px"
      }} />

      <div style={{
        display: "flex",
        gap: "25px",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase"
      }}>
        <a href="https://glai.gr/privacy" style={linkStyle(accentColor)}>{t.footerPrivacy}</a>
        <a href="https://glai.gr/terms" style={linkStyle(accentColor)}>{t.footerTerms}</a>
        <a href="https://glai.gr/cookies" style={linkStyle(accentColor)}>Cookies</a>
      </div>

      <div style={{
        textAlign: "center",
        fontSize: "11px",
        color: "rgba(255,255,255,0.3)",
        fontWeight: 500,
        letterSpacing: "1px"
      }}>
        © {currentYear} <span style={{ color: "white", fontWeight: 700 }}>GLAi</span>. 
        All rights reserved. 
        <a 
          href="https://glai.gr" 
          style={{ 
            color: accentColor, 
            textDecoration: "none", 
            marginLeft: "5px",
            fontWeight: 800
          }}
        >
          GLAI.GR
        </a>
      </div>

      <div style={{
        fontSize: "8px",
        color: accentColor,
        opacity: 0.4,
        fontWeight: 900,
        letterSpacing: "3px",
        textTransform: "uppercase"
      }}>
        System Status: <span style={{ opacity: 1 }}>Operational</span>
      </div>
    </footer>
  );
};

// Исправленная функция: теперь accentColor используется для легкого свечения текста
const linkStyle = (accentColor: string): React.CSSProperties => ({
  color: "white",
  textDecoration: "none",
  opacity: 0.6,
  transition: "all 0.3s ease",
  cursor: "pointer",
  // Добавляем микро-тень в цвет акцента для глубины
  textShadow: `0 0 10px ${accentColor}22` 
});