// src/app/skills/page.tsx
import { Suspense } from "react";
import Image from "next/image";
import { getCertifications, getSkillGroups } from "@/lib/portfolio-data";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-subtitle)] text-slate-800">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-700 sm:text-sm">Skills</p>
          <h1 className="mt-3 font-[family-name:var(--font-horizon)] text-3xl leading-tight text-slate-900 sm:text-5xl">
            Skills &amp; Certifications
          </h1>
        </Reveal>

        <section className="mt-16" aria-labelledby="technical-skills">
          <Reveal>
            <h2
              id="technical-skills"
              className="font-[family-name:var(--font-oita)] text-2xl text-slate-900 sm:text-3xl"
            >
              Technical Skills
            </h2>
          </Reveal>
          <div className="mt-8">
            <Suspense fallback={<StatusMessage>Loading skills…</StatusMessage>}>
              <SkillsSection />
            </Suspense>
          </div>
        </section>

        <section className="mt-20" aria-labelledby="certifications">
          <Reveal>
            <h2
              id="certifications"
              className="font-[family-name:var(--font-oita)] text-2xl text-slate-900 sm:text-3xl"
            >
              Certifications
            </h2>
          </Reveal>
          <div className="mt-8">
            <Suspense fallback={<StatusMessage>Loading certifications…</StatusMessage>}>
              <CertificationsSection />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusMessage({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-500">{children}</p>;
}

// Runs at request time (inside <Suspense>), so edits made in the admin app
// show up on the next page load.
async function SkillsSection() {
  const { data: groups, error } = await getSkillGroups();

  if (error) return <StatusMessage>Could not load skills: {error}</StatusMessage>;
  if (groups.length === 0) return <StatusMessage>No skills added yet.</StatusMessage>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, index) => (
        <Reveal key={group.category} delay={(index % 3) * 120} className="h-full">
          <article className="h-full rounded-2xl border border-sky-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100">
            <h3 className="font-[family-name:var(--font-oita)] text-xl text-slate-900">
              {group.category}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-sm text-sky-800"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

async function CertificationsSection() {
  const { data: certifications, error } = await getCertifications();

  if (error) return <StatusMessage>Could not load certifications: {error}</StatusMessage>;
  if (certifications.length === 0) return <StatusMessage>No certifications added yet.</StatusMessage>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {certifications.map((cert, index) => (
        <Reveal key={cert.id} delay={(index % 3) * 120} className="h-full">
          <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100">
            {/* Certificate image, or a gradient placeholder when there isn't one yet */}
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-300">
              {cert.image_path && (
                <Image
                  src={cert.image_path}
                  alt={cert.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-[family-name:var(--font-oita)] text-xl text-slate-900">
                {cert.name}
              </h3>

              {cert.description && (
                <p className="mt-3 line-clamp-3 whitespace-pre-line text-slate-500">
                  {cert.description}
                </p>
              )}

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 w-fit items-center self-start rounded-full bg-sky-700 px-5 text-sm font-medium text-white transition-colors hover:bg-sky-800"
                >
                  View Certificate
                </a>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}