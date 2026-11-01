// src/components/ProjectPath.tsx
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type PathProject = {
  id: number;
  name: string;
  description: string | null;
  repo_link: string | null;
  image_path: string | null;
};

const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
const HEX_POINTS = "25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3";
const HEX_VIEWBOX = "0 0 100 86.6";

// Small floating hexagons around each big one: x, y, and width as % of its box
const DECOR = [
  { x: -6, y: 26, w: 13, delay: 0 },
  { x: 84, y: -2, w: 12, delay: 1.2 },
  { x: 4, y: 90, w: 18, delay: 0.6 },
];

const buttonClass =
  "inline-flex min-h-11 items-center rounded-full bg-sky-600 px-7 font-[family-name:var(--font-subtitle)] text-sm font-medium text-white shadow-lg shadow-sky-200 transition-colors hover:bg-sky-700 sm:text-base";

export function ProjectPath({ projects }: { projects: PathProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hexRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  // Measure each hexagon's centre and draw a curve between neighbouring pairs.
  // Re-runs when the container resizes, so the line stays attached to the hexagons.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const box = container.getBoundingClientRect();
      const centres = projects.map((_, i) => {
        const el = hexRefs.current[i];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - box.left + r.width / 2,
          y: r.top - box.top + r.height / 2,
        };
      });

      const next: string[] = [];
      for (let i = 0; i < centres.length - 1; i++) {
        const a = centres[i];
        const b = centres[i + 1];
        if (!a || !b) continue;
        const midY = (a.y + b.y) / 2;
        next.push(`M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`);
      }
      setPaths(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [projects]);

  if (projects.length === 0) {
    return (
      <p className="text-center font-[family-name:var(--font-subtitle)] text-slate-500">
        No projects added yet.
      </p>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Connecting line, drawn behind the hexagons */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>

      <ol className="relative flex flex-col gap-24">
        {projects.map((project, index) => {
          const hexOnLeft = index % 2 === 0;
          return (
            <li
              key={project.id}
              className={`flex items-center gap-8 md:gap-16 ${
                hexOnLeft ? "" : "md:flex-row-reverse"
              }`}
            >
              <div
                ref={(el) => {
                  hexRefs.current[index] = el;
                }}
                className="relative w-2/5 shrink-0 md:w-[42%]"
              >
                <Hexagon project={project} />
              </div>

              <div className="min-w-0 flex-1 font-[family-name:var(--font-subtitle)]">
                <h3 className="font-[family-name:var(--font-oita)] text-2xl text-slate-900 sm:text-4xl">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-500 sm:text-base">
                    {project.description}
                  </p>
                )}
                <div className="mt-6">
                  <ProjectButton project={project} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Hexagon({ project }: { project: PathProject }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[22rem]"
      style={{ aspectRatio: "100 / 86.6" }}
    >
      {DECOR.map((hex, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: `${hex.w}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="hex-float" style={{ animationDelay: `${hex.delay}s` }}>
            <svg viewBox={HEX_VIEWBOX} className="block w-full" aria-hidden="true">
              <polygon points={HEX_POINTS} fill="#7dd3fc" fillOpacity={0.35} />
            </svg>
          </div>
        </div>
      ))}

      {/* Photo, or a gradient placeholder when there isn't one */}
      <div
        className="absolute inset-0 overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-300"
        style={{ clipPath: HEX_CLIP }}
      >
        {project.image_path && (
          <Image
            src={project.image_path}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 22rem, 40vw"
            className="object-cover"
          />
        )}
      </div>

      <svg
        viewBox={HEX_VIEWBOX}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <polygon points={HEX_POINTS} fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function ProjectButton({ project }: { project: PathProject }) {
  if (project.repo_link) {
    return (
      <a
        href={project.repo_link}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        View Project
      </a>
    );
  }

  // No repository link: send the visitor to the custom error page instead
  const href = `/projects/unavailable?reason=missing-link&project=${encodeURIComponent(
    project.name,
  )}`;
  return (
    <Link href={href} className={buttonClass}>
      View Project
    </Link>
  );
}