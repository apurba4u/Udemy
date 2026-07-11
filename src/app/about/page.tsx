export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-purple-600">Udemy Clone</a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/courses" className="text-gray-700 hover:text-gray-900">Courses</a>
              <a href="/categories" className="text-gray-700 hover:text-gray-900">Categories</a>
              <a href="/about" className="text-gray-900 font-medium">About</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-gray-700 hover:text-gray-900">Log in</a>
            <a href="/auth/register" className="bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
              Sign up
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gray-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold">About Us</h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Empowering learners worldwide with quality education
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="mb-4 text-gray-600">
                  We believe that everyone should have access to quality education. Our platform
                  connects learners with expert instructors from around the world, making learning
                  accessible, affordable, and engaging.
                </p>
                <p className="text-gray-600">
                  Whether you&apos;re looking to advance your career, learn a new skill, or pursue
                  a passion, we have courses to help you achieve your goals.
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Vision</h2>
                <p className="mb-4 text-gray-600">
                  To become the world&apos;s leading learning platform, empowering millions of
                  learners to transform their lives through education.
                </p>
                <p className="text-gray-600">
                  We envision a world where anyone, anywhere can access the knowledge and skills
                  they need to succeed in today&apos;s rapidly changing economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-purple-100">
                  <span className="text-2xl font-bold text-purple-600">10K+</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from industry experts who are passionate about teaching
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-purple-100">
                  <span className="text-2xl font-bold text-purple-600">50K+</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Online Courses</h3>
                <p className="text-gray-600">
                  Choose from thousands of courses across various categories
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-purple-100">
                  <span className="text-2xl font-bold text-purple-600">1M+</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Happy Learners</h3>
                <p className="text-gray-600">
                  Join millions of learners who have transformed their careers
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Our Team</h2>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { name: 'John Doe', role: 'CEO & Founder', avatar: '/avatars/john.jpg' },
                { name: 'Jane Smith', role: 'CTO', avatar: '/avatars/jane.jpg' },
                { name: 'Mike Johnson', role: 'Head of Content', avatar: '/avatars/mike.jpg' },
                { name: 'Sarah Williams', role: 'Head of Marketing', avatar: '/avatars/sarah.jpg' },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gray-200" />
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p>&copy; 2024 Udemy Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
