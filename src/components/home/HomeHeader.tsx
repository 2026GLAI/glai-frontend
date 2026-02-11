import React from "react";
import OwlIcon from "./OwlIcon";
import { Avatar } from "../ui/Avatar";
import { usePlan } from "../../hooks/usePlan";

interface Props {
  onAvatarClick: () => void;
}

export const HomeHeader: React.FC<Props> = ({ onAvatarClick }) => {
  const { currentPlan } = usePlan();
  const isPro = currentPlan === "pro" || currentPlan === "plus";
  const statusColor = isPro ? "#FFD700" : "#007BFF";

  return (
    <header translate="no" className="main-header" style={{
      width: "100%", padding: "30px 40px", display: "flex", 
      justifyContent: "space-between", alignItems: "center", zIndex: 10, boxSizing: "border-box"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div style={{ filter: `drop-shadow(0 0 8px ${statusColor}44)` }}>
          <OwlIcon size="28px" color="white" />
        </div>
        <div style={{ width: "1px", height: "20px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)" }} />
        <div style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "5px" }}>
          GL<span className="ai-pulse-text" style={{ color: statusColor }}>Ai</span>
        </div>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Avatar onClick={onAvatarClick} />
      </div>
    </header>
  );
};