import { createClient } from "@/utils/supabase/server";

export type Project = {
  id: number;
  name: string;
  repo_link: string | null;
  description: string | null;
  tags: string[] | null;
  category: string;
  image_path: string | null;
};

// Row shapes match the tables the admin (middleman) app writes to.
export type Skill = {
  id: number;
  name: string;
  category: string | null;
  icon_path: string | null;
};

export type Certification = {
  id: number;
  name: string;
  link: string | null;
  image_path: string | null;
  highlights: string[] | null;
  completed_on: string | null;
};

export type SkillGroup = {
  category: string;
  skills: Skill[];
};

type Result<T> = { data: T; error: null } | { data: []; error: string };

function publicImageUrl(path: string | null): string | null {
  if (!path || path === "EMPTY") return null;
  if (/^https?:\/\//.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/${path}` : null;
}

export async function getProjects(category: string): Promise<Result<Project[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, repo_link, description, tags, category, image_path")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
   return {
    data: ((data ?? []) as Project[]).map((p) => ({ ...p, image_path: publicImageUrl(p.image_path) })),
    error: null,
  };
}

export async function getSkillGroups(): Promise<Result<SkillGroup[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("id, name, category, icon_path")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) return { data: [], error: error.message };

  const groups = new Map<string, Skill[]>();
  for (const skill of (data ?? []) as Skill[]) {
    const category = skill.category?.trim() || "Other";
    groups.set(category, [...(groups.get(category) ?? []), skill]);
  }

  return {
    data: Array.from(groups, ([category, skills]) => ({ category, skills })),
    error: null,
  };
}

export async function getCertifications(): Promise<Result<Certification[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("id, name, link, image_path, highlights, completed_on")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
    return {
    data: ((data ?? []) as Certification[]).map((c) => ({ ...c, image_path: publicImageUrl(c.image_path) })),
    error: null,
  };
}

export type ShowcaseCategory = {
  slug: string;
  title: string;
  summary: string | null;
  projects: { id: number; name: string; image_path: string | null }[];
};

export async function getShowcaseCategories(): Promise<Result<ShowcaseCategory[]>> {
  const supabase = await createClient();

  const { data: categories, error: categoriesError } = await supabase
    .from("project_categories")
    .select("slug, title, summary")
    .order("sort_order", { ascending: true })
    .limit(3);
  if (categoriesError) return { data: [], error: categoriesError.message };

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, name, category, image_path")
    .order("created_at", { ascending: false });
  if (projectsError) return { data: [], error: projectsError.message };

  const rows = (projects ?? []) as {
    id: number;
    name: string;
    category: string;
    image_path: string | null;
  }[];

  return {
    data: (categories ?? []).map((c) => ({
      slug: c.slug,
      title: c.title,
      summary: c.summary,
      projects: rows
        .filter((p) => p.category === c.slug)
        .slice(0, 3)
        .map((p) => ({ id: p.id, name: p.name, image_path: publicImageUrl(p.image_path) })),
    })),
    error: null,
  };
}

export type ProjectCategoryMeta = {
  slug: string;
  title: string;
  summary: string | null;
};

export async function getProjectCategory(
  slug: string,
): Promise<{ data: ProjectCategoryMeta | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_categories")
    .select("slug, title, summary")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: data ?? null, error: null };
}
