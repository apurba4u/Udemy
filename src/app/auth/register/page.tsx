'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const success = await registerUser(data.fullName, data.email, data.password);

      if (success) {
        router.push('/auth/login?registered=true');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-1/2 bg-gray-900 lg:flex lg:items-center lg:justify-center">
        <div className="max-w-md px-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Learning that gets you
          </h1>
          <p className="text-gray-400">
            Skills for your present (and your future). Get started with us.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Sign up</h2>
          <p className="mb-8 text-gray-600">
            Create your account and start learning today.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className="w-full border border-gray-300 px-4 py-3 focus:border-purple-600 focus:outline-none"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full border border-gray-300 px-4 py-3 focus:border-purple-600 focus:outline-none"
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full border border-gray-300 px-4 py-3 pr-10 focus:border-purple-600 focus:outline-none"
                  placeholder="Create a password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className="w-full border border-gray-300 px-4 py-3 pr-10 focus:border-purple-600 focus:outline-none"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-2" />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center bg-gray-900 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center border border-gray-300 py-3 hover:bg-gray-50"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-600 hover:underline">
              Log in
            </Link>
          </p>

          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 text-sm font-medium text-gray-700">Demo Credentials</p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-900">Admin:</span>{' '}
                <span className="text-gray-600">admin@udemy.com / @Admin3124</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Student:</span>{' '}
                <span className="text-gray-600">student@demo.com / @Student123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
