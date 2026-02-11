import React from "react";
import { HOME_LOCALE } from "../../constants/translations";

interface Props {
  accentColor: string;
  lang: string; // Добавили прием языка
}

export const Footer: React.FC<Props> = ({ accentColor, lang }) => {
  const currentLang = (lang === "el" ? "el" : "en") as keyof typeof HOME_LOCALE;

  return (
    <footer style={{ 
      width: "100%", padding: "40px 0", 
      display: "flex", justifyContent: "center", zIndex: 10 
    }}>
      <div style={{ display: "flex", gap: "40px", fontSize: "9px", fontWeight: 900, letterSpacing: "3px", color: "rgba(255,255,255,0.15)" }}>
        <span style={{ cursor: "pointer" }}>
          {HOME_LOCALE[currentLang].footerTerms}
        </span>
        <span style={{ cursor: "pointer" }}>
          {HOME_LOCALE[currentLang].footerPrivacy}
        </span>
        <span style={{ color: accentColor, opacity: 0.4 }}>GLAI.GR</span>
      </div>
    </footer>
  );
};