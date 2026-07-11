import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Udemy Clone - Online Learning Platform',
  description: 'Learn from expert instructors with thousands of courses on programming, business, and more.',
  keywords: 'online courses, learning, education, programming, business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
