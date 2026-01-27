import { useState, useEffect } from "react";

export function useVisualViewport() {
  const [viewport, setViewport] = useState({
    height: window.innerHeight,
    offsetTop: 0,
  });

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleVisualUpdate = () => {
      // Ключевой момент: берем высоту именно ВИДИМОЙ области
      const vv = window.visualViewport!;
      setViewport({
        height: vv.height,
        offsetTop: vv.offsetTop,
      });

      // Жестко прижимаем страницу к верху при каждом изменении
      window.scrollTo(0, 0);
    };

    window.visualViewport.addEventListener("resize", handleVisualUpdate);
    window.visualViewport.addEventListener("scroll", handleVisualUpdate);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleVisualUpdate);
      window.visualViewport?.removeEventListener("scroll", handleVisualUpdate);
    };
  }, []);

  return viewport;
}