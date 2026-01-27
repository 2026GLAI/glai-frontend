import { useNavigate } from "react-router-dom";
import logoGold from "../assets/logo-gold.png";
import logoDark from "../assets/logo.png";
import { useVisualViewport } from "../hooks/useVisualViewport";

export default function HomePage() {
  const navigate = useNavigate();
  const { height, offsetTop } = useVisualViewport();
  const isDarkMode = new Date().getHours() < 7 || new Date().getHours() >= 19;

  const theme = {
    bgBase: isDarkMode ? "#0D1B2A" : "#D1B2A0",
    bgInner: isDarkMode ? "#1B263B" : "#E2C9B8", // Для радиального градиента
    text: isDarkMode ? "#E6D3B1" : "#1F2A30",
    accent: isDarkMode ? "#C9A46A" : "#AD7858",
    btnPrimary: "#AD7858"
  };

  return (
    <main style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: `${height}px`,
      transform: `translateY(${offsetTop}px)`, overflow: "hidden",
      background: `radial-gradient(circle at 50% 40%, ${theme.bgInner} 0%, ${theme.bgBase} 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      {/* ТЕКСТУРА МАТЕРИАЛА (Зерно) */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.04, pointerEvents: "none", zIndex: 2
      }} />

      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <div style={{ position: "absolute", top: "calc(20px + env(safe-area-inset-top))", right: 24, zIndex: 50 }}>
        <button style={{
          background: "transparent", border: `1px solid ${theme.accent}`,
          color: theme.accent, padding: "6px 14px", borderRadius: 20, fontSize: 14, cursor: "pointer"
        }}>Free / Upgrade</button>
      </div>

      {/* КОНТЕНТ (Лого и Кнопки) */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
        <img src={isDarkMode ? logoGold : logoDark} alt="Logo" style={{ width: 180, marginBottom: 48, userSelect: "none", pointerEvents: "none" }} />
        
        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 300 }}>
          <button onClick={() => navigate("/chat/everyday")} style={{
            height: 54, backgroundColor: theme.btnPrimary, color: "#FFF",
            border: "none", borderRadius: 14, fontSize: 15, fontWeight: 600,
            textTransform: "uppercase", cursor: "pointer", boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}>ΚΑΘΗΜΕΡΙΝΗ ΖΩΗ</button>

          <button onClick={() => navigate("/chat/travel")} style={{
            height: 54, background: "transparent", color: theme.text,
            border: `1px solid ${theme.accent}`, borderRadius: 14, fontSize: 15,
            fontWeight: 600, textTransform: "uppercase", cursor: "pointer"
          }}>ΤΑΞΙΔΙ & ΕΞΕΡΕΥΝΗΣΗ</button>
        </div>
      </div>

      {/* ФУТЕР */}
      <div style={{ position: "absolute", bottom: 0, width: "100%", paddingBottom: "calc(18px + env(safe-area-inset-bottom))", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5 }}>
        <div style={{ width: "80%", height: 1, backgroundColor: theme.accent, opacity: 0.2, marginBottom: 8 }} />
        <div style={{ fontSize: 12, color: theme.text, opacity: 0.7 }}>glai.gr</div>
      </div>
    </main>
  );
}