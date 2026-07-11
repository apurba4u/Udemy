export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-purple-600">Udemy Clone</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/courses" className="text-gray-700 hover:text-gray-900">Courses</a>
              <a href="/categories" className="text-gray-700 hover:text-gray-900">Categories</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-gray-700 hover:text-gray-900">Log in</a>
            <a
              href="/auth/register"
              className="bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
            >
              Sign up
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gray-100 py-20">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="mb-4 text-5xl font-bold text-gray-900">
              Learning that gets you
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Skills for your present (and your future). Get started with us.
            </p>
            <a
              href="/courses"
              className="inline-block bg-purple-600 px-8 py-3 text-white hover:bg-purple-700"
            >
              Explore Courses
            </a>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h3 className="mb-8 text-2xl font-bold text-gray-900">
              Featured Courses
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-4">
                    <h4 className="mb-2 font-semibold text-gray-900">
                      Course Title {i}
                    </h4>
                    <p className="mb-2 text-sm text-gray-600">Instructor Name</p>
                    <div className="mb-2 flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold">4.5</span>
                      <span className="text-sm text-gray-500">(123)</span>
                    </div>
                    <p className="font-bold text-gray-900">$49.99</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Top Categories
            </h3>
            <p className="mb-8 text-gray-600">
              Explore our most popular categories
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {['Development', 'Business', 'IT & Software', 'Design'].map((cat) => (
                <div
                  key={cat}
                  className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h4 className="font-semibold text-gray-900">{cat}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/help" className="hover:text-white">Help Center</a></li>
                <li><a href="/terms" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/courses?category=development" className="hover:text-white">Development</a></li>
                <li><a href="/courses?category=business" className="hover:text-white">Business</a></li>
                <li><a href="/courses?category=design" className="hover:text-white">Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Udemy Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
