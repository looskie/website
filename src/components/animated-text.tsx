import { motion, type Variants } from "framer-motion";
import React from "react";

const CHARACTER_ANIMATION = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: (charCount: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: charCount === 1 ? 0.25 : 1, // if its just like "&", make the duration rlly small
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
} as const satisfies Variants;

type IAnimatedTextProps = {
  text: string;
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  artificialDelay?: number;
};

const AnimatedText = ({
  element,
  className,
  text,
  artificialDelay,
}: IAnimatedTextProps) => {
  const Children = text.split(" ").map((word, index) => (
    <motion.span
      // biome-ignore lint/suspicious/noArrayIndexKey: cry harder
      key={index}
      className="inline-block mr-[0.25em] whitespace-nowrap will-change-transform"
      aria-hidden="true"
      initial="initial"
      animate="animate"
      transition={{
        delayChildren: index * 0.25 + (artificialDelay ?? 0),
        staggerChildren: 0.025,
      }}
    >
      {[...word].map((character, index) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: cry harder
          key={index}
          className="inline-block"
          aria-hidden="true"
          custom={word.length}
          variants={CHARACTER_ANIMATION}
        >
          {character}
        </motion.span>
      ))}
    </motion.span>
  ));

  return React.createElement(element, { className }, Children);
};

export default AnimatedText;
