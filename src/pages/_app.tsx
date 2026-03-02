import AnimatedText from "@/components/animated-text";
import { Spotify } from "@/components/spotify";
import "@/globals.css";
import { Analytics } from "@vercel/analytics/next";
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
import Head from "next/head";
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

const SITE_URL = "https://looskie.com";
const SITE_TITLE = "cody";
const SITE_DESCRIPTION = "my hole in the internet.";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cody Miller",
  url: SITE_URL,
  jobTitle: "Software Engineer & Designer",
  sameAs: ["https://github.com/looskie"],
});

export default function App({ Component, pageProps, router }: AppProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useMotionValue(0);
  const spring = useSpring(progress, NAME_SPRING_CONFIG);
  const [expanded, setExpanded] = useState(false);

  const fontSize = useTransform(spring, STEP_INDICES, STEP_SIZES);
  const fontSizeRem = useTransform(
    fontSize,
    (v) => `clamp(${(v * 0.3).toFixed(2)}rem, ${(v * 3.5).toFixed(2)}vw, ${v}rem)`,
  );

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
    return (
      <>
        <Analytics />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <main className="flex min-h-screen min-w-screen overflow-hidden">
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:site_name" content="Cody Miller" />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:width" content="1248" />
        <meta property="og:image:height" content="702" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD }}
        />
      </Head>

      <motion.div className="flex flex-1 bg-stone-200">
        <div className="flex-1 flex justify-center px-6 py-[10vh] md:py-[15vh] overflow-y-auto">
          <LayoutGroup>
            <motion.div
              layout
              className="relative flex flex-col items-start w-full md:w-auto max-w-md md:max-w-none"
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
      <Analytics />
    </main>
  );
}
