'use client';

import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PageWrapper } from './PageWrapper';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <PageWrapper>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </PageWrapper>
  );
}
