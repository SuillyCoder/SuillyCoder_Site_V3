// app/page.tsx
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

const projects = [
  {
    href: "/projects/fullstack",
    title: "FullStack Projects",
    description: "End-to-end web applications",
    accent: "from-sky-400 to-sky-600",
  },
  {
    href: "/projects/ds-ai-ml",
    title: "DS/AI/ML Projects",
    description: "Data science and machine learning",
    accent: "from-cyan-400 to-sky-500",
  },
  {
    href: "/projects/hardware-cv",
    title: "Hardware & CV Projects",
    description: "Hardware and computer vision",
    accent: "from-blue-400 to-cyan-500",
  },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-[family-name:var(--font-subtitle)]">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-100 bg-white/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 sm:px-8 sm:py-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-horizon)] text-lg tracking-widest text-sky-700 sm:text-xl"
          >
            SUILLYCODER
          </Link>
          <ul className="flex items-center gap-4 text-sm text-slate-500 sm:gap-8 sm:text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-sky-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24"
        >
          {/* Gradient placeholder for the future hero image */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-white to-sky-300 opacity-90"
          />
          <Reveal className="text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-sky-600 sm:text-sm">
              Portfolio
            </p>
            <h1 className="font-[family-name:var(--font-horizon)] text-4xl leading-tight tracking-wide text-slate-900 sm:text-6xl md:text-7xl">
              Hi, I&apos;m SuillyCoder
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base text-slate-500 sm:text-xl">
              Full Stack | Data Science | Machine Learning | Embedded Systems | Computer Vision
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#about"
                className="min-h-11 rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-sky-200 transition-colors hover:bg-sky-700 sm:text-base"
              >
                Learn More
              </Link>
              <Link
                href="#projects"
                className="min-h-11 rounded-full border border-sky-300 px-7 py-3 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-50 sm:text-base"
              >
                View Projects
              </Link>
            </div>
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
          <Reveal>
            <h2 className="font-[family-name:var(--font-oita)] text-center text-3xl text-slate-900 sm:text-4xl">
              About Me
            </h2>
            <div className="mt-10 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-10">
              <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
                About me section coming soon...
              </p>
            </div>
          </Reveal>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal>
            <h2 className="font-[family-name:var(--font-oita)] text-center text-3xl text-slate-900 sm:text-4xl">
              What I&apos;ve Done
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.href} delay={index * 120}>
                <Link
                  href={project.href}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-sky-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`}
                  />
                  <h3 className="font-[family-name:var(--font-oita)] text-2xl text-slate-900 transition-colors group-hover:text-sky-600">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-slate-500">{project.description}</p>
                  <span className="mt-6 inline-block text-sm text-sky-600">
                    Explore &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
          <Reveal>
            <h2 className="font-[family-name:var(--font-oita)] text-center text-3xl text-slate-900 sm:text-4xl">
              Contact Me
            </h2>
            <div className="mt-10 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-[family-name:var(--font-oita)] text-xl text-slate-900">
                    Contact Information
                  </h3>
                  <div className="mt-6 space-y-5">
                    <div>
                      <p className="mb-1 text-sm text-slate-400">Email</p>
                      <a
                        href="mailto:jlcbasuil@gmail.com"
                        className="break-all font-medium text-slate-900 transition-colors hover:text-sky-600"
                      >
                        jlcbasuil@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-slate-400">GitHub</p>
                      <a
                        href="https://github.com/SuillyCoder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-900 transition-colors hover:text-sky-600"
                      >
                        github.com/SuillyCoder
                      </a>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-slate-400">LinkedIn</p>
                      <a
                        href="https://www.linkedin.com/in/jesus-lorenzo-basuil-b9150431b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-900 transition-colors hover:text-sky-600"
                      >
                        linkedin.com/in/suillycoder
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}