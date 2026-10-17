import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCertifications, getSkillGroups } from "@/lib/portfolio-data";

export default function SkillsPage() {
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
            <Link href="/skills" className="text-zinc-900 dark:text-zinc-50 font-medium">
              Skills
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            Skills & Certifications
          </h1>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Technical Skills
            </h2>
            <Suspense fallback={<StatusMessage>Loading skills…</StatusMessage>}>
              <SkillsSection />
            </Suspense>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Certifications
            </h2>
            <Suspense fallback={<StatusMessage>Loading certifications…</StatusMessage>}>
              <CertificationsSection />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusMessage({ children }: { children: React.ReactNode }) {
  return <p className="text-zinc-500 dark:text-zinc-400">{children}</p>;
}

// Runs at request time (inside <Suspense>), so edits made in the admin app
// show up on the next page load.
async function SkillsSection() {
  const { data: groups, error } = await getSkillGroups();

  if (error) return <StatusMessage>Could not load skills: {error}</StatusMessage>;
  if (groups.length === 0) return <StatusMessage>No skills added yet.</StatusMessage>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <div key={group.category} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {group.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

async function CertificationsSection() {
  const { data: certifications, error } = await getCertifications();

  if (error) return <StatusMessage>Could not load certifications: {error}</StatusMessage>;
  if (certifications.length === 0) return <StatusMessage>No certifications added yet.</StatusMessage>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert) => (
        <div key={cert.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
          <div className="relative h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {cert.image_path ? (
              <Image
                src={cert.image_path}
                alt={cert.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="text-zinc-500 dark:text-zinc-400">No image</span>
            )}
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {cert.name}
          </h3>
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              View Certificate
            </a>
          )}
          {cert.description && (
            <div className="pointer-events-none absolute inset-x-0 top-full z-20 mt-2 whitespace-pre-line rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-1000 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {cert.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
