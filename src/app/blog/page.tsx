export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Start Learning Programming in 2024',
      excerpt: 'A comprehensive guide for beginners who want to start their programming journey.',
      date: 'January 15, 2024',
      readTime: '5 min read',
      category: 'Programming',
    },
    {
      id: 2,
      title: 'Top 10 Skills to Learn for Career Growth',
      excerpt: 'Discover the most in-demand skills that can help you advance in your career.',
      date: 'January 12, 2024',
      readTime: '7 min read',
      category: 'Career',
    },
    {
      id: 3,
      title: 'The Future of Online Learning',
      excerpt: 'Explore how online education is evolving and what it means for learners.',
      date: 'January 10, 2024',
      readTime: '4 min read',
      category: 'Education',
    },
    {
      id: 4,
      title: 'Mastering Web Development: A Complete Guide',
      excerpt: 'Everything you need to know about becoming a web developer in 2024.',
      date: 'January 8, 2024',
      readTime: '10 min read',
      category: 'Web Development',
    },
    {
      id: 5,
      title: 'Effective Study Tips for Online Learners',
      excerpt: 'Proven strategies to stay focused and motivated while learning online.',
      date: 'January 5, 2024',
      readTime: '6 min read',
      category: 'Learning Tips',
    },
    {
      id: 6,
      title: 'Building a Portfolio That Gets You Hired',
      excerpt: 'Learn how to create an impressive portfolio that showcases your skills.',
      date: 'January 3, 2024',
      readTime: '8 min read',
      category: 'Career',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-purple-600">Udemy Clone</a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/courses" className="text-gray-700 hover:text-gray-900">Courses</a>
              <a href="/categories" className="text-gray-700 hover:text-gray-900">Categories</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
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

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Blog</h1>
        <p className="mb-8 text-gray-600">
          Stay updated with the latest trends and tips in online learning.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group border border-gray-200 transition-shadow hover:shadow-md"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-purple-600">
                  {post.title}
                </h2>
                <p className="mb-4 text-gray-600">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-sm font-medium text-purple-600 hover:underline">
                    Read More
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p>&copy; 2024 Udemy Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
