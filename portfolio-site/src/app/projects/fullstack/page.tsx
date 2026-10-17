"use client";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import type { Project } from "@/types/database";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { ProjectsSection } from "@/components/ProjectsSection";

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

export default function FullStackProjects() {
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
          .eq("category", "fullstack")
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
              <Link href="/projects/fullstack" className="text-zinc-900 dark:text-zinc-50 font-medium">
                FullStack
              </Link>
              <Link href="/projects/ds-ai-ml" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
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
              FullStack Projects
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
            <Link href="/projects/fullstack" className="text-zinc-900 dark:text-zinc-50 font-medium">
              FullStack
            </Link>
            <Link href="/projects/ds-ai-ml" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
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
            FullStack Projects
          </h1>
          <Suspense fallback={<p className="text-zinc-500 dark:text-zinc-400">Loading projects…</p>}>
            <ProjectsSection category="fullstack" />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
