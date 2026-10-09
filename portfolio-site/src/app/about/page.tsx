import Link from "next/link";

export default function AboutPage() {
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
            <Link href="/about" className="text-zinc-900 dark:text-zinc-50 font-medium">
              About
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
            About Me
          </h1>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                About me section coming soon...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
