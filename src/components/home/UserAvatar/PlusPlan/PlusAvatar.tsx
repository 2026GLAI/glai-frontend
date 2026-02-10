import React from "react";

interface PlusAvatarProps {
  onClick: () => void;
  accentColor: string;
}

export const PlusAvatar: React.FC<PlusAvatarProps> = ({ onClick, accentColor }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: "#000",
        border: `3px solid ${accentColor}`, // Цветной бортик
        boxShadow: `0 0 15px ${accentColor}44`, // Легкое свечение
        cursor: "pointer",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        overflow: "hidden"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
        e.currentTarget.style.boxShadow = `0 0 25px ${accentColor}88`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) rotate(0deg)";
        e.currentTarget.style.boxShadow = `0 0 15px ${accentColor}44`;
      }}
    >
        {/* Эффект стеклянного блеска */}
        <div style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
        }} />
    </div>
  );
};