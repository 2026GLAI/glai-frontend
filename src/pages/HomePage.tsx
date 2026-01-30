import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Plan = "free" | "plus" | "pro";

const OwlIcon = ({ size, color = "white" }: { size: number | string, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 43349.2 43349.2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} d="M26970.1 19014.4c104.8,86.4 49.7,36.4 156,159.4 285.1,329.7 354.7,604.9 1001.9,871.9 500.2,206.4 1166.1,165 1651.1,-66.1 1660.4,-791.1 852.3,-2776.1 818.5,-3030.9l924.8 -387.7c307.7,865.6 635.8,1562.5 274.2,2684.6 -966.1,2998.4 -5195,2319.1 -5517.8,258.7l691.3 -489.9zm-5307.2 10577.6c170.3,-226 1765.2,-3119.2 1824.4,-3336.8 105.7,-387.7 -1185.8,-2585.5 -1609,-3109.2l-215.4 -210.9c-239.7,201.4 -1940.7,2834.7 -1858,3245.5l1752.9 3299.3c12.9,16.1 40.6,43.7 51.5,56.5 11.1,13 34.3,38.5 53.6,55.6zm-7721.3 -921.6c188.4,142 2767.6,1090.4 4310.1,2134.3 691.4,467.9 1235.6,888.2 1782.3,1459.2 291.4,304.1 532.2,522.2 832.9,840.4 143.3,151.6 223.1,203.7 393.5,387.9 233.1,251.9 124.8,227.9 402.5,413.3 279.4,-223.2 560.2,-601 812.3,-884.6 2692.1,-3028.2 6451.2,-3992.9 6938.2,-4350.5 -737.2,-284.4 -1793.7,-321.2 -2723.2,-701.8 -791.3,-324 -1680.5,-945.5 -2282.8,-1158.4l-2689.5 4196c-7.9,-16.6 -35.9,36.1 -89.6,74.7l-2694.8 -4269.6c-580.1,161.7 -1504,859.9 -2286.5,1166.9 -1361.9,534.4 -2265.7,514.5 -2705.4,692.2zm16812.2 7412.6c1618.8,-1271.8 2753.9,-1990.2 4025.9,-4025.2 951,-1521.4 1858.9,-3864.9 1898.4,-6119.6 -325.9,125.8 -651.1,487.1 -988.4,738.4 -2456.3,1830.5 -4976.2,1694.9 -7727.9,4362 -2052.6,1989.4 -4082.7,6683.1 -4336.6,9515.9 2188.7,-419.2 4967.7,-2897.8 6129.8,-4969.7l926.2 -1827.1c246.4,-510.6 267.3,-431.5 416.8,-468.5 318.7,1077.4 -303.1,1998.8 -344.2,2793.8zm-11064.8 4450.1c-49.6,-1161.1 -1123,-4291.7 -1568.8,-5275.5 -1568.3,-3460.5 -3307.1,-5403.7 -6950.7,-6807.5 -3622.8,-1395.8 -3970.1,-2237.5 -4488.1,-2442.2 61.7,3942.3 2817.6,8482.6 5934.2,10098.2 -102.8,-808.8 -682.7,-1732.7 -387.9,-2794.3 228.3,27.7 211.7,-23.8 450.3,511 95.1,213 187.1,392 289.5,593.3 224.6,441.8 396.4,834.8 635.5,1233.1 1311.6,2184.7 3699.4,4297.5 6086,4883.9zm-2632.7 -20904.7c-665.4,1322.8 -2458.1,2347.9 -4255.9,1196.2 -1770.5,-1134.4 -1708.6,-3554.2 -865.5,-4297.8l814.9 358.1c-54.6,360.6 -870.8,2185 749.4,3044.2 1404,744.6 2247.6,-180.4 2856.4,-941.4 332.1,171.6 490.9,232.4 700.7,640.7zm-9566.9 -10004.8c-1297.3,-204.9 -2275,-1415.3 -2619.6,-1600.6 105.3,1057.1 483,1759.5 993.2,2441 339.5,453.5 457.3,540.4 897.2,873 338,255.5 785.5,501 1022.2,709.8 -315.5,877.4 -1946.8,2433 -2439.8,5713.6 -1514.5,10079.6 9906.1,11987.7 12519.4,8066.6 -2250.5,327 -3098.7,723.8 -5519.2,70 -5093.7,-1375.9 -6549.6,-6576.1 -4210.9,-10952 114.2,-213.6 158.1,-306.9 282.8,-501.3 32,-50.1 119.6,-180.1 166.2,-229.9 188.4,-201.1 -7.4,-53.4 240.5,-198 479.2,838.2 973.5,1174.3 1685.1,1730.1l275.1 246.1c-2113.3,4465.2 2094.7,7730.6 5464.1,6082.1 436.2,-213.5 862.3,-668 1152.9,-735.3 237.3,1135 -122.5,1840.4 -308.2,2827.3 308.4,-128.8 139.9,-25.5 407.6,-255.7 968.2,-833 1329.3,-2310.5 1002.1,-3573 -632.3,-2440.6 -4049,-3697.8 -6128.5,-4684.7 -1079.1,-512.2 -2939,-1216.8 -3384.2,-2019.5 46,-327.6 174,-581.1 390.2,-789.9 1181.5,336.7 5844.2,3200.1 6819.4,3898.2 1218.1,872 1804.8,1423.1 2864.2,2441.7 844.6,812.2 2102.3,2375 2601.7,2821.5 234.8,-130.3 2026.1,-2278.5 2541.9,-2782.3 1759.2,-1718.1 3878,-3325.7 6160.8,-4552.5 579.6,-311.4 3079,-1735.3 3582.7,-1825l414.8 767.4c-1647.4,2038.3 -8704.2,3246.2 -9541,6821.5 -394.1,1683.7 375.8,3312.3 1428.8,3778.7 -269.8,-1047.4 -562.2,-1566.9 -345.8,-2894.6 504.5,168.2 834.7,1014.6 2636.4,1173.4 2143.2,188.8 4086.6,-1240.1 4518.6,-3349.7 315.1,-1538.9 -143.8,-2074.7 -541.7,-3149.6 147.7,-217.7 786.2,-643.9 1051,-869 413.4,-351.3 627.4,-670.7 949.3,-1083.9 906.7,496.3 3231.1,5910.2 356.1,9365.9 -1577.3,1895.8 -3905.8,2887.6 -6627.7,2834.9 -1034.1,-20.1 -2047,-398.5 -2813.7,-402.2 3047.9,3305.1 8749.8,1989.4 11221.6,-1436.9 2353.3,-3262.1 1704.9,-7704.6 -341.5,-11070.7 -254,-417.8 -616.5,-854.7 -766.5,-1269.5 271.7,-327.7 2733.7,-1393.1 2918.5,-4025.7 -417.1,297 -695.8,612.5 -1204.2,949.1 -425.1,281.4 -895.2,502.5 -1423.1,678.5 177.9,-408.1 1309.3,-1165.8 2229.8,-2814.5 662.6,-1186.8 1025,-2425.9 1106.6,-4053.4 -21.5,15.4 -52,15.2 -61.2,50.4l-799.7 1001.3c-2448.9,2729.9 -4487.2,3410.9 -7612.4,5654.2 -790,567.1 -1359.3,1050.4 -2061.6,1672.2 -1468.9,1300.7 -2390.9,2350.6 -3565.7,4005.7 -224.7,316.7 -1323.1,2140.9 -1503.1,2264.3 557.9,-2415.8 2506.3,-5245.7 4224.4,-6914.1 286.2,-277.8 658.3,-573.8 1018.1,-851.2 304,-234.5 878.8,-621.7 1102.4,-860.1 -1243.7,-836.8 -6362.5,-1231.3 -8252.9,-1226.4 -2252.3,5.7 -4299.5,204.2 -6450.7,671 -341.4,74 -646,144.7 -954.5,224.3 -138.2,35.7 -363.7,89.4 -467.7,124.3 -218.5,73 -49.7,-0.2 -207.8,83.4 -137.5,72.8 -110.6,63.4 -173.9,123.4 770.7,705.3 1898.4,1278.4 2986.4,2613.4 291.2,357.3 525.2,618.8 837.4,1030.9 773.4,1020.7 2215.5,3465.7 2523.9,4972 -1130.3,-1174.2 -1650.5,-3446.8 -6011.7,-7085.4 -2041.9,-1703.6 -5376,-3426.3 -7264.3,-5023 -926.4,-783.2 -2207.1,-2410.5 -2304.8,-2494.2 -26.3,2180 862.3,3928.8 2082.3,5469.5 391.9,495 946,924.3 1231.9,1323.1z" />
  </svg>
);

export default function HomePage() {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<Plan>(() => (localStorage.getItem("glai_plan") as Plan) || "free");
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const theme = useMemo(() => ({
    bgBase: "#0D1B2A", bgInner: "#1B263B",
    freeColor: "#8E9AAF", plusColor: "#00B4FF", proColor: "#D4AF37",
    glassBorder: "rgba(255, 255, 255, 0.12)"
  }), []);

  const aiAccentColor = useMemo(() => {
    if (currentPlan === "pro") return theme.proColor;
    if (currentPlan === "plus") return theme.plusColor;
    return theme.freeColor;
  }, [currentPlan, theme]);

  const savePlan = (plan: Plan) => {
    setCurrentPlan(plan);
    localStorage.setItem("glai_plan", plan);
    setIsSubModalOpen(false);
  };

  return (
    <main style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      background: `radial-gradient(circle at 50% 20%, ${theme.bgInner} 0%, ${theme.bgBase} 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;900&display=swap');
        
        @keyframes avatarPulseHome {
          0% { box-shadow: 0 0 0 0px ${aiAccentColor}44; }
          70% { box-shadow: 0 0 0 20px ${aiAccentColor}00; }
          100% { box-shadow: 0 0 0 0px ${aiAccentColor}00; }
        }
        @keyframes pulseA {
          0%, 100% { box-shadow: 0 0 8px rgba(0, 180, 255, 0.15); border-color: rgba(0, 180, 255, 0.25); }
          50% { box-shadow: 0 0 28px rgba(0, 180, 255, 0.55); border-color: rgba(0, 180, 255, 0.85); }
        }
        @keyframes pulseB {
          0%, 100% { box-shadow: 0 0 28px ${aiAccentColor}55; border-color: ${aiAccentColor}99; }
          50% { box-shadow: 0 0 8px ${aiAccentColor}11; border-color: ${aiAccentColor}22; }
        }
        @keyframes pulseFreeB {
          0%, 100% { box-shadow: 0 0 15px rgba(142, 154, 175, 0.35); border-color: rgba(142, 154, 175, 0.45); }
          50% { box-shadow: 0 0 4px rgba(142, 154, 175, 0.1); border-color: rgba(142, 154, 175, 0.15); }
        }
        .avatar-home-pulse { animation: avatarPulseHome 2.5s infinite; }
        .mode-card:active { transform: scale(0.96); }
        .pulse-hellas-swing { animation: pulseA 4s infinite ease-in-out; }
        .pulse-dynamic-swing { animation: pulseB 4s infinite ease-in-out; }
        .pulse-free-swing { animation: pulseFreeB 4s infinite ease-in-out; }
        .logo-glow { filter: drop-shadow(0 0 10px ${aiAccentColor}66); }
        
        .vertical-menu-trigger {
          position: fixed; left: 30px; top: 50%; transform: translateY(-50%) rotate(-90deg);
          transform-origin: left center; cursor: pointer; display: flex; alignItems: center; gap: 20px;
          z-index: 100; transition: all 0.3s ease;
        }
        .vertical-menu-trigger:hover { color: ${aiAccentColor} !important; }
        .vertical-line { width: 40px; height: 1px; background: white; opacity: 0.3; transition: all 0.3s; }
        .vertical-menu-trigger:hover .vertical-line { width: 60px; background: ${aiAccentColor}; opacity: 1; }
      `}</style>

      {/* Вертикальный триггер МЕНЮ */}
      <div className="vertical-menu-trigger" onClick={() => setIsMenuOpen(true)}>
        <span style={{ color: "white", fontSize: "11px", fontWeight: 900, letterSpacing: "5px", textTransform: "uppercase" }}>Инфо</span>
        <div className="vertical-line" />
      </div>

      {/* Header */}
      <header style={{ width: "100%", padding: "40px 30px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
           <div className="logo-glow"><OwlIcon size="42px" color={aiAccentColor} /></div>
           <div style={{ width: "2px", height: "30px", background: `linear-gradient(to bottom, transparent, ${aiAccentColor}, transparent)`, opacity: 0.6 }} />
           <div style={{ fontSize: 24, fontWeight: 950, color: "white", letterSpacing: "6px" }}>
             GL<span style={{ color: aiAccentColor, fontWeight: 400 }}>Ai</span>
           </div>
        </div>
        
        <div onClick={() => setIsSubModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: "20px", cursor: "pointer" }}>
           <div style={{ textAlign: "right" }}>
             <div style={{ fontSize: 14, fontWeight: 900, color: "white", opacity: 0.8, letterSpacing: "4px", marginBottom: "4px" }}>CORE</div>
             <div style={{ fontSize: 16, fontWeight: 950, color: aiAccentColor, letterSpacing: "2.5px" }}>{currentPlan.toUpperCase()}</div>
           </div>
           <div className="avatar-home-pulse" style={{ width: 52, height: 52, borderRadius: "50%", border: `3px solid ${aiAccentColor}`, background: "#1a1a1a" }} />
        </div>
      </header>

      {/* Side Menu Drawer (Left) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(15px)", zIndex: 1000 }} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 200 }} style={{
              position: "fixed", left: 0, top: 0, height: "100vh", width: "100%", maxWidth: "550px",
              background: "#080E15", borderRight: `1px solid ${theme.glassBorder}`, zIndex: 1001,
              padding: "80px 60px", overflowY: "auto", boxShadow: "20px 0 60px rgba(0,0,0,0.6)"
            }}>
              <div onClick={() => setIsMenuOpen(false)} style={{ position: "absolute", top: 40, right: 40, cursor: "pointer", color: "white", fontSize: "32px", fontWeight: 100 }}>×</div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
                <section>
                  <div style={{ fontSize: "11px", color: aiAccentColor, fontWeight: 900, letterSpacing: "6px", marginBottom: "20px" }}>ETHOS</div>
                  <h2 style={{ color: "white", fontSize: "42px", fontWeight: 200, marginBottom: "35px", lineHeight: 1.1 }}>Наследие <br/>Мудрости</h2>
                  <div style={{ fontFamily: 'Inter', fontWeight: 200, color: "#FFFFFF", lineHeight: 2, fontSize: "16px" }}>
                    <p style={{ marginBottom: "30px" }}>
                      Название <span style={{ color: aiAccentColor, fontWeight: 400 }}>GLAi</span> — это симбиоз прошлого и будущего. 
                      Корни уходят в <strong style={{ fontWeight: 400 }}>γλαύξ</strong> (Glaux) — античное имя совы, хранительницы знаний Афины.
                    </p>
                    <p>
                      Мы соединили этот «Золотой фундамент» мудрости с передовыми технологиями <span style={{ color: aiAccentColor }}>Artificial Intelligence</span>.
                    </p>
                  </div>
                </section>
                <nav style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                  <div style={{ fontSize: "11px", color: aiAccentColor, fontWeight: 900, letterSpacing: "6px" }}>МЕНЮ</div>
                  {["ФИЛОСОФИЯ ПРОЕКТА", "ТЕХНОЛОГИЧЕСКИЙ СТЕК", "ГРЕЦИЯ И ИННОВАЦИИ", "БЕЗОПАСНОСТЬ ДАННЫХ", "КОНТАКТЫ"].map((item) => (
                    <div key={item} style={{ color: "white", fontSize: "18px", fontWeight: 200, letterSpacing: "3px", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>{item}</div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div style={{ textAlign: "center", width: "100%", maxWidth: "450px", padding: "0 20px" }}>
        <h1 style={{ color: "white", fontSize: "42px", fontWeight: 950, marginBottom: "15px", letterSpacing: "-1.5px" }}>Начните работу</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "55px", fontSize: "18px", fontWeight: 300 }}>Активируйте когнитивный контур системы</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* HELLAS */}
          <div className="mode-card pulse-hellas-swing" onClick={() => navigate("/chat/hellas")} style={{
            background: "rgba(255,255,255,0.02)", padding: "32px", borderRadius: "30px", border: "1px solid rgba(0, 180, 255, 0.25)",
            cursor: "pointer", textAlign: "left"
          }}>
            <div style={{ fontSize: 24, fontWeight: 950, color: "white", marginBottom: "8px", letterSpacing: "5px" }}>
              GL<span style={{ color: theme.plusColor, fontWeight: 400 }}>Ai</span> HELLAS
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>Специализированный контур для Греции</div>
          </div>

          {/* GLOBAL */}
          <div className={`mode-card ${currentPlan === 'plus' ? 'pulse-plus-swing' : currentPlan === 'pro' ? 'pulse-pro-swing' : 'pulse-free-swing'}`} onClick={() => navigate("/chat/global")} style={{
            background: "rgba(255,255,255,0.02)", padding: "32px", borderRadius: "30px", 
            border: currentPlan === 'free' ? "1px solid rgba(142, 154, 175, 0.25)" : `1px solid ${aiAccentColor}44`,
            cursor: "pointer", textAlign: "left"
          }}>
            <div style={{ fontSize: 24, fontWeight: 950, color: "white", marginBottom: "8px", letterSpacing: "5px" }}>
              GL<span style={{ color: aiAccentColor, fontWeight: 400 }}>Ai</span> GLOBAL
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>Универсальный интеллект для любых задач</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ width: "100%", paddingBottom: "45px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "90px", height: "3px", background: aiAccentColor, borderRadius: "3px", marginBottom: "25px", opacity: 0.5 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.25)", fontSize: "11px", fontWeight: 900, letterSpacing: "3px", textTransform: "uppercase" }}>
          <span>© 2026 GLAi</span>
          <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
          <span style={{ color: aiAccentColor, opacity: 0.75 }}>GLAI.GR</span>
        </div>
      </footer>

      {/* Subscription Modal */}
      <AnimatePresence>
        {isSubModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} style={{ background: theme.bgInner, width: "100%", maxWidth: "420px", borderRadius: "40px", padding: "40px", border: `1px solid ${theme.glassBorder}` }}>
              <h2 style={{ color: "white", marginBottom: "30px", textAlign: "center", fontSize: "26px", fontWeight: 950 }}>Тарифный план</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {(["free", "plus", "pro"] as Plan[]).map(p => (
                  <div key={p} onClick={() => savePlan(p)} style={{ padding: "24px", borderRadius: "24px", border: `2px solid ${currentPlan === p ? (theme as any)[p+'Color'] : "rgba(255,255,255,0.05)"}`, cursor: "pointer", background: currentPlan === p ? `${(theme as any)[p+'Color']}15` : "transparent" }}>
                    <div style={{ color: (theme as any)[p+'Color'], fontWeight: 950, fontSize: 18, letterSpacing: "2px" }}>{p.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsSubModalOpen(false)} style={{ width: "100%", marginTop: "35px", padding: "20px", borderRadius: "20px", background: "white", color: "black", border: "none", fontWeight: 950, fontSize: 16 }}>Закрыть</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}