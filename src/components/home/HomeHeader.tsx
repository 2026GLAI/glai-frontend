import { memo } from "react";
import OwlIcon from "../OwlIcon";

type Plan = "free" | "plus" | "pro";

interface HomeHeaderProps {
  currentPlan: Plan;
  accentColor: string;
  onPlanClick: () => void;
}

export const HomeHeader = memo(({ currentPlan, accentColor, onPlanClick }: HomeHeaderProps) => {
  return (
    <header
      style={{
        width: "100%",
        padding: "40px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        zIndex: 10
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ filter: `drop-shadow(0 0 10px ${accentColor}66)` }}>
          <OwlIcon size="42px" color={accentColor} />
        </div>

        <div
          style={{
            width: "2px",
            height: "30px",
            background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
            opacity: 0.6
          }}
        />

        <div style={{ fontSize: 24, fontWeight: 950, color: "white", letterSpacing: "6px" }}>
          GL<span style={{ color: accentColor, fontWeight: 400 }}>Ai</span>
        </div>
      </div>

      <div
        onClick={onPlanClick}
        style={{ display: "flex", alignItems: "center", gap: "20px", cursor: "pointer" }}
      >
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: "white",
              opacity: 0.8,
              letterSpacing: "4px",
              marginBottom: "4px"
            }}
          >
            CORE
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 950,
              color: accentColor,
              letterSpacing: "2.5px"
            }}
          >
            {currentPlan.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: `3px solid ${accentColor}`,
            background: "#1a1a1a"
          }}
        />
      </div>
    </header>
  );
});

HomeHeader.displayName = "HomeHeader";
