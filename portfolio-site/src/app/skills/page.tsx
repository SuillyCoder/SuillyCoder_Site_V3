// src/app/skills/page.tsx
import { Suspense, type ReactNode } from "react";
import Image from "next/image";
import { getCertifications, getSkillGroups } from "@/lib/portfolio-data";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-subtitle)] text-slate-800">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <h1 className="text-center font-[family-name:var(--font-horizon)] text-3xl leading-tight text-slate-900 sm:text-5xl">
            Skills and Certifications
          </h1>
        </Reveal>

        <section className="mt-16" aria-labelledby="technical-skills">
          <SectionPill id="technical-skills">Technical Skills</SectionPill>
          <div className="mt-12">
            <Suspense fallback={<StatusMessage>Loading skills…</StatusMessage>}>
              <SkillsSection />
            </Suspense>
          </div>
        </section>

        <section className="mt-24" aria-labelledby="certifications">
          <SectionPill id="certifications">Certifications</SectionPill>
          <div className="mt-12">
            <Suspense fallback={<StatusMessage>Loading certifications…</StatusMessage>}>
              <CertificationsSection />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusMessage({ children }: { children: ReactNode }) {
  return <p className="text-center text-slate-500">{children}</p>;
}

// Turns "2026-03-15" into "March 2026". Parsing with a time avoids timezone shifts.
function formatCompletion(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// Light blue pill heading with small hexagons peeking out, matching the category pills
function SectionPill({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div className="relative mx-auto w-fit">
      <DecorHex className="-left-8 -top-5 w-10" delay={0} />
      <DecorHex className="-right-6 -bottom-4 w-8" delay={1.1} />
      <h2
        id={id}
        className="relative inline-flex min-h-12 items-center rounded-full bg-sky-500 px-10 py-3 font-[family-name:var(--font-oita)] text-2xl text-white shadow-lg shadow-sky-200 sm:text-3xl"
      >
        {children}
      </h2>
    </div>
  );
}

function DecorHex({ className, delay }: { className: string; delay: number }) {
  return (
    <div
      className={`hex-float pointer-events-none absolute ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 86.6" className="block w-full">
        <polygon
          points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
          fill="#7dd3fc"
          fillOpacity={0.5}
        />
      </svg>
    </div>
  );
}

// Category label as the card title, skill names as tags
async function SkillsSection() {
  const { data: groups, error } = await getSkillGroups();

  if (error) return <StatusMessage>Could not load skills: {error}</StatusMessage>;
  if (groups.length === 0) return <StatusMessage>No skills added yet.</StatusMessage>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {groups.map((skillGroup) => (
        <Reveal key={skillGroup.category} className="h-full">
          <article className="h-full rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <h3 className="font-[family-name:var(--font-oita)] text-xl text-slate-900">
              {skillGroup.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skillGroup.skills.map((skill) => (
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

// Full certificate screenshot on top, name and bullet points underneath
// Full certificate screenshot on top, name, date and bullet points underneath
async function CertificationsSection() {
  const { data: certifications, error } = await getCertifications();

  if (error) return <StatusMessage>Could not load certifications: {error}</StatusMessage>;
  if (certifications.length === 0) return <StatusMessage>No certifications added yet.</StatusMessage>;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {certifications.map((cert) => {
        const completed = formatCompletion(cert.completed_on);
        return (
          <Reveal key={cert.id} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100">
              <div className="relative aspect-[16/10] w-full border-b border-sky-100 bg-white">
                {cert.image_path ? (
                  <Image
                    src={cert.image_path}
                    alt={cert.name}
                    fill
                    sizes="(min-width: 768px) 40vw, 92vw"
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-sky-300" />
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-[family-name:var(--font-oita)] text-xl text-slate-900">
                  {cert.name}
                </h3>
                {completed && (
                  <p className="mt-1 text-sm text-sky-700">Completed {completed}</p>
                )}
                {(cert.highlights ?? []).length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-500 marker:text-sky-500 sm:text-base">
                    {(cert.highlights ?? []).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}