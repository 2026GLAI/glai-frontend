import { useEffect, useState, memo } from "react";

// Компонент полностью очищен от логотипа и анимаций
export const SplashScreen = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Уменьшаем задержку, так как бренда больше нет — просто ждем готовности кадра
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: "fixed", 
      inset: 0, 
      zIndex: 9999,
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      // Статичный фон, идентичный HomePage
      background: "radial-gradient(circle at 50% 40%, #1B263B 0%, #0D1B2A 100%)",
      pointerEvents: "none"
    }}>
      {/* Контент (сова и стили анимации @keyframes) удален полностью */}
    </div>
  );
});

export default SplashScreen;