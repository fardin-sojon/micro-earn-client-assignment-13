# 🌟 Micro Earn – A Micro-Tasking & Earning Platform

## 🎯 Project Purpose
Micro Earn is a dynamic web application designed to connect users who want to earn money by completing simple tasks with those who need work done efficiently.
It provides a transparent ecosystem where **Workers** can earn coins by completing tasks, and **Buyers** can post tasks and review submissions. The platform ensures secure transactions, real-time updates, and a seamless user experience.

---

### 🔗 [🌐 Live Link](https://micro-earn-assignment-13.netlify.app/)

## 🗝 Key Features

✅ **Robust User Authentication**
- Secure Login, Signup, and Google Sign-in powered by **Firebase**.
- **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for **Workers**, **Buyers**, and **Admins**.
- Secured Private Routes to protect sensitive dashboards.
- Profile image updates with instant display.

✅ **Dashboard & Management (Private Routes)**
- **Worker Dashboard:** Browse available tasks, track submissions, and manage withdrawals.
- **Buyer Dashboard:** Post new tasks, review worker submissions, and purchase coins.
- **Admin Dashboard:** Oversee all users, manage tasks, and handle withdrawal requests.
- **Profile Management:** Update user details including profile pictures with real-time preview.

✅ **Task & Submission System**
- **Task Discovery:** Browse available tasks with filters and sorting options.
- **Task Creation:** Buyers can create detailed tasks with image uploads and specific requirements.
- **Submission:** Workers submit proof of work (text/images) for review.
- **Approval Workflow:** Buyers can approve or reject submissions with feedback.

✅ **Secure Payments & Coin System**
- Integrated **Stripe** payment gateway for purchasing coins.
- **Coin-Based Economy:** Use coins to post tasks; earn coins by completing tasks.
- **Withdrawal System:** Workers can withdraw earned coins to real money via diverse methods.
- Payment history tracking for all transactions.

✅ **Responsive Design & Modern UI**
- Fully responsive layout optimized for mobile, tablet, and desktop.
- Built with **React (Vite)**, **Tailwind CSS**, and **DaisyUI** for a modern, clean aesthetic.
- Interactive elements like Image Previews, Modals, and SweetAlert2 notifications.
- Testimonials section with ratings and user feedback (SwiperJS).

---

## 👥 User Roles

### 👑 Admin
- **Manage Users:** View all users, change roles, and remove users if necessary.
- **Manage Tasks:** Delete inappropriate tasks.
- **Manage Withdrawals:** Approve or reject worker withdrawal requests.

### 💼 Buyer
- **Post Tasks:** Create tasks with specific requirements and coin rewards.
- **My Tasks:** View and manage created tasks.
- **Review Submissions:** Approve or reject work submitted by workers.
- **Purchase Coins:** Buy coins securely via Stripe to fund tasks.
- **Payment History:** View records of coin purchases.

### 👷 Worker
- **Task List:** Browse and filter available tasks to perform.
- **My Submissions:** Track the status of submitted work (Pending/Approved/Rejected).
- **Withdrawals:** Request payouts once the minimum coin threshold is met.

---

## 📦 NPM Packages Used

| Package | Purpose |
|---------|---------|
| react | Core React library |
| react-router-dom | Client-side routing |
| firebase | Authentication & Firebase services |
| @tanstack/react-query | Data fetching & state management |
| axios | HTTP Client for API calls |
| react-hook-form | Form handling & Validation |
| tailwindcss | Styling framework |
| daisyui | UI Component library |
| sweetalert2 | Beautiful Popups & Notifications |
| swiper | Carousel/Slider component |
| react-icons | Modern Icons |
| @stripe/react-stripe-js | Stripe React Components |
| @stripe/stripe-js | Stripe JS Library |

---

## 🧩 Tools & Technologies
- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS + DaisyUI
- **Auth:** Firebase Authentication (Email/Password + Google OAuth)
- **State Management:** TanStack Query + Context API
- **Payment:** Stripe API
- **Image Upload:** ImgBB API / Cloudinary
- **Notifications:** SweetAlert2 & React Hot Toast

---

## ⚙️ Run Locally

### Prerequisites
- Node.js installed
- Firebase project setup
- Stripe account
- ImgBB API Key

### Installation Steps

```bash
# 1. Clone the repository
git clone <https://github.com/fardin-sojon/micro-earn-client-assignment-13.git>

# 3. Install dependencies
npm install

# 3. Configure Environment Variables
# Create a .env.local file in the client directory with:

VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_sender_id
VITE_APPID=your_firebase_app_id
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_IMGBB_API_KEY=your_imgbb_api_key

# 4. Run the development server
npm run dev
```

---

## 🚀 Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

---

## 👨‍💻 Developer
**Fardin Sojon**
- Email: fardinsojon@gmail.com
- GitHub: [@fardin-sojon](https://github.com/fardin-sojon)

---
Made with ❤️ by Fardin Rahman Sojon
