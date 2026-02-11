import { useState, useMemo, useEffect } from "react";

export type Plan = "free" | "plus" | "pro";

export const usePlan = () => {
  const [currentPlan, setCurrentPlan] = useState<Plan>(
    () => (localStorage.getItem("glai_plan") as Plan) || "free"
  );

  // СЛУШАТЕЛЬ ОБНОВЛЕНИЙ: заставляет Avatar перерисоваться
  useEffect(() => {
    const syncPlan = () => {
      const saved = (localStorage.getItem("glai_plan") as Plan) || "free";
      setCurrentPlan(saved);
    };

    window.addEventListener("glai_plan_updated", syncPlan);
    return () => window.removeEventListener("glai_plan_updated", syncPlan);
  }, []);

  const theme = useMemo(() => ({
    bgBase: "#0D1B2A", 
    bgInner: "#1B263B",
    freeColor: "#007BFF", // Насыщенный синий для вашего аватара
    plusColor: "#00B4FF", 
    proColor: "#FFD700",  // Насыщенное золото для вашего аватара
    aiText: "#C9D1D9",
    errColor: "#FF4D4D",
    glassBorder: "rgba(255, 255, 255, 0.12)"
  }), []);

  const aiAccentColor = useMemo(() => {
    if (currentPlan === "pro") return theme.proColor;
    if (currentPlan === "plus") return theme.plusColor;
    return theme.freeColor;
  }, [currentPlan, theme]);

  const savePlan = (plan: Plan) => {
    localStorage.setItem("glai_plan", plan);
    setCurrentPlan(plan);
    // СИГНАЛ: Говорим аватару, что пора менять цвет
    window.dispatchEvent(new Event("glai_plan_updated"));
  };

  return { currentPlan, savePlan, aiAccentColor, theme };
};