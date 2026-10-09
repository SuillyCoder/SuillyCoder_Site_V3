import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">SuillyCoder</h1>
          <div className="flex gap-6">
            <Link href="#about" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Projects
            </Link>
            <Link href="/skills" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Skills
            </Link>
            <Link href="#contact" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section id="hero" className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Hi, I'm SuillyCoder
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Full Stack Developer | Data Scientist | Hardware Enthusiast
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="#about"
                className="px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Learn More
              </Link>
              <Link
                href="#projects"
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-full font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              About Me
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                About me section coming soon...
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              What I've Done
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/projects/fullstack"
                className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  FullStack Projects
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  End-to-end web applications
                </p>
              </Link>
              <Link
                href="/projects/ds-ai-ml"
                className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  DS/AI/ML Projects
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Data science and machine learning
                </p>
              </Link>
              <Link
                href="/projects/hardware-cv"
                className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Hardware & CV Projects
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Hardware and computer vision
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              Contact Me
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    Contact Information
                  </h3>
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
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    Send a Message
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
