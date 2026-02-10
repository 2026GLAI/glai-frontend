/**
 * КОМПОНЕНТ: PlusQuota
 * Описание: Модуль лимитов для плана Plus с эффектом свечения.
 */
export const PlusQuota = ({ current, max, color }: { current: number; max: number; color: string }) => {
  const progress = (current / max) * 100;
  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        fontSize: "9px", 
        fontWeight: 900, 
        color: color, 
        marginBottom: "4px",
        letterSpacing: "1px"
      }}>
        <span>PLUS ENERGY</span>
        <span>{current}/{max}</span>
      </div>
      <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ 
          width: `${progress}%`, 
          height: "100%", 
          background: color, 
          boxShadow: `0 0 10px ${color}`,
          transition: "width 1s ease" 
        }} />
      </div>
    </div>
  );
};