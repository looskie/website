import AnimatedText from "@/components/animated-text";
import { WORK_ITEMS } from "@/utils/constants";
import {
  LayoutGroup,
  motion,
  MotionNodeAnimationOptions,
  Transition,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAME_WRAPPER_SPRING_CONFIG = {
  type: "spring",
  stiffness: 80,
  damping: 20,
} as const satisfies Transition;

const NAME_SPRING_CONFIG = {
  stiffness: 30,
  damping: 15,
  mass: 3,
} as const satisfies Transition;

const WORK_ANIMATION = {
  initial: {
    opacity: 0,
    y: 5,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  transition: {
    duration: 1,
    ease: [0.2, 0.65, 0.3, 0.9],
  },
} as const satisfies MotionNodeAnimationOptions;

const WORK_BG_LAYOVER_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 30,
} as const satisfies Transition;

const ANIMATION_STEPS = [
  { font: "Redaction 100", weight: 700, size: 16 },
  { font: "Redaction 10", weight: 400, size: 13 },
  { font: "Redaction 70", weight: 700, size: 10 },
  { font: "Redaction", weight: 400, size: 8 },
  { font: "Redaction 35", weight: 700, size: 6.5 },
  { font: "Redaction 100", weight: 400, size: 5.2 },
  { font: "Redaction 20", weight: 400, size: 4.2 },
  { font: "Redaction 50", weight: 700, size: 3.75 },
] as const satisfies Array<{
  font: string;
  weight: number;
  size: number;
}>;

const LAST_STEP = ANIMATION_STEPS.length - 1;
const STEP_INDICES = ANIMATION_STEPS.map((_, i) => i);
const STEP_SIZES = ANIMATION_STEPS.map((s) => s.size);

export default function Home() {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useMotionValue(0);
  const spring = useSpring(progress, NAME_SPRING_CONFIG);
  const [expanded, setExpanded] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);

  const fontSize = useTransform(spring, STEP_INDICES, STEP_SIZES);
  const fontSizeRem = useTransform(fontSize, (v) => `${v}rem`);

  useMotionValueEvent(spring, "change", (v) => {
    if (!ref.current) {
      return;
    }

    const i = Math.max(0, Math.min(Math.round(v), LAST_STEP));
    ref.current.style.setProperty(
      "font-family",
      `"${ANIMATION_STEPS[i].font}"`,
      "important",
    );
    ref.current.style.setProperty(
      "font-weight",
      String(ANIMATION_STEPS[i].weight),
      "important",
    );

    if (v > LAST_STEP) {
      setExpanded(true);
    }
  });

  useEffect(() => {
    progress.set(LAST_STEP);
  }, [progress]);

  return (
    <main className="flex min-h-screen min-w-screen overflow-hidden p-2 bg-stone-100">
      <div className="flex items-center justify-center bg-stone-200 w-full rounded-xl">
        <LayoutGroup>
          <motion.div
            layout
            className="flex flex-col items-start"
            transition={NAME_WRAPPER_SPRING_CONFIG}
          >
            <motion.h1
              layout
              ref={ref}
              className="font-bold whitespace-nowrap will-change-transform"
              style={{ fontSize: fontSizeRem }}
            >
              cody
            </motion.h1>

            {expanded ? (
              <>
                <AnimatedText text="software engineer & designer" element="p" />

                <AnimatedText
                  className="text-xl mt-4 font-bold"
                  element="h2"
                  text="wrk"
                  artificialDelay={0.3}
                />

                <div
                  className="flex flex-col gap-3 mt-3"
                  onMouseLeave={() => setHoveredWork(null)}
                >
                  {WORK_ITEMS.map((item, i) => (
                    <motion.button
                      key={item.company}
                      className="relative flex flex-col items-start will-change-transform -mx-2 px-2 -my-1 py-1 text-left"
                      initial={WORK_ANIMATION.initial}
                      animate={WORK_ANIMATION.animate}
                      transition={{
                        ...WORK_ANIMATION.transition,
                        delay: 0.5 + i * 0.15,
                      }}
                      onMouseEnter={() => setHoveredWork(item.company)}
                    >
                      {hoveredWork === item.company ? (
                        <motion.div
                          layoutId="work-hover"
                          className="absolute inset-0 bg-stone-300/30 border border-stone-300/50 rounded-md"
                          transition={WORK_BG_LAYOVER_TRANSITION}
                        />
                      ) : null}
                      <div className="relative flex items-baseline justify-between gap-8 w-full">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-stone-700">
                            {item.company}
                          </span>
                          <span className="text-sm text-stone-500">
                            {item.role}
                          </span>
                        </div>
                        <span className="text-sm text-stone-400 whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                      <span className="relative text-xs text-stone-600">
                        {item.about}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </>
            ) : null}
          </motion.div>
        </LayoutGroup>
      </div>
    </main>
  );
}
