// app/page.tsx
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ProjectShowcase } from "@/components/ProjectsShowcase";
import { Reveal } from "@/components/Reveal";
import { Suspense } from "react"
import Image from "next/image";
import welcomeBanner from "./assets/Suillycoder_Portfolio_Image_v3.jpg";
import aboutPhoto from "./assets/Suillycoder_AboutImage_V3.jpg";

// Hexagons around the welcome banner: x and width are % of the banner width, y is % of its height
const welcomeHexes = [
  { x: 0, y: 22, w: 5, delay: 0 },
  { x: 103, y: 18, w: 9, delay: 1.2 },
  { x: -7, y: 52, w: 10, delay: 2.2 },
  { x: 90, y: 62, w: 4, delay: 0.6 },
  { x: 23, y: 90, w: 7, delay: 1.8 },
  { x: 101, y: 92, w: 8, delay: 0.9 },
];

// Hexagons floating around the About photo: x and width are % of the frame width, y is % of its height
const aboutHexes = [
  { x: -4, y: 24, w: 11, delay: 0 },
  { x: 96, y: 8, w: 9, delay: 1.4 },
  { x: -2, y: 86, w: 13, delay: 0.7 },
];

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-100 bg-white/80 backdrop-blur-md">
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
                {/* Welcome */}
        <section
          id="hero"
          className="relative isolate overflow-hidden px-5 pb-24 pt-14 sm:px-8"
        >
          {/* Banner area, 2:1 so the bottom curve is a true half-circle */}
          <div className="relative mx-auto aspect-[2/1] w-[min(92vw,56rem)]">
            {/*
              Stage: the banner, outline, afterglow and hexagons all live here.
              The mask fades everything inside it to transparent over the bottom 30%
              of the banner, so the whole element fades into the white page.
              The stage is wider and taller than the banner, so nothing is clipped.
            */}
            <div
              aria-hidden="false"
              className="pointer-events-none absolute"
              style={{
                left: "-20%",
                top: 0,
                width: "140%",
                height: "140%",
                maskImage: "linear-gradient(to bottom, #000 40%, transparent 67%)",
                WebkitMaskImage: "linear-gradient(to bottom, #000 40%, transparent 67%)",
              }}
            >
              {/* Banner-sized box, centred inside the stage */}
              <div
                className="absolute"
                style={{
                  left: "14.2857%",
                  top: 0,
                  width: "71.4286%",
                  height: "71.4286%",
                }}
              >
                {/* Blue afterglow behind the banner */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -z-10"
                  style={{
                    inset: "-12% -12% -30% -12%",
                    background:
                      "radial-gradient(closest-side, rgba(56, 189, 248, 0.45), transparent)",
                  }}
                />

                {/* Floating hexagons */}
                {welcomeHexes.map((hex, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${hex.x}%`,
                      top: `${hex.y}%`,
                      width: `${hex.w}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="hex-float" style={{ animationDelay: `${hex.delay}s` }}>
                      <svg viewBox="0 0 100 86.6" className="block w-full" aria-hidden="true">
                        <polygon
                          points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
                          fill="#7dd3fc"
                          fillOpacity={0.35}
                        />
                      </svg>
                    </div>
                  </div>
                ))}

                {/* The banner itself: semicircle, blue outline on the curve, hardcoded image */}
                <div className="absolute inset-0 overflow-hidden rounded-b-full border-x-[6px] border-b-[6px] border-t-0 border-sky-500 bg-gradient-to-br from-sky-100 via-white to-sky-300">
                  <Image
                    src={welcomeBanner}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 896px) 56rem, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text starts below the faded bottom of the banner */}
          <Reveal className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-sky-700 sm:text-sm">
              Welcome to my page
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-horizon)] text-4xl leading-tight tracking-wide text-slate-900 sm:text-6xl md:text-7xl">
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
                {/* About */}
        <section id="about" className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Photo in a hexagonal frame. On mobile it stacks above the text. */}
            <Reveal>
              <div
                className="relative mx-auto w-full max-w-md"
                style={{ aspectRatio: "100 / 86.6" }}
              >
                {/* Floating hexagons */}
                {aboutHexes.map((hex, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${hex.x}%`,
                      top: `${hex.y}%`,
                      width: `${hex.w}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="hex-float" style={{ animationDelay: `${hex.delay}s` }}>
                      <svg viewBox="0 0 100 86.6" className="block w-full" aria-hidden="true">
                        <polygon
                          points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
                          fill="#7dd3fc"
                          fillOpacity={0.35}
                        />
                      </svg>
                    </div>
                  </div>
                ))}

                {/* The photo fills the hexagon */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                >
                  <Image
                    src={aboutPhoto}
                    alt="Photo of SuillyCoder"
                    fill
                    sizes="(min-width: 768px) 28rem, 90vw"
                    className="object-cover"
                  />
                </div>

                {/* Light blue outline on the hexagon edge */}
                <svg
                  viewBox="0 0 100 86.6"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  aria-hidden="true"
                >
                  <polygon
                    points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </Reveal>

            {/* Heading and flavor text */}
            <Reveal className="text-center">
              <h2 className="font-[family-name:var(--font-oita)] text-3xl text-slate-900 sm:text-4xl">
                About Me
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
                Hey there! I'm Jesus Lorenzo Basuil: a 22-year old Cebuano student-dev with over 3 years of
                experience with projects in Full-Stack Development, Data Science, Artificial Intelligence, 
                Machine Learning, and even Hardware-related fields like Embedded Systems and Computer Vision. 
                I've been studying Computer Engineering at the University of San Carlos, which helped develop
                my academic rigor, problem-solving mindset, and my tech-related skills. I'm learning a lot, and 
                I'm always looking forward to learning more!

              </p>
            </Reveal>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal>
            <h2 className="font-[family-name:var(--font-oita)] text-center text-3xl text-slate-900 sm:text-4xl">
              What I&apos;ve Done
            </h2>
          </Reveal>
          <div className="mt-12">
            <Suspense fallback={<p className="text-center text-slate-500">Loading projects…</p>}>
              <ProjectShowcase />
            </Suspense>
          </div>
        </section>

                {/* Contact */}
        <section id="contact" className="bg-sky-600 py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-[family-name:var(--font-oita)] text-center text-3xl text-white sm:text-4xl">
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
          </div>
        </section>
      </main>
    </div>
  );
}