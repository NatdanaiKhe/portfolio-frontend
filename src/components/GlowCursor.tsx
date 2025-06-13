import { useEffect, useRef } from "react";

export default function GlowingCursor() {
  const dotRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const posX = useRef(0);
  const posY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const updatePosition = () => {
      // Linear interpolation for smoothness
      posX.current += (mouseX.current - posX.current) * 0.15;
      posY.current += (mouseY.current - posY.current) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posX.current - 64}px, ${posY.current - 64}px, 0)`;
      }

      requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-50 h-32 w-32 rounded-full bg-cyan-400 opacity-30 blur-2xl "
    />
  );
}
