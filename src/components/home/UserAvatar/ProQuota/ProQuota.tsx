/**
 * КОМПОНЕНТ: ProQuota
 * Описание: Модуль статуса для безлимитного плана PRO.
 */
export const ProQuota = ({ color }: { color: string }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ 
        fontSize: "9px", 
        fontWeight: 900, 
        color: color, 
        letterSpacing: "2px", 
        textAlign: "right",
        textShadow: `0 0 8px ${color}44`
      }}>
        ∞ UNLIMITED ACCESS
      </div>
      <div style={{ 
        width: "100%", 
        height: "2px", 
        background: `linear-gradient(90deg, ${color}, transparent)`, 
        marginTop: "4px",
        borderRadius: "1px"
      }} />
    </div>
  );
};