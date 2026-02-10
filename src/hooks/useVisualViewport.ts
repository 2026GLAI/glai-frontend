import { useState, useEffect } from "react";

export function useVisualViewport() {
  const [viewport, setViewport] = useState({
    height: window.innerHeight,
    offsetTop: 0,
  });

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleVisualUpdate = () => {
      // Берем высоту именно ВИДИМОЙ области
      const vv = window.visualViewport!;
      setViewport({
        height: vv.height,
        offsetTop: vv.offsetTop,
      });

      // Задача №1: Жестко прижимаем страницу к верху при каждом изменении вьюпорта
      // Это предотвращает появление серой полосы после закрытия клавиатуры
      window.scrollTo(0, 0);
    };

    window.visualViewport.addEventListener("resize", handleVisualUpdate);
    window.visualViewport.addEventListener("scroll", handleVisualUpdate);

    // Первичный вызов для калибровки при монтировании
    handleVisualUpdate();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleVisualUpdate);
      window.visualViewport?.removeEventListener("scroll", handleVisualUpdate);
    };
  }, []);

  return viewport;
}