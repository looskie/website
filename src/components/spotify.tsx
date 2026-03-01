import { DitheredImage } from "@/components/dithered-image";
import { Marquee } from "@/components/marquee";
import { DISCORD_SNOWFLAKE } from "@/utils/constants";
import { AnimatePresence, MotionNodeAnimationOptions } from "motion/react";
import { useLanyardWS } from "use-lanyard";
import { motion } from "motion/react";

const EQUALIZER_HEIGHTS = ["2px", "10px", "4px", "8px", "2px"] as const;
const EQUALIZER_DELAYS = [0, 0.15, 0.3] as const;
const EQUALIZER_DURATION = 1.5;

const SONG_CHANGE = {
  initial: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  transition: {
    duration: 0.3,
  },
} as const satisfies MotionNodeAnimationOptions;

const GLOW_FADE = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.5,
  },
} as const satisfies MotionNodeAnimationOptions;

const SPOTIFY_PILL_ANIMATION = {
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  transition: {
    type: "spring",
    stiffness: 60,
    delay: 0.8,
  },
} as const satisfies MotionNodeAnimationOptions;

export function Spotify() {
  const data = useLanyardWS(DISCORD_SNOWFLAKE);

  return (
    <AnimatePresence>
      {data?.spotify ? (
        <motion.button
          layout
          animate={SPOTIFY_PILL_ANIMATION.animate}
          initial={SPOTIFY_PILL_ANIMATION.initial}
          exit={SPOTIFY_PILL_ANIMATION.initial}
          transition={{
            ...SPOTIFY_PILL_ANIMATION.transition,
            layout: {
              type: "spring",
              stiffness: 60,
              delay: 0,
            },
          }}
          style={{ borderRadius: 9999 }}
          className="absolute -top-8 p-0.5 overflow-hidden bg-stone-200 max-w-md"
        >
          <AnimatePresence mode="popLayout">
            {data.spotify.album_art_url ? (
              <motion.img
                key={data.spotify.album_art_url}
                initial={GLOW_FADE.initial}
                animate={GLOW_FADE.animate}
                exit={GLOW_FADE.initial}
                transition={GLOW_FADE.transition}
                className="absolute inset-0 h-full w-full object-cover scale-150 blur-3xl saturate-200"
                src={data.spotify.album_art_url}
                alt=""
              />
            ) : null}
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-stone-200/50 to-stone-200" />

          <motion.div
            layout
            style={{ borderRadius: 9999 }}
            className="relative flex gap-2 items-center px-2 p-2 bg-stone-100 overflow-hidden"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={data.spotify.song}
                className="flex items-center min-w-0"
                animate={SONG_CHANGE.animate}
                initial={SONG_CHANGE.initial}
                exit={SONG_CHANGE.initial}
                transition={SONG_CHANGE.transition}
              >
                <div className="shrink-0">
                  {data.spotify.album_art_url ? (
                    <>
                      <motion.div layout className="relative z-10">
                        <DitheredImage
                          className="size-6 rounded-lg"
                          src={data.spotify.album_art_url}
                          alt={`${data.spotify.song} by ${data.spotify.artist}`}
                          resolution={128}
                        />
                      </motion.div>

                      <img
                        className="absolute size-16 left-0 top-0 z-0 blur-3xl"
                        src={data.spotify.album_art_url}
                        alt={`${data.spotify.song} by ${data.spotify.artist}`}
                      />
                    </>
                  ) : null}
                </div>
                <Marquee className="min-w-0">
                  <motion.span layout className="text-stone-800 text-sm pl-2">
                    {data.spotify.song}
                  </motion.span>
                </Marquee>
                <motion.span
                  layout
                  className="text-stone-500 text-sm shrink-0 pl-2"
                >
                  {data.spotify.artist}
                </motion.span>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-0.5 h-3">
              {EQUALIZER_DELAYS.map((delay, i) => (
                <motion.div
                  key={`wrtb-${i}`}
                  className="bg-green-500 w-0.5 rounded-full"
                  animate={{ height: EQUALIZER_HEIGHTS }}
                  transition={{
                    duration: EQUALIZER_DURATION,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
