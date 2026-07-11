# Udemy Clone - Frontend

Production-ready Learning Management System (LMS) frontend built with Next.js.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4
- **State Management:** React Context + TanStack Query
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Theme:** next-themes

## Features

- **Public Website:** Landing, Courses, Blog, FAQ, Contact
- **Authentication:** Login, Register, Google OAuth
- **Student Dashboard:** My Learning, Continue Learning, Profile
- **Admin Dashboard:** Analytics, User Management, CMS
- **Learning Experience:** Video player, Progress, Notes, Bookmarks
- **Payment:** Checkout, Coupon validation, Invoice
- **Design System:** Reusable UI components, Theme support

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

See `.env.example` for required variables.

## Pages

### Public
- `/` - Landing page
- `/courses` - Course listing
- `/courses/[slug]` - Course details
- `/about` - About page
- `/contact` - Contact page
- `/blog` - Blog listing
- `/faq` - FAQ page

### Authentication
- `/auth/login` - Login
- `/auth/register` - Register

### Student Dashboard
- `/dashboard/student` - Dashboard home
- `/dashboard/student/my-learning` - My courses
- `/dashboard/student/continue-learning` - Continue learning
- `/dashboard/student/profile` - Profile
- `/dashboard/student/settings` - Account settings

### Admin Dashboard
- `/dashboard/admin` - Dashboard home
- `/dashboard/admin/users` - User management
- `/dashboard/admin/courses` - Course management
- `/dashboard/admin/analytics` - Analytics

## Demo Credentials

**Admin:**
- Email: admin@udemy.com
- Password: @Admin3124

**Student:**
- Email: student@demo.com
- Password: @Student123

## License

MIT
