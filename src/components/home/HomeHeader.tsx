import React from "react";
import { Avatar } from "../ui/Avatar";
import { usePlan } from "../../hooks/usePlan";

interface Props {
  onAvatarClick: () => void;
}

export const HomeHeader: React.FC<Props> = ({ onAvatarClick }) => {
  const { aiAccentColor } = usePlan();

  return (
    <header translate="no" style={{
      width: "100%",
      padding: "32px 40px 32px 110px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      zIndex: 10, 
      boxSizing: "border-box"
    }}>
      <div style={{ display: "flex", alignItems: "baseline", height: "32px" }}>
        <div style={{ 
          display: "flex",
          alignItems: "baseline",
          fontSize: "22px", 
          // УВЕЛИЧЕННОЕ РАССТОЯНИЕ: создаем "воздух" бренда
          letterSpacing: "0.15em", 
          lineHeight: "1",
          cursor: "default",
          userSelect: "none",
          // Добавляем современный гротескный шрифт
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}>
          <span style={{ 
            fontWeight: 800, 
            color: "white",
            textTransform: "uppercase"
          }}>
            GL
          </span>

          <span 
            className="ai-pulse-text" 
            style={{ 
              color: aiAccentColor,
              fontWeight: 200, // Еще более тонкий для контраста
              marginLeft: "4px", // Небольшой зазор между GL и Ai
              textShadow: `0 0 15px ${aiAccentColor}44`
            }}
          >
            Ai
          </span>
        </div>
      </div>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar onClick={onAvatarClick} />
      </div>
    </header>
  );
};