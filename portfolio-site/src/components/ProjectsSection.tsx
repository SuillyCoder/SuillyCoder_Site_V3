import Image from "next/image";
import { getProjects } from "@/lib/portfolio-data";

type Category = "fullstack" | "ds-ai-ml" | "hardware-cv";

export async function ProjectsSection({ category }: { category: Category }) {
  const { data: projects, error } = await getProjects(category);

  if (error) return <p className="text-zinc-500 dark:text-zinc-400">Could not load projects: {error}</p>;
  if (projects.length === 0) return <p className="text-zinc-500 dark:text-zinc-400">No projects added yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="relative group bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
          <div className="relative h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {project.image_path ? (
              <Image src={project.image_path} alt={project.name} fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
            ) : (
              <span className="text-zinc-500 dark:text-zinc-400">No image</span>
            )}
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{project.name}</h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {(project.tags ?? []).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          {project.repo_link && (
            <a href={project.repo_link} target="_blank" rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              View Repository
            </a>
          )}
          {project.description && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-2xl border border-zinc-200 bg-white p-6 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-1000 dark:border-zinc-700 dark:bg-zinc-800">
              <p className="line-clamp-10 whitespace-pre-line text-sm text-zinc-700 dark:text-zinc-200">{project.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}