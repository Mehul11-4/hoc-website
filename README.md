# HOC — House of Cakes 🎂

A full-stack e-commerce website built for **House of Cakes (HOC)**, a bakery & café in Bijainagar, Rajasthan. Built as a portfolio project to demonstrate real-world full-stack development skills — authentication, live database integration, cart & checkout, and admin order management.

**Live Demo:** [Add your Vercel URL here after deployment]

---

## Features

- 🔐 **Real authentication** — signup/login via Firebase Auth, role-based access (customer/admin)
- 🍰 **Live menu** — 38+ real HOC menu items served from Firestore, with category filtering
- 🛒 **Shopping cart** — Blinkit-style add/adjust quantity, live totals
- 💳 **Checkout & payments** — Razorpay test-mode integration, full 3-step checkout flow
- 📦 **Order tracking** — customers can view order history and live status updates
- 🛠️ **Admin dashboard** — view all orders, update status, filter by status
- 📱 **Fully responsive** — mobile-first design across every page
- 🎨 **Custom design system** — brand colors, typography, and animations (Framer Motion)

---

## Tech Stack

| Layer              | Technology                  |
| ------------------ | --------------------------- |
| Frontend           | React + Vite                |
| Styling            | Tailwind CSS v4             |
| Animation          | Framer Motion               |
| Routing            | React Router v6             |
| Backend / Database | Firebase (Auth + Firestore) |
| Payments           | Razorpay (Test Mode)        |
| Icons              | Lucide React                |
| Hosting            | Vercel                      |

---

## Getting Started (Local Setup)

### Prerequisites

- Node.js (v18+)
- A free Firebase project ([console.firebase.google.com](https://console.firebase.google.com))
- A free Razorpay account in test mode ([razorpay.com](https://razorpay.com))

### Installation

```bash
git clone https://github.com/YOUR-USERNAME/hoc-website.git
cd hoc-website
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following:
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY_ID=rzp_test_your_key

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Test Payment Details

This project uses **Razorpay Test Mode** — no real money is ever charged.

Use this test card at checkout:
Card Number: 5267 3181 8797 5449
Expiry: any future date
CVV: any 3 digits

Or test via UPI with: `success@razorpay`

---

## Project Structure

src/
├── components/ # Reusable UI components
├── pages/ # Full page components (one per route)
├── context/ # React Context (Auth, Cart)
├── firebase/ # Firebase config, auth, and Firestore functions
├── hooks/ # Custom hooks (useAuth, useCart)
└── styles/ # Global styles

---

## Security Notes

- Passwords are handled entirely by Firebase Auth — never stored or touched by custom code
- Firestore Security Rules enforce role-based access at the database level (not just hidden in the UI)
- User roles cannot be self-assigned or self-escalated — verified via Firestore rules
- Environment variables keep all API keys out of source code

---

## Known Limitations (By Design)

This is a portfolio prototype, not a production payment system:

- Razorpay is in test mode only — no real transactions occur
- Payment verification happens client-side (a production app would verify payments server-side using the Razorpay Key Secret)
- No email/SMS notifications on order status changes (would require a backend/cloud function in production)

---

## Author

Built by Mehul Khandelwal as a portfolio project.
