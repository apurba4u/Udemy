export type UserRole = 'student' | 'admin';

export type AuthProvider = 'email' | 'google';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export type CourseLanguage = 'English' | 'Bangla' | 'Hindi' | 'Spanish';

export type PaymentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Refunded';

export type CouponType = 'percentage' | 'fixed';

export type PaymentGatewayType = 'stripe' | 'bkash' | 'nagad' | 'paypal' | 'sslcommerz' | 'razorpay';

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

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
  icon?: string;
  image?: string;
  featured: boolean;
  active: boolean;
  courseCount: number;
  createdAt: string;
}

export interface CourseSection {
  _id: string;
  title: string;
  course: string;
  order: number;
  createdAt: string;
}

export interface Lesson {
  _id: string;
  section: string;
  title: string;
  description?: string;
  videoUrl: string;
  preview: boolean;
  duration: number;
  attachments: string[];
  order: number;
  createdAt: string;
}

export interface Course {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  thumbnail: string;
  promoVideo?: string;
  category: Category;
  instructor: User;
  language: CourseLanguage;
  level: CourseLevel;
  tags: string[];
  price: number;
  discountPrice?: number;
  estimatedDuration: number;
  featured: boolean;
  published: boolean;
  learningOutcomes: string[];
  requirements: string[];
  enrolledStudents: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Enrollment {
  _id: string;
  student: User;
  course: Course;
  payment?: string;
  enrolledAt: string;
  completed: boolean;
  completedAt?: string;
  progress?: number;
}

export interface Progress {
  _id: string;
  student: User;
  course: Course;
  completedLessons: string[];
  progressPercentage: number;
  lastLesson?: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  student: User;
  course: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  type: CouponType;
  value: number;
  minimumPurchase: number;
  maximumDiscount?: number;
  usageLimit: number;
  perUserLimit: number;
  expiresAt: string;
  active: boolean;
  createdAt: string;
}

export interface PaymentGateway {
  _id: string;
  name: string;
  type: PaymentGatewayType;
  enabled: boolean;
  displayOrder: number;
  configuration: Record<string, unknown>;
  instructions?: string;
  createdAt: string;
}

export interface Payment {
  _id: string;
  order: string;
  gateway: PaymentGateway;
  amount: number;
  currency: string;
  transactionId?: string;
  senderNumber?: string;
  screenshot?: string;
  status: PaymentStatus;
  paidAt?: string;
  createdAt: string;
}

export interface Order {
  _id: string;
  student: User;
  course: Course;
  payment?: Payment;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  status: OrderStatus;
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
