// src/components/ProjectCategoryView.tsx
import { redirect } from "next/navigation";
import { getProjectCategory, getProjects } from "@/lib/portfolio-data";
import { ProjectPath, type PathProject } from "@/components/ProjectPath";
import { ProjectsSubnav, type ProjectCategory } from "@/components/ProjectsSubnav";

export async function ProjectCategoryView({ category }: { category: ProjectCategory }) {
  const [meta, list] = await Promise.all([
    getProjectCategory(category),
    getProjects(category),
  ]);

  if (meta.error || list.error) {
    redirect("/projects/unavailable?reason=load-error");
  }

  const projects: PathProject[] = (list.data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? null,
    repo_link: p.repo_link ?? null,
    image_path: p.image_path ?? null,
  }));

  return (
    <>
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-sky-700 sm:text-sm">
          Projects
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-horizon)] text-3xl leading-tight text-slate-900 sm:text-5xl">
          {meta.data?.title ?? "Projects"}
        </h1>
        {meta.data?.summary && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            {meta.data.summary}
          </p>
        )}
        <ProjectsSubnav active={category} />
      </header>

      <div className="mt-20">
        <ProjectPath projects={projects} />
      </div>
    </>
  );
}