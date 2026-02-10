/**
 * КОМПОНЕНТ: FreeQuota
 * Описание: Изолированный модуль лимитов для бесплатного плана.
 * Страховка: Чистый код без лишних импортов.
 */
export const FreeQuota = ({ current, max, color }: { current: number; max: number; color: string }) => {
  const progress = (current / max) * 100;
  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        fontSize: "9px", 
        fontWeight: 900, 
        opacity: 0.5, 
        marginBottom: "4px",
        letterSpacing: "1px"
      }}>
        <span>FREE CAPACITY</span>
        <span>{current}/{max}</span>
      </div>
      <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "1px", overflow: "hidden" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: color, transition: "width 1s ease" }} />
      </div>
    </div>
  );
};