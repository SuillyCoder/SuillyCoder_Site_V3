// src/app/projects/unavailable/page.tsx
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

type SearchParams = Promise<{ reason?: string; project?: string }>;

const messages: Record<string, { title: string; body: string }> = {
  "missing-link": {
    title: "Repository not available",
    body: "This project doesn't have a repository link yet. Check back soon.",
  },
  "load-error": {
    title: "Projects couldn't load",
    body: "Something went wrong while fetching projects. Please try again in a moment.",
  },
};

const HEX_POINTS = "25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3";

export default async function UnavailablePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { reason, project } = await searchParams;
  const message = messages[reason ?? ""] ?? {
    title: "Something went wrong",
    body: "This page couldn't be loaded.",
  };

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-subtitle)] text-slate-800">
      <SiteHeader />

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 pt-24 text-center">
        {/* Error flag: a hexagon with an exclamation mark */}
        <div
          className="hex-float relative mb-10 w-40"
          style={{ aspectRatio: "100 / 86.6" }}
        >
          <svg
            viewBox="0 0 100 86.6"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <polygon points={HEX_POINTS} fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
          </svg>
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-[family-name:var(--font-horizon)] text-5xl text-sky-600"
          >
            !
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.4em] text-sky-700 sm:text-sm">Error</p>
        <h1 className="mt-4 font-[family-name:var(--font-oita)] text-3xl text-slate-900 sm:text-4xl">
          {message.title}
        </h1>

        {project && (
          <p className="mt-4 text-sm text-slate-400 sm:text-base">Project: {project}</p>
        )}

        <p className="mt-6 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
          {message.body}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/projects/fullstack"
            className="inline-flex min-h-11 items-center rounded-full bg-sky-600 px-7 text-sm font-medium text-white shadow-lg shadow-sky-200 transition-colors hover:bg-sky-700 sm:text-base"
          >
            Back to projects
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-sky-300 px-7 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-50 sm:text-base"
          >
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}