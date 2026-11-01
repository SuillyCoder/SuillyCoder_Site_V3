// src/components/HexShowcase.tsx
"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShowcaseCategory } from "@/lib/portfolio-data";

const CYCLE_MS = 15000;

// Flat-top hexagon. The CSS clip path and the SVG points describe the same shape.
const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const HEX_POINTS = "25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3";
const HEX_VIEWBOX = "0 0 100 86.6";
const HEX_ASPECT = "100 / 86.6";

// Three light blues that sit close together, one per category.
const PALETTES = [
  { accent: "#7dd3fc", glow: "rgba(125, 211, 252, 0.6)", tint: "#e0f2fe" },
  { accent: "#38bdf8", glow: "rgba(56, 189, 248, 0.5)", tint: "#e0f2fe" },
  { accent: "#0ea5e9", glow: "rgba(14, 165, 233, 0.45)", tint: "#f0f9ff" },
];

// Big hexagon slots as percentages of the stage: centre x, centre y, and width.
const LAYOUTS = [
  [
    { x: 49, y: 64, w: 41 },
    { x: 24, y: 30, w: 26 },
    { x: 76, y: 30, w: 30 },
  ],
  [
    { x: 20, y: 56, w: 32 },
    { x: 52, y: 36, w: 37 },
    { x: 80, y: 58, w: 27 },
  ],
  [
    { x: 30, y: 32, w: 34 },
    { x: 72, y: 27, w: 40 },
    { x: 50, y: 72, w: 28 },
  ],
];

// Small decorative hexagons floating around the stage.
const DECOR = [
  { x: 8, y: 18, w: 6, delay: 0 },
  { x: 92, y: 14, w: 5, delay: 1.3 },
  { x: 10, y: 84, w: 5, delay: 2.1 },
  { x: 90, y: 86, w: 7, delay: 0.7 },
  { x: 56, y: 6, w: 4, delay: 1.8 },
];

export function HexShowcase({ categories }: { categories: ShowcaseCategory[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = categories.length;

  // Advance every 15s. Restarts whenever the active category changes,
  // so a manual click always gives the reader a full 15 seconds.
  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % count), CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, count]);

  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* All categories share one grid cell, so they crossfade in place */}
      <div className="grid">
        {categories.map((category, index) => {
          const isActive = index === active;
          const palette = PALETTES[index % PALETTES.length];
          const layout = LAYOUTS[index % LAYOUTS.length];
          const mirror = index % 2 === 1;
          const prevIndex = (index - 1 + count) % count;
          const nextIndex = (index + 1) % count;

          return (
            <section
              key={category.slug}
              inert={!isActive}
              aria-label={category.title}
              className={`relative col-start-1 row-start-1 transition-opacity duration-[900ms] ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Oversized so the fade finishes well inside the box, leaving no visible edge */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{
                  inset: "-4rem -6rem",
                  background: `radial-gradient(ellipse closest-side at 50% 45%, ${palette.tint}, transparent)`,
                }}
              />

              <div className="relative">
                {/* Stage row: faded previous category | current stage | faded next category */}
                <div className="relative grid md:grid-cols-[1fr_minmax(0,48rem)_1fr] md:items-center">
                  {count > 1 && (
                    <GhostCell side="left" category={categories[prevIndex]} index={prevIndex} />
                  )}

                  <HexStage
                    projects={category.projects}
                    layout={layout}
                    palette={palette}
                    mirror={mirror}
                    showArrows={count > 1}
                    onPrev={prev}
                    onNext={next}
                  />

                  {count > 1 && (
                    <GhostCell side="right" category={categories[nextIndex]} index={nextIndex} />
                  )}
                </div>

                <div className="mt-6 text-center">
                  <h3 className="font-[family-name:var(--font-oita)] text-2xl text-slate-900 sm:text-3xl">
                    {category.title}
                  </h3>
                  {category.summary && (
                    <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-subtitle)] text-base text-slate-500 sm:text-lg">
                      {category.summary}
                    </p>
                  )}
                  <Link
                    href={`/projects/${category.slug}`}
                    className="mt-6 inline-flex min-h-11 items-center rounded-full bg-sky-500 px-8 font-[family-name:var(--font-subtitle)] text-base font-medium text-white shadow-lg shadow-sky-200 transition-colors hover:bg-sky-600"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

// A faded, non-interactive preview of a neighbouring category, shown beside the stage on desktop.
// A faded, non-interactive preview of a neighbouring category, shown beside the stage on desktop.
// The side nearest the stage stays visible; the outer side fades and is clipped.
function GhostCell({
  side,
  category,
  index,
}: {
  side: "left" | "right";
  category: ShowcaseCategory;
  index: number;
}) {
  const isLeft = side === "left";
  const palette = PALETTES[index % PALETTES.length];
  const layout = LAYOUTS[index % LAYOUTS.length];
  // Fade toward the outer edge of the screen
  const mask = isLeft
    ? "linear-gradient(to right, transparent, #000 70%)"
    : "linear-gradient(to left, transparent, #000 70%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden min-w-0 overflow-hidden md:flex"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {/* Flex alignment keeps the side next to the stage in view when the preview is wider than its column */}
      <div className={`flex w-full ${isLeft ? "justify-end" : "justify-start"}`}>
        <div
          className={`w-[18rem] shrink-0 scale-90 opacity-30 ${
            isLeft ? "origin-right" : "origin-left"
          }`}
        >
          <HexStage
            projects={category.projects}
            layout={layout}
            palette={palette}
            mirror={index % 2 === 1}
            showArrows={false}
          />
        </div>
      </div>
    </div>
  );
}

function HexStage({
  projects,
  layout,
  palette,
  mirror,
  showArrows,
  onPrev,
  onNext,
}: {
  projects: ShowcaseCategory["projects"];
  layout: { x: number; y: number; w: number }[];
  palette: { accent: string; glow: string };
  mirror: boolean;
  showArrows: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl">
      {DECOR.map((hex, i) => (
        <FloatingHex
          key={i}
          x={mirror ? 100 - hex.x : hex.x}
          y={hex.y}
          w={hex.w}
          delay={hex.delay}
          accent={palette.accent}
        />
      ))}

      {layout.map((slot, i) => {
        const project = projects[i];
        return (
          <BigHex
            key={i}
            x={slot.x}
            y={slot.y}
            w={slot.w}
            delay={i * 0.6}
            accent={palette.accent}
            glow={palette.glow}
            image={project?.image_path ?? null}
            alt={project?.name ?? "Project placeholder"}
          />
        );
      })}

      {showArrows && onPrev && onNext && (
        <>
          <ArrowButton direction="prev" onClick={onPrev} />
          <ArrowButton direction="next" onClick={onNext} />
        </>
      )}
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous category" : "Next category"}
      className={`absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sky-200 bg-white text-sky-700 shadow-sm transition-colors hover:bg-sky-50 ${
        isPrev ? "left-0 sm:-left-16" : "right-0 sm:-right-16"
      }`}
    >
      {isPrev ? "\u2190" : "\u2192"}
    </button>
  );
}

function positionStyle(x: number, y: number, w: number): CSSProperties {
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    transform: "translate(-50%, -50%)",
  };
}

function FloatingHex({
  x,
  y,
  w,
  delay,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  delay: number;
  accent: string;
}) {
  return (
    <div className="absolute" style={positionStyle(x, y, w)}>
      <div className="hex-float" style={{ animationDelay: `${delay}s` }}>
        <svg viewBox={HEX_VIEWBOX} className="block w-full" aria-hidden="true">
          <polygon points={HEX_POINTS} fill={accent} fillOpacity={0.35} />
        </svg>
      </div>
    </div>
  );
}

function BigHex({
  x,
  y,
  w,
  delay,
  accent,
  glow,
  image,
  alt,
}: {
  x: number;
  y: number;
  w: number;
  delay: number;
  accent: string;
  glow: string;
  image: string | null;
  alt: string;
}) {
  return (
    <div className="absolute" style={positionStyle(x, y, w)}>
      <div
        className="hex-float"
        style={{ animationDelay: `${delay}s`, filter: `drop-shadow(0 0 24px ${glow})` }}
      >
        <div className="relative w-full" style={{ aspectRatio: HEX_ASPECT }}>
          <div
            className="absolute inset-0 overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-300"
            style={{ clipPath: HEX_CLIP }}
          >
            {image && (
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 768px) 30vw, 60vw"
                className="object-cover"
              />
            )}
            {/* Subtle light-blue gradient over the image */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-200/25 via-transparent to-sky-400/30" />
          </div>

          <svg
            viewBox={HEX_VIEWBOX}
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <polygon points={HEX_POINTS} fill="none" stroke={accent} strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}