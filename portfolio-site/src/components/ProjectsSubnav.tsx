// src/components/ProjectsSubnav.tsx
import Link from "next/link";

export type ProjectCategory = "fullstack" | "ds-ai-ml" | "hardware-cv";

const categories: { key: ProjectCategory; href: string; label: string }[] = [
  { key: "fullstack", href: "/projects/fullstack", label: "FullStack" },
  { key: "ds-ai-ml", href: "/projects/ds-ai-ml", label: "DS/AI/ML" },
  { key: "hardware-cv", href: "/projects/hardware-cv", label: "Hardware/CV" },
];

export function ProjectsSubnav({ active }: { active: ProjectCategory }) {
  return (
    <nav aria-label="Project categories" className="mt-8 flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = category.key === active;
        return (
          <Link
            key={category.key}
            href={category.href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-full border px-5 font-[family-name:var(--font-subtitle)] text-sm font-medium transition-colors sm:text-base ${
              isActive
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-sky-200 text-sky-700 hover:bg-sky-50"
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}