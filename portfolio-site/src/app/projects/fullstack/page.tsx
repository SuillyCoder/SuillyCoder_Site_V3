// src/app/projects/fullstack/page.tsx
import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ProjectCategoryView } from "@/components/ProjectCategoryView";

export default function FullStackProjects() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-subtitle)] text-slate-800">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8">
        <Suspense fallback={<p className="text-center text-slate-500">Loading projects…</p>}>
          <ProjectCategoryView category="fullstack" />
        </Suspense>
      </main>
    </div>
  );
}