/**
 * СЕЙФ: FreeCard
 * Исправлено: accentColor теперь используется для тонкого акцента заголовка.
 */
export const FreeCard = ({ accentColor }: { accentColor: string }) => {
  return (
    <div style={{
      padding: "25px", borderRadius: "24px", background: "rgba(255,255,255,0.03)",
      border: `1px solid rgba(255,255,255,0.1)`, display: "flex", flexDirection: "column", gap: "15px"
    }}>
      <div style={{ 
        fontSize: "12px", fontWeight: 900, 
        color: `${accentColor}88`, // Используем цвет с прозрачностью 88
        letterSpacing: "2px" 
      }}>
        BASE LEVEL
      </div>
      <div style={{ fontSize: "28px", fontWeight: 950, color: "white" }}>FREE</div>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>
        • 100 daily requests<br />
        • Standard AI speed<br />
        • Basic styles
      </div>
      <div style={{ 
        marginTop: "10px", padding: "12px", borderRadius: "12px", 
        background: "rgba(255,255,255,0.05)", color: "white", 
        fontSize: "10px", fontWeight: 900, textAlign: "center", opacity: 0.5 
      }}>
        CURRENT PLAN
      </div>
    </div>
  );
};