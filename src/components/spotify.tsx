import { Marquee } from "@/components/marquee";
import { DISCORD_SNOWFLAKE } from "@/utils/constants";
import {
  AnimatePresence,
  motion,
  MotionNodeAnimationOptions,
} from "motion/react";
import { useLanyardWS } from "use-lanyard";

const EQUALIZER_DELAYS = [0, 0.15, 0.3];

const EQUALIZER_ANIMATION = {
  animate: {
    scaleY: [2, 10, 4, 8, 2].map((h) => h / 10), // the max height is tw's 2.5 = 10px
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    layout: {
      type: "tween",
      ease: "easeInOut",
    },
  },
} as const satisfies MotionNodeAnimationOptions;

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
        <motion.div
          animate={SPOTIFY_PILL_ANIMATION.animate}
          initial={SPOTIFY_PILL_ANIMATION.initial}
          exit={SPOTIFY_PILL_ANIMATION.initial}
          transition={SPOTIFY_PILL_ANIMATION.transition}
          className="will-change-[transform,opacity,filter] grid" // for whatever reason, this needs to be grid... otherwise safari has a spazm, bit too lazy to find out why...
        >
          <motion.div
            layout
            style={{
              borderRadius: 9999,
            }}
            className="absolute -top-10 p-0.5 overflow-hidden bg-stone-200 min-w-48 max-w-[calc(100vw-3rem)] sm:max-w-md rounded-[9999px]"
          >
            <AnimatePresence mode="popLayout">
              {data.spotify.album_art_url ? (
                <motion.img
                  key={data.spotify.album_art_url}
                  initial={GLOW_FADE.initial}
                  animate={GLOW_FADE.animate}
                  exit={GLOW_FADE.initial}
                  transition={GLOW_FADE.transition}
                  className="absolute inset-0 h-full w-full object-cover scale-150 blur-3xl saturate-200 will-change-[transform,opacity]"
                  src={data.spotify.album_art_url}
                  alt=""
                />
              ) : null}
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-stone-200/50 to-stone-200" />

            <motion.div
              layout
              style={{
                borderRadius: 9999,
              }}
              className="relative flex gap-2 items-center bg-stone-100 overflow-hidden rounded-[9999px]"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={data.spotify.song}
                  className="flex items-center min-w-0 pl-2 py-2 will-change-[transform,opacity,filter]"
                  animate={SONG_CHANGE.animate}
                  initial={SONG_CHANGE.initial}
                  exit={SONG_CHANGE.initial}
                  transition={SONG_CHANGE.transition}
                >
                  <div className="shrink-0">
                    {data.spotify.album_art_url ? (
                      <>
                        <motion.div layout className="relative z-10">
                          <img
                            className="size-6 rounded-lg"
                            src={data.spotify.album_art_url}
                            alt={`${data.spotify.song} by ${data.spotify.artist}`}
                          />
                        </motion.div>

                        <img
                          className="absolute size-18 left-0 top-0 z-0 blur-3xl"
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
                    <motion.span
                      layout
                      className="text-stone-500 text-sm pl-2 whitespace-nowrap"
                    >
                      {data.spotify.artist}
                    </motion.span>
                  </Marquee>
                </motion.div>
              </AnimatePresence>

              <div className="relative flex items-center gap-0.5 h-[stretch] ml-auto pr-2 bg-stone-100">
                <div className="absolute right-full h-full w-3 bg-linear-to-r from-transparent to-stone-100 pointer-events-none" />
                {EQUALIZER_DELAYS.map((delay, i) => (
                  <motion.div
                    layout
                    key={i}
                    className="bg-green-500 w-0.5 rounded-full origin-center will-change-transform h-2.5"
                    animate={EQUALIZER_ANIMATION.animate}
                    transition={{
                      ...EQUALIZER_ANIMATION.transition,
                      delay,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
