export const ProCard = ({ accentColor }: { accentColor: string }) => {
  return (
    <div style={{
      padding: "25px", borderRadius: "24px", background: "black",
      border: `2px solid ${accentColor}`, display: "flex", flexDirection: "column", gap: "15px",
      position: "relative", overflow: "hidden", boxShadow: `0 0 40px ${accentColor}22`
    }}>
      <div style={{ fontSize: "12px", fontWeight: 900, color: accentColor, letterSpacing: "2px" }}>UNLIMITED</div>
      <div style={{ fontSize: "28px", fontWeight: 950, color: "white" }}>$49<span style={{ fontSize: "14px", opacity: 0.5 }}>/mo</span></div>
      <div style={{ fontSize: "11px", color: "white", lineHeight: "1.6", opacity: 0.9 }}>
        • No limits forever<br />
        • Priority GPU access<br />
        • Early Alpha features
      </div>
      <button style={{ 
        marginTop: "10px", padding: "15px", borderRadius: "12px", 
        background: "white", color: "black", border: "none",
        fontSize: "11px", fontWeight: 950, cursor: "pointer",
        boxShadow: "0 0 20px white"
      }}>
        GET PRO UNLIMITED
      </button>
    </div>
  );
};