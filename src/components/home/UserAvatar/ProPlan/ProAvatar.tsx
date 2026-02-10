import React from "react";

interface ProAvatarProps {
  onClick: () => void;
  accentColor: string;
}

/**
 * КОМПОНЕНТ: ProAvatar
 * Описание: Вершина иерархии аватаров GLAi. Безлимитный статус.
 * Эффекты: Двойное пульсирующее кольцо, градиентное свечение, "дыхание" системы.
 */
export const ProAvatar: React.FC<ProAvatarProps> = ({ onClick, accentColor }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: "#000",
        border: `3px solid ${accentColor}`,
        boxShadow: `0 0 25px ${accentColor}88, inset 0 0 10px ${accentColor}44`,
        cursor: "pointer",
        position: "relative",
        transition: "all 0.5s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <style>{`
        @keyframes proPulse {
          0% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0px ${accentColor}66; }
          50% { transform: scale(1.15); opacity: 0.4; box-shadow: 0 0 0 15px ${accentColor}00; }
          100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0px ${accentColor}66; }
        }
        .pro-ring {
          position: absolute;
          inset: -6px;
          border: 1px solid ${accentColor}88;
          borderRadius: 50%;
          animation: proPulse 3s infinite ease-out;
          pointer-events: none;
        }
      `}</style>

      {/* Внешнее кольцо "дыхания" системы */}
      <div className="pro-ring" />
      
      {/* Иконка или индикатор короны/безлимита */}
      <div style={{ 
        fontSize: "10px", 
        fontWeight: 900, 
        color: accentColor, 
        letterSpacing: "1px",
        textShadow: `0 0 8px ${accentColor}`
      }}>
        PRO
      </div>
    </div>
  );
};