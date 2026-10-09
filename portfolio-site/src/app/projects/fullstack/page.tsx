import Link from "next/link";

export default function FullStackProjects() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-zinc-500 dark:text-zinc-400">Project Image</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Project Title
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Project description goes here...
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  Tag
                </span>
              </div>
              <a
                href="#"
                className="inline-block px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                View Repository
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
