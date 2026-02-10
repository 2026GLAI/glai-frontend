import React from "react";

interface FreeLimitsProps {
  current: number;
  max: number;
}

/**
 * КОМПОНЕНТ: FreeLimits
 * Описание: Индикатор оставшихся запросов для лимитной версии.
 */
export const FreeLimits: React.FC<FreeLimitsProps> = ({ current, max }) => {
  const percentage = (current / max) * 100;

  return (
    <div style={{ width: "100%", marginTop: "15px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        fontSize: "10px", 
        fontWeight: 900, 
        color: "rgba(255,255,255,0.3)",
        marginBottom: "6px",
        letterSpacing: "1px"
      }}>
        <span>QUOTA USED</span>
        <span style={{ color: "white" }}>{current} / {max}</span>
      </div>
      <div style={{ 
        width: "100%", 
        height: "3px", 
        background: "rgba(255,255,255,0.05)", 
        borderRadius: "2px",
        overflow: "hidden"
      }}>
        <div style={{ 
          width: `${percentage}%`, 
          height: "100%", 
          background: "rgba(255,255,255,0.4)", 
          borderRadius: "2px",
          transition: "width 1s ease-out"
        }} />
      </div>
    </div>
  );
};