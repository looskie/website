import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

const MASK_GRADIENT =
  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);

  // measuring the dom is one of the few legitimate effect use cases
  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const measure = () => {
      const diff = content.scrollWidth - container.offsetWidth;
      setOverflow(diff > 0 ? diff : 0);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const shouldScroll = overflow > 0;

  return (
    <motion.div
      layout
      ref={containerRef}
      className={className}
      style={{
        maskImage: shouldScroll ? MASK_GRADIENT : undefined,
        WebkitMaskImage: shouldScroll ? MASK_GRADIENT : undefined,
      }}
    >
      <motion.div
        layout
        ref={contentRef}
        animate={shouldScroll ? { x: [0, -overflow] } : undefined}
        transition={
          shouldScroll
            ? {
                duration: Math.max(overflow / 20, 3), // overflow diviedd by "speed", minimum duration of 3s
                repeat: Infinity,
                repeatType: "mirror",
                ease: [0.4, 0, 0.2, 1],
                repeatDelay: 1.5,
              }
            : undefined
        }
        className="whitespace-nowrap"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
