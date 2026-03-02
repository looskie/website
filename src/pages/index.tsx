import AnimatedText from "@/components/animated-text";
import HoverPreview from "@/components/hover-preview";
import { PROJECTS, WORK_ITEMS } from "@/utils/constants";
import getPreviewUrl from "@/utils/get-preview-url";
import {
  motion,
  type MotionNodeAnimationOptions,
  type Transition,
} from "motion/react";
import { memo, useCallback, useState } from "react";

type HoverState = {
  id: string;
  rect: DOMRect;
  previewUrl: string;
} | null;

const ITEM_ANIMATION = {
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

const ITEM_HOVER_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 30,
} as const satisfies Transition;

// precompute preview urls since items are static
const WORK_PREVIEW_URLS = new Map(
  WORK_ITEMS.map((item) => [item.slug, getPreviewUrl(item) ?? ""]),
);
const PROJECT_PREVIEW_URLS = new Map(
  PROJECTS.map((item) => [item.slug, getPreviewUrl(item) ?? ""]),
);

type ItemRowProps = {
  id: string;
  label: string;
  role: string;
  about: string;
  date?: string;
  url: string;
  isHovered: boolean;
  layoutId: string;
  delay: number;
  previewUrl: string;
  onHover: (id: string, previewUrl: string, rect: DOMRect) => void;
};

const ItemRow = memo(function ItemRow({
  id,
  label,
  role,
  about,
  date,
  url,
  isHovered,
  layoutId,
  delay,
  previewUrl,
  onHover,
}: ItemRowProps) {
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      onHover(id, previewUrl, e.currentTarget.getBoundingClientRect());
    },
    [onHover, id, previewUrl],
  );

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="relative flex flex-col items-start will-change-transform -mx-2 px-2 -my-1 py-1 text-left"
        initial={ITEM_ANIMATION.initial}
        animate={ITEM_ANIMATION.animate}
        transition={{
          ...ITEM_ANIMATION.transition,
          delay,
        }}
        onMouseEnter={handleMouseEnter}
      >
        {isHovered ? (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 bg-stone-300/30 border border-stone-300/50 rounded-md"
            transition={ITEM_HOVER_TRANSITION}
          />
        ) : null}

        <div className="relative flex items-baseline justify-between gap-2 sm:gap-8 w-full">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="font-bold text-stone-700 truncate">{label}</span>
            <span className="text-sm text-stone-500 hidden sm:inline">
              {role}
            </span>
          </div>
          {date ? (
            <span className="text-sm text-stone-400 whitespace-nowrap hidden sm:inline">
              {date}
            </span>
          ) : null}
        </div>

        <span className="relative text-xs text-stone-500 sm:hidden">
          {role}
        </span>

        <span className="relative text-xs text-stone-600">{about}</span>
      </motion.div>
    </a>
  );
});

export default function Home() {
  const [hoveredWork, setHoveredWork] = useState<HoverState>(null);
  const [hoveredProject, setHoveredProject] = useState<HoverState>(null);

  const handleWorkHover = useCallback(
    (id: string, previewUrl: string, rect: DOMRect) => {
      setHoveredWork({ id, rect, previewUrl });
    },
    [],
  );

  const handleProjectHover = useCallback(
    (id: string, previewUrl: string, rect: DOMRect) => {
      setHoveredProject({ id, rect, previewUrl });
    },
    [],
  );

  const clearWorkHover = useCallback(() => setHoveredWork(null), []);
  const clearProjectHover = useCallback(() => setHoveredProject(null), []);

  return (
    <>
      <AnimatedText
        className="text-xl mt-4 font-bold"
        element="h2"
        text="wrk"
        artificialDelay={0.3}
      />

      <div className="flex flex-col gap-3 mt-3" onMouseLeave={clearWorkHover}>
        {WORK_ITEMS.map((item, i) => (
          <ItemRow
            key={item.slug}
            id={item.company}
            label={item.company}
            role={item.role}
            about={item.about}
            date={item.date}
            url={item.url}
            isHovered={hoveredWork?.id === item.company}
            layoutId="work-hover"
            delay={0.5 + i * 0.15}
            previewUrl={WORK_PREVIEW_URLS.get(item.slug) ?? ""}
            onHover={handleWorkHover}
          />
        ))}
      </div>

      <AnimatedText
        className="text-xl mt-4 font-bold"
        element="h2"
        text="prjcts"
        artificialDelay={0.3}
      />

      <div
        className="flex flex-col gap-3 mt-3"
        onMouseLeave={clearProjectHover}
      >
        {PROJECTS.map((project, i) => (
          <ItemRow
            key={project.slug}
            id={project.name}
            label={project.name}
            role={project.role}
            about={project.about}
            url={project.url}
            isHovered={hoveredProject?.id === project.name}
            layoutId="project-hover"
            delay={0.5 + i * 0.15}
            previewUrl={PROJECT_PREVIEW_URLS.get(project.slug) ?? ""}
            onHover={handleProjectHover}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <HoverPreview
          previewUrl={
            hoveredWork?.previewUrl || hoveredProject?.previewUrl || null
          }
          anchorRect={hoveredWork?.rect || hoveredProject?.rect || null}
        />
      </div>
    </>
  );
}
