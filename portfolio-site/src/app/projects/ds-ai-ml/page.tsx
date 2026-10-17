"use client";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import type { Project } from "@/types/database";
import { useEffect, useState } from "react";

function getImageUrl(imagePath: string | null): string | null {
  if (!imagePath || imagePath === "EMPTY") return null;

  // If it's already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Otherwise, construct the Supabase public URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/${imagePath}`;
  }

  return null;
}

export default function DSAIProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createClient();
        console.log("Supabase client created");

        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .or("category.eq.ds-ai-ml,category.eq.ds-al-ml")
          .order("created_at", { ascending: false });

        console.log("Fetch result:", { data, error });

        if (error) {
          console.error("Error fetching projects:", error);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              SuillyCoder
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                Home
              </Link>
              <Link href="/projects/fullstack" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                FullStack
              </Link>
              <Link href="/projects/ds-ai-ml" className="text-zinc-900 dark:text-zinc-50 font-medium">
                DS/AI/ML
              </Link>
              <Link href="/projects/hardware-cv" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                Hardware/CV
              </Link>
            </div>
          </div>
        </nav>

        <main className="pt-20 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
              DS/AI/ML Projects
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            SuillyCoder
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Home
            </Link>
            <Link href="/projects/fullstack" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              FullStack
            </Link>
            <Link href="/projects/ds-ai-ml" className="text-zinc-900 dark:text-zinc-50 font-medium">
              DS/AI/ML
            </Link>
            <Link href="/projects/hardware-cv" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Hardware/CV
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            DS/AI/ML Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects && projects.length > 0 ? (
              projects.map((project: Project) => {
                const imageUrl = getImageUrl(project.image_path);
                return (
                  <div key={project.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                    {imageUrl ? (
                      <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-zinc-500 dark:text-zinc-400">No Image</span>
                      </div>
                    )}
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {project.description}
                  </p>
                  {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-4">
                      {project.tags.map((tag: unknown, index: number) => (
                        typeof tag === 'string' ? (
                          <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                            {tag}
                          </span>
                        ) : null
                      ))}
                    </div>
                  )}
                  <a
                    href={project.repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    View Repository
                  </a>
                </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-zinc-600 dark:text-zinc-400">No DS/AI/ML projects yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
