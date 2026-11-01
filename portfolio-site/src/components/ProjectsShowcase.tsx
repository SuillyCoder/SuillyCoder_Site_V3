// src/components/ProjectShowcase.tsx
import { getShowcaseCategories } from "@/lib/portfolio-data";
import { HexShowcase } from "@/components/HexShowcase";

export async function ProjectShowcase() {
  const { data, error } = await getShowcaseCategories();

  if (error) {
    return <p className="text-center text-slate-500">Could not load projects: {error}</p>;
  }
  if (data.length === 0) {
    return <p className="text-center text-slate-500">No project categories yet.</p>;
  }

  return <HexShowcase categories={data} />;
}