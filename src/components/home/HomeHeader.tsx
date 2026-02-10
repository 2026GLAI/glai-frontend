import { memo } from "react";
import OwlIcon from "./OwlIcon";

// Импорт аватаров из сейфов
import { FreeAvatar } from "./UserAvatar/FreePlan/FreeAvatar";
import { PlusAvatar } from "./UserAvatar/PlusPlan/PlusAvatar";
import { ProAvatar } from "./UserAvatar/ProPlan/ProAvatar";

// Импорт лимитов из сейфов
import { FreeQuota } from "./UserAvatar/FreeQuota/FreeQuota";
import { PlusQuota } from "./UserAvatar/PlusQuota/PlusQuota";
import { ProQuota } from "./UserAvatar/ProQuota/ProQuota";

type Plan = "free" | "plus" | "pro";

interface HomeHeaderProps {
  currentPlan: Plan;
  accentColor: string;
  onPlanClick: () => void;
}

/**
 * HOME HEADER
 * Дирижер верхней панели системы GLAi.
 */
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
      {/* ЛЕВАЯ ЧАСТЬ: ЛОГОТИП */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ filter: `drop-shadow(0 0 10px ${accentColor}66)` }}>
          <OwlIcon size="42px" color={accentColor} />
        </div>

        <div
          style={{
            width: "2px",
            height: "30px",
            background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
            opacity: 0.4
          }}
        />

        <div style={{ fontSize: 24, fontWeight: 950, color: "white", letterSpacing: "6px" }}>
          GL<span style={{ color: accentColor, fontWeight: 400 }}>Ai</span>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: ИНФОРМАЦИЯ И АВАТАР */}
      <div
        onClick={onPlanClick}
        style={{ display: "flex", alignItems: "center", gap: "25px", cursor: "pointer" }}
      >
        {/* ЛИМИТЫ (QUOTA SAFE) */}
        <div style={{ textAlign: "right", minWidth: "120px" }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "white", opacity: 0.6, letterSpacing: "4px", marginBottom: "2px" }}>
            CORE
          </div>
          <div style={{ fontSize: 14, fontWeight: 950, color: accentColor, letterSpacing: "2.5px" }}>
            {currentPlan.toUpperCase()}
          </div>
          
          <div style={{ width: "100%" }}>
            {currentPlan === "free" && <FreeQuota current={45} max={100} color={accentColor} />}
            {currentPlan === "plus" && <PlusQuota current={850} max={1000} color={accentColor} />}
            {currentPlan === "pro" && <ProQuota color={accentColor} />}
          </div>
        </div>

        {/* АВАТАР (AVATAR SAFE) */}
        <div style={{ position: "relative" }}>
          {currentPlan === "free" && <FreeAvatar onClick={onPlanClick} />}
          {currentPlan === "plus" && <PlusAvatar onClick={onPlanClick} accentColor={accentColor} />}
          {currentPlan === "pro" && <ProAvatar onClick={onPlanClick} accentColor={accentColor} />}
        </div>
      </div>
    </header>
  );
});

HomeHeader.displayName = "HomeHeader";