import React from "react";
import { usePlan } from "../../hooks/usePlan";

interface AvatarProps {
  onClick?: () => void;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ onClick, size = 42 }) => {
  const { currentPlan } = usePlan();
  
  const isPro = currentPlan === "pro" || currentPlan === "plus";
  const activeColor = isPro ? "#FFD700" : "#007BFF"; 
  const statusLabel = isPro ? "PRO" : "FREE";

  return (
    <div key={currentPlan} style={{ position: "relative" }}>
      <style>{`
        @keyframes avatarPulseSystem {
          0% { 
            box-shadow: 0 0 0 0px ${activeColor}66; 
            border-color: ${activeColor}77;
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 38px 18px ${activeColor}33; 
            border-color: ${activeColor};
            transform: scale(1.08);
          }
          100% { 
            box-shadow: 0 0 0 0px ${activeColor}00; 
            border-color: ${activeColor}77;
            transform: scale(1);
          }
        }
        .avatar-container-final {
          animation: avatarPulseSystem 2.5s infinite ease-in-out;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; background: #050505; cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2.5px solid ${activeColor}88;
          box-shadow: inset 0 0 10px ${activeColor}33;
        }
      `}</style>
      
      <div 
        onClick={onClick}
        className="avatar-container-final"
        style={{ width: size, height: size }}
      >
        <span style={{ 
          fontSize: "9px", 
          fontWeight: 950, 
          color: activeColor, 
          letterSpacing: "0.8px",
          textShadow: `0 0 8px ${activeColor}66`,
          pointerEvents: "none"
        }}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
};