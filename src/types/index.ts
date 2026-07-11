export type UserRole = 'student' | 'admin';

export type AuthProvider = 'email' | 'google';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  provider: AuthProvider;
  isVerified: boolean;
  isBlocked: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  courseCount: number;
  createdAt: string;
}

export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration: number;
  order: number;
  isFree: boolean;
  resources?: string[];
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  trailer?: string;
  instructor: User;
  category: Category;
  lessons: Lesson[];
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  requirements: string[];
  learningOutcomes: string[];
  enrolledStudents: number;
  rating: number;
  reviewCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface Enrollment {
  _id: string;
  student: User;
  course: Course;
  progress: number;
  completedLessons: string[];
  lastAccessedAt: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  student: User;
  course: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  page?: number;
  limit?: number;
  sort?: string;
}
