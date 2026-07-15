'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://backend-ten-tawny-84.vercel.app',
});

export const { signIn, signOut, useSession } = authClient;
