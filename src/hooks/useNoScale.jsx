import { useEffect } from "react";

const useNoScale = () => {
  useEffect(() => {
    const forceZoom100 = () => {
      document.body.style.zoom = "1";
      document.documentElement.style.zoom = "1";
      document.body.style.transform = "scale(1)";
      document.body.style.transformOrigin = "0 0";
    };

    const handleKeydown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.keyCode === 61 ||
          e.keyCode === 107 ||
          e.keyCode === 173 ||
          e.keyCode === 109 ||
          e.keyCode === 187 ||
          e.keyCode === 189)
      ) {
        e.preventDefault();
        forceZoom100();
      }
    };

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        forceZoom100();
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        forceZoom100();
      }
    };

    let lastTouchEnd = 0;
    const handleTouchEnd = (e) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
        forceZoom100();
      }
      lastTouchEnd = now;
    };

    forceZoom100();

    const zoomInterval = setInterval(forceZoom100, 100);

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd, false);

    const observer = new MutationObserver(forceZoom100);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
      subtree: false,
    });

    return () => {
      clearInterval(zoomInterval);
      observer.disconnect();
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
};

export default useNoScale;
