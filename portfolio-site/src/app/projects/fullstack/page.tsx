// src/app/projects/fullstack/page.tsx
import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ProjectsSubnav } from "@/components/ProjectsSubnav";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Reveal } from "@/components/Reveal";

export default function FullStackProjects() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-subtitle)] text-slate-800">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-700 sm:text-sm">Projects</p>
          <h1 className="mt-3 font-[family-name:var(--font-horizon)] text-3xl leading-tight text-slate-900 sm:text-5xl">
            FullStack Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            End-to-end web applications
          </p>
          <ProjectsSubnav active="fullstack" />
        </Reveal>

        <div className="mt-14">
          <Suspense
            fallback={<p className="text-slate-500">Loading projects…</p>}
          >
            <ProjectsSection category="fullstack" />
          </Suspense>
        </div>
      </main>
    </div>
  );
}