import AnimatedText from "@/components/animated-text";
import { Spotify } from "@/components/spotify";
import "@/globals.css";
import {
  LayoutGroup,
  motion,
  type Transition,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import type { AppProps } from "next/app";
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

export default function App({ Component, pageProps, router }: AppProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useMotionValue(0);
  const spring = useSpring(progress, NAME_SPRING_CONFIG);
  const [expanded, setExpanded] = useState(false);

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

  if (router.pathname === "/404") {
    return <Component {...pageProps} />;
  }

  return (
    <main className="flex min-h-screen min-w-screen overflow-hidden p-2 bg-stone-100">
      <motion.div className="flex flex-1 bg-stone-200 rounded-xl">
        <div className="flex-1 flex justify-center py-[15vh] overflow-y-auto">
          <LayoutGroup>
            <motion.div
              layout
              className="relative flex flex-col items-start"
              transition={NAME_WRAPPER_SPRING_CONFIG}
            >
              {expanded ? <Spotify /> : null}

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
                  <AnimatedText
                    text="software engineer & designer"
                    element="p"
                  />

                  <Component {...pageProps} />
                </>
              ) : null}
            </motion.div>
          </LayoutGroup>
        </div>
      </motion.div>
    </main>
  );
}
