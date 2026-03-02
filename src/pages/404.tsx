import AnimatedText from "@/components/animated-text";
import { motion, type MotionNodeAnimationOptions } from "motion/react";
import Head from "next/head";
import Link from "next/link";

const ELEMENT_ANIMATION = {
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
    delay: 0.3,
  },
} as const satisfies MotionNodeAnimationOptions;

export default function NotFound() {
  return (
    <main className="flex min-h-screen min-w-screen overflow-hidden bg-stone-100">
      <Head>
        <title>404 — Cody Miller</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex items-center justify-center bg-stone-200 w-full">
        <div className="flex flex-col items-start">
          <AnimatedText
            className="text-6xl font-bold"
            element="h1"
            text="404"
          />

          <motion.p
            className="text-stone-500 mt-2 will-change-[transform,opacity,filter]"
            animate={ELEMENT_ANIMATION.animate}
            initial={ELEMENT_ANIMATION.initial}
            transition={ELEMENT_ANIMATION.transition}
          >
            this page doesn't exist
          </motion.p>

          <motion.div
            className="will-change-[transform,opacity,filter]"
            style={{ willChange: "transform, opacity, filter" }}
            animate={ELEMENT_ANIMATION.animate}
            initial={ELEMENT_ANIMATION.initial}
            transition={{ ...ELEMENT_ANIMATION.transition, delay: 0.5 }}
          >
            <Link
              href="/"
              className="text-sm text-stone-400 hover:text-stone-600 mt-4 inline-block"
            >
              go home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
