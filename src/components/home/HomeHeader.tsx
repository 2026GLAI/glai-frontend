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
      // 32px сверху для идеального выравнивания с центром совы в сайдбаре
      padding: "32px 40px 32px 110px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      zIndex: 10, 
      boxSizing: "border-box"
    }}>
      {/* Контейнер логотипа */}
      <div style={{ display: "flex", alignItems: "baseline", height: "32px" }}>
        <div style={{ 
          display: "flex",
          alignItems: "baseline",
          fontSize: "26px", // Чуть крупнее для солидности
          letterSpacing: "-0.5px", // Отрицательный кернинг для премиального вида
          lineHeight: "1",
          cursor: "default",
          userSelect: "none"
        }}>
          {/* Массивный GL */}
          <span style={{ 
            fontWeight: 950, // Максимальный вес
            color: "white",
            textTransform: "uppercase"
          }}>
            GL
          </span>

          {/* Технологичный Ai */}
          <span 
            className="ai-pulse-text" 
            style={{ 
              color: aiAccentColor,
              fontWeight: 300, // Контрастная легкость
              marginLeft: "1px",
              // Тень создает эффект неоновой трубки
              textShadow: `
                0 0 10px ${aiAccentColor}66,
                0 0 20px ${aiAccentColor}33
              `
            }}
          >
            Ai
          </span>
        </div>
      </div>
      
      {/* Правая часть: Аватар */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar onClick={onAvatarClick} />
      </div>
    </header>
  );
};