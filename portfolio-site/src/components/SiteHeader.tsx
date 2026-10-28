// src/components/SiteHeader.tsx
import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-100 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 sm:px-8 sm:py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-horizon)] text-lg tracking-widest text-sky-700 sm:text-xl"
        >
          SUILLYCODER
        </Link>
        <ul className="flex items-center gap-4 font-[family-name:var(--font-subtitle)] text-sm text-slate-500 sm:gap-8 sm:text-base">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-sky-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}