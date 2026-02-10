import { useState, useMemo } from "react";

export type Plan = "free" | "plus" | "pro";

export const usePlan = () => {
  const [currentPlan, setCurrentPlan] = useState<Plan>(
    () => (localStorage.getItem("glai_plan") as Plan) || "free"
  );

  const theme = useMemo(() => ({
    bgBase: "#0D1B2A", 
    bgInner: "#1B263B",
    freeColor: "#8E9AAF", 
    plusColor: "#00B4FF", 
    proColor: "#D4AF37",
    // Добавлены критически важные поля для рендеринга ChatPage
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
    setCurrentPlan(plan);
    localStorage.setItem("glai_plan", plan);
  };

  return { currentPlan, savePlan, aiAccentColor, theme };
};