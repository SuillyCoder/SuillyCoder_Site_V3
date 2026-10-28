// src/components/ProjectsSection.tsx
import Image from "next/image";
import { getProjects } from "@/lib/portfolio-data";
import { Reveal } from "@/components/Reveal";
import type { ProjectCategory } from "@/components/ProjectsSubnav";

export async function ProjectsSection({ category }: { category: ProjectCategory }) {
  const { data: projects, error } = await getProjects(category);

  if (error) {
    return (
      <p className="font-[family-name:var(--font-subtitle)] text-slate-500">
        Could not load projects: {error}
      </p>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="font-[family-name:var(--font-subtitle)] text-slate-500">
        No projects added yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Reveal key={project.id} delay={(index % 3) * 120} className="h-full">
          <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100">
            {/* Image, or a gradient placeholder when there isn't one yet */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-300">
              {project.image_path && (
                <Image
                  src={project.image_path}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-[family-name:var(--font-oita)] text-xl text-slate-900">
                {project.name}
              </h3>

              {(project.tags ?? []).length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {(project.tags ?? []).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 font-[family-name:var(--font-subtitle)] text-sm text-sky-800"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {project.description && (
                <p className="mt-4 line-clamp-3 whitespace-pre-line font-[family-name:var(--font-subtitle)] text-slate-500">
                  {project.description}
                </p>
              )}

              {project.repo_link && (
                <a
                  href={project.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 w-fit items-center self-start rounded-full bg-sky-700 px-5 pt-4 font-[family-name:var(--font-subtitle)] text-sm font-medium text-white transition-colors hover:bg-sky-800"
                >
                  View Repository
                </a>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}