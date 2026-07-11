import type { Metadata } from 'next';
import { Inter, Poppins, Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/shared/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
