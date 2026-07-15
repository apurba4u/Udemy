# 🎓 LearnHub Frontend

A modern, production-ready online learning platform frontend built with **Next.js 15**, **React 19**, and **Tailwind CSS**.

The application provides a complete e-learning experience including authentication, course browsing, enrollment, payment, student dashboard, instructor/admin dashboard, notifications, analytics, and responsive UI.

---

# 🚀 Live Demo

**Frontend**
https://frontend-opal-theta-mydgygpet3.vercel.app

**Backend API**
https://backend-ten-tawny-84.vercel.app

---

# ✨ Features

## Authentication

- Email & Password Login
- Google OAuth Login
- Better Auth Authentication
- Protected Routes
- Role Based Access Control
- JWT Authentication
- Session Management

---

## Student Features

- Dashboard
- Browse Courses
- Search Courses
- Filter by Category
- Course Details
- Purchase Courses
- Stripe Checkout
- bKash Manual Payment
- Nagad Manual Payment
- My Learning
- Continue Learning
- Video Course Player
- Lesson Progress
- Notifications
- Profile Management

---

## Admin Features

- Dashboard Analytics
- User Management
- Course Management
- Category Management
- Payment Approval
- Manual Payment Verification
- Coupon Management
- Notification Management
- Blog Management
- FAQ Management
- Testimonial Management
- Website Settings

---

## Payment System

- Stripe Checkout
- bKash Manual Payment
- Nagad Manual Payment
- Payment Screenshot Upload
- Admin Approval Workflow
- Automatic Enrollment after Payment
- Order History

---

## UI Features

- Fully Responsive
- Mobile Friendly
- Modern Dashboard
- Notification Dropdown
- Beautiful Cards
- Statistics
- Charts
- Loading Skeletons
- Toast Notifications
- Reusable Components

---

# 🛠 Tech Stack

## Framework

- Next.js 15
- React 19

## Styling

- Tailwind CSS v4
- Framer Motion
- Lucide Icons

## State Management

- React Hooks
- Context API

## Forms

- React Hook Form

## Charts

- Recharts

## Authentication

- Better Auth

## HTTP Client

- Axios

---

# 📂 Project Structure

```
src/
│
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── checkout/
│   ├── courses/
│   ├── notifications/
│   └── page.tsx
│
├── components/
│   ├── admin/
│   ├── dashboard/
│   ├── layout/
│   ├── notifications/
│   ├── ui/
│   └── common/
│
├── hooks/
│
├── lib/
│
├── services/
│
├── types/
│
└── utils/
```

---

# ⚙ Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=https://backend-ten-tawny-84.vercel.app/api

NEXT_PUBLIC_BETTER_AUTH_URL=https://backend-ten-tawny-84.vercel.app

NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/apurba4u/Udemy.git
```

Go to project

```bash
cd Frontend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Application will start at

```
http://localhost:3000
```

---

# 🏗 Build

```bash
npm run build
```

Run production

```bash
npm start
```

---

# 🚀 Deployment

This project is deployed on **Vercel**.

For deployment:

1. Import repository into Vercel
2. Add Environment Variables
3. Deploy

---

# 🔐 Authentication Flow

```
User
   ↓
Better Auth
   ↓
Backend API
   ↓
MongoDB
```

---

# 💳 Payment Flow

### Stripe

```
Checkout
      ↓
Stripe
      ↓
Verify Payment
      ↓
Enrollment Created
      ↓
Course Available
```

### bKash / Nagad

```
Checkout
      ↓
Upload Screenshot
      ↓
Admin Approval
      ↓
Enrollment Created
      ↓
Course Available
```

---

# 📊 Dashboard

### Student

- Learning Progress
- Continue Learning
- Purchased Courses
- Notifications
- Profile

### Admin

- Revenue Analytics
- User Statistics
- Orders
- Payments
- Courses
- Coupons
- Notifications

---

# 🔔 Notification System

- Payment Submitted
- Payment Approved
- Payment Rejected
- New Coupon
- New User
- Reviews
- Mark as Read
- Delete Notification

---

# 📱 Responsive Design

Supports

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🔒 Security

- Protected Routes
- JWT Authentication
- Better Auth
- Secure API Calls
- Environment Variables
- Role Based Access Control

---

# 📈 Performance

- Server Components
- Lazy Loading
- Optimized Images
- API Caching
- Responsive UI
- Fast Navigation

---

# 📜 Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

# 🤝 Backend Repository

Backend API powers this frontend application.

Backend includes:

- Authentication
- Payment APIs
- Course APIs
- User APIs
- Admin APIs
- Notification APIs

---

# 👨‍💻 Developer

**Apurba Ovi**

GitHub:
https://github.com/apurba4u

---

# 📄 License

This project is created for educational purposes and personal portfolio.

---

## ⭐ If you like this project, don't forget to give it a Star!
