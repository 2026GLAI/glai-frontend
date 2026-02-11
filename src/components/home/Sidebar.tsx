import React from "react";
import OwlIcon from "./OwlIcon";
import { usePlan } from "../../hooks/usePlan";

interface SidebarProps {
  onMenuClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const { aiAccentColor } = usePlan();

  return (
    <aside style={{
      width: "70px",
      height: "100vh",
      background: "rgba(5, 10, 20, 0.8)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,255,255,0.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "30px 0", // Совпадает с вертикальным паддингом хедера
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      {/* Центрированный логотип */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        height: "32px", // Фиксированная высота для совпадения с линией текста
        filter: `drop-shadow(0 0 5px ${aiAccentColor}44)` 
      }}>
        <OwlIcon size="24px" color="white" />
      </div>

      <button
        onClick={onMenuClick}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${aiAccentColor}44`,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: `0 0 15px ${aiAccentColor}11`,
          marginBottom: "40px" // Сдвигаем кнопку чуть выше от низа
        }}
      >
        <div style={{ width: "18px", height: "2px", background: aiAccentColor, borderRadius: "2px" }} />
        <div style={{ width: "12px", height: "2px", background: aiAccentColor, borderRadius: "2px" }} />
        <div style={{ width: "18px", height: "2px", background: aiAccentColor, borderRadius: "2px" }} />
      </button>

      <div style={{ height: "32px" }} />
    </aside>
  );
};