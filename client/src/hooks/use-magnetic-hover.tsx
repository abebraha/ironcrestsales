import { useRef, useEffect, useState } from "react";

export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate distance from center
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = Math.max(rect.width, rect.height);
      
      // Only apply effect if mouse is close enough
      if (distance < maxDistance * 1.5) {
        const pullX = (distanceX / maxDistance) * strength * 10;
        const pullY = (distanceY / maxDistance) * strength * 10;
        setPosition({ x: pullX, y: pullY });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return { ref, position };
}