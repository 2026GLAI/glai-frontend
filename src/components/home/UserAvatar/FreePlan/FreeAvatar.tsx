import React from "react";

interface FreeAvatarProps {
  onClick: () => void;
}

/**
 * КОМПОНЕНТ: FreeAvatar
 * Описание: Визуальное состояние аватара для лимитной (бесплатной) версии.
 * Особенности: Минимализм, отсутствие активной пульсации, стандартная граница.
 */
export const FreeAvatar: React.FC<FreeAvatarProps> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "#000", // Черная база
        border: "2px solid rgba(255, 255, 255, 0.1)", // Тусклая граница
        cursor: "pointer",
        position: "relative",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Внутренний символ или заглушка аватара */}
      <div style={{ 
        width: "100%", 
        height: "100%", 
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)" 
      }} />
    </div>
  );
};