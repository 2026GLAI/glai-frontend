export const PlusCard = ({ accentColor }: { accentColor: string }) => {
  return (
    <div style={{
      padding: "25px", borderRadius: "24px", background: `${accentColor}05`,
      border: `1px solid ${accentColor}33`, display: "flex", flexDirection: "column", gap: "15px",
      boxShadow: `0 10px 30px ${accentColor}11`
    }}>
      <div style={{ fontSize: "12px", fontWeight: 900, color: accentColor, letterSpacing: "2px" }}>ADVANCED</div>
      <div style={{ fontSize: "28px", fontWeight: 950, color: "white" }}>$19<span style={{ fontSize: "14px", opacity: 0.5 }}>/mo</span></div>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
        • 1000 daily requests<br />
        • Turbo processing<br />
        • All visual styles
      </div>
      <button style={{ 
        marginTop: "10px", padding: "12px", borderRadius: "12px", 
        background: accentColor, color: "black", border: "none",
        fontSize: "10px", fontWeight: 900, cursor: "pointer",
        transition: "transform 0.2s"
      }}>
        UPGRADE TO PLUS
      </button>
    </div>
  );
};