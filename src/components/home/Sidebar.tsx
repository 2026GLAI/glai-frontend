import { motion } from "framer-motion";
import OwlIcon from "./OwlIcon";

interface SidebarProps {
  onInfoClick: () => void;
  accentColor: string;
}

export const Sidebar = ({ onInfoClick, accentColor }: SidebarProps) => {
  return (
    <motion.nav 
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      style={{
        position: "fixed", left: 0, top: 0, height: "100vh", width: "70px",
        background: "rgba(5, 10, 15, 0.4)", borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "30px 0", zIndex: 100, backdropFilter: "blur(10px)"
      }} className="desktop-only"
    >
      <style>{`
        @media (max-width: 1024px) { .desktop-only { display: none !important; } }
        .sidebar-icon { 
          width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
          border-radius: 12px; cursor: pointer; transition: all 0.3s ease; color: rgba(255,255,255,0.4);
          margin-bottom: 25px;
        }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: white; }
        .sidebar-bottom { 
          margin-top: auto; 
          padding-bottom: calc(20px + env(safe-area-inset-bottom));
        }
        .icon-pulse-active {
          box-shadow: 0 0 15px ${accentColor}22;
          border: 1px solid ${accentColor}44 !important;
        }
      `}</style>

      {/* Логотип системы */}
      <div className="sidebar-icon" style={{ color: "white", cursor: "default" }}>
        <OwlIcon size="30px" color="white" />
      </div>

      {/* Быстрое действие: Новый чат */}
      <div className="sidebar-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </div>

      <div className="sidebar-bottom">
        {/* Кнопка вызова Панели Управления SideMenu */}
        <div 
          className="sidebar-icon icon-pulse-active" 
          onClick={onInfoClick}
        >
          <span style={{ 
            fontFamily: "serif", 
            fontStyle: "italic", 
            fontSize: "20px", 
            color: accentColor,
            textShadow: `0 0 8px ${accentColor}66` 
          }}>i</span>
        </div>
      </div>
    </motion.nav>
  );
};