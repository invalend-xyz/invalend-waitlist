import { useRef, useState, useEffect, useCallback } from "react";

interface UseAutoScrollProps {
  speed?: number; // Pixels per frame
  contentHeight: number;
}

export const useAutoScroll = ({
  speed = 0.5,
  contentHeight,
}: UseAutoScrollProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef<number | undefined>(undefined);
  const scrollRef = useRef<number>(0);

  const animate = useCallback(() => {
    if (!isPaused && contentHeight > 0) {
      // Logic for infinite scroll: increment position
      scrollRef.current += speed;

      // If we've scrolled past the content height, loop back
      // We assume content is duplicated, so we reset to 0 smoothly
      if (scrollRef.current >= contentHeight) {
        scrollRef.current = 0;
      }

      setScrollY(scrollRef.current);
    }
  }, [speed, isPaused, contentHeight]);

  useEffect(() => {
    const tick = () => {
      animate();
      requestRef.current = requestAnimationFrame(tick);
    };
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const togglePause = (pause: boolean) => {
    setIsPaused(pause);
  };

  return { scrollY, togglePause };
};
