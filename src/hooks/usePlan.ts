import { useState, useMemo, useEffect } from "react";

export type Plan = "free" | "plus" | "pro";

export const usePlan = () => {
  const [currentPlan, setCurrentPlan] = useState<Plan>(
    () => (localStorage.getItem("glai_plan") as Plan) || "free"
  );

  // СЛУШАТЕЛЬ ОБНОВЛЕНИЙ: заставляет все компоненты перерисоваться мгновенно
  useEffect(() => {
    const syncPlan = () => {
      const saved = (localStorage.getItem("glai_plan") as Plan) || "free";
      setCurrentPlan(saved);
    };

    window.addEventListener("glai_plan_updated", syncPlan);
    return () => window.removeEventListener("glai_plan_updated", syncPlan);
  }, []);

  const theme = useMemo(() => ({
    // НОВЫЙ ПРЕСТИЖНЫЙ ФОН
    bgBase: "#0D121F", 
    // СКОРРЕКТИРОВАННЫЙ ВНУТРЕННИЙ ЦВЕТ (для слоев и карточек)
    bgInner: "#161B2E",
    
    freeColor: "#007BFF", // Насыщенный синий
    plusColor: "#00B4FF", 
    proColor: "#FFD700",  // Насыщенное золото
    
    aiText: "#C9D1D9",    // Оптимальный контраст для чтения
    errColor: "#FF4D4D",
    glassBorder: "rgba(255, 255, 255, 0.08)"
  }), []);

  const aiAccentColor = useMemo(() => {
    if (currentPlan === "pro") return theme.proColor;
    if (currentPlan === "plus") return theme.plusColor;
    return theme.freeColor;
  }, [currentPlan, theme]);

  const savePlan = (plan: Plan) => {
    localStorage.setItem("glai_plan", plan);
    setCurrentPlan(plan);
    // Глобальное уведомление системы о смене плана
    window.dispatchEvent(new Event("glai_plan_updated"));
  };

  return { currentPlan, savePlan, aiAccentColor, theme };
};