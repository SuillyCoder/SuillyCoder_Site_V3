import Link from "next/link";

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
            <Link href="#skills" className="text-zinc-900 dark:text-zinc-50 font-medium">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  Category Name
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full text-sm">
                    Skill
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
                <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-zinc-500 dark:text-zinc-400">Cert Image</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  Certification Name
                </h3>
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  View Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
