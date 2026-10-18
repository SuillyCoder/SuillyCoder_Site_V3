import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
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
            <Link href="/contact" className="text-zinc-900 dark:text-zinc-50 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
            Get In Touch
          </h1>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">Email</p>
                    <a
                      href="mailto:contact@suillycoder.com"
                      className="text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      contact@suillycoder.com
                    </a>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">GitHub</p>
                    <a
                      href="https://github.com/SuillyCoder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      github.com/SuillyCoder
                    </a>
                  </div>
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">LinkedIn</p>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      linkedin.com/in/suillycoder
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  Send a Message
                </h2>
                  <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
