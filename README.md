# 🍃 EcoCatch Energy Solutions - Website & Admin Portal

A modern, high-performance, and SEO-optimized web application built for EcoCatch Energy Solutions Pvt. Ltd., an end-to-end EPC provider for BioGAS plants, water treatment, and sustainable energy in India.

## 🚀 Tech Stack

**Frontend Architecture:**

- **Framework:** Next.js (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Inline utilities, Dark/Light mode via `next-themes`)
- **UI Components:** shadcn/ui (Tailwind-based Radix primitives), Lucide React, React Icons
- **Animations:** GSAP (ScrollTrigger), Custom HTML5 Canvas (Apple-style scrubbed image sequences)
- **Charts:** Recharts (Data visualization for sensor metrics)

**Backend & Database:**

- **Database:** Neon (Serverless PostgreSQL)
- **ORM:** Drizzle ORM
- **Authentication:** Custom JWT (`jose`), `bcryptjs` (5 salt rounds), HTTP-only cookies, Next.js Middleware
- **API Client:** Axios (with request/response interceptors)
- **Email Service:** Gmail API (OAuth2) + Nodemailer

**SEO & PWA:**

- **SEO:** Dynamic OpenGraph metadata, JSON-LD Structured Data (Schema.org Graph), Canonical URLs
- **Crawling:** Next.js dynamic `sitemap.ts` (DB-driven) and `robots.ts`
- **PWA:** `manifest.ts` for native app-like installation on mobile/desktop

---

## 🌟 Key Features

### 1. Public Facing Website

- **Cinematic Hero Sequence:** A scroll-driven, 60+ frame HTML5 Canvas animation that creates a photorealistic 3D explosion effect of a biogas plant without the performance overhead of WebGL.
- **Dynamic Product Hub:** A fully database-driven `/product` hub and Mega-Menu Dropdown. Renders core solutions and equipment categories via Server Components for instant loading.
- **Interactive UI:** Bento-grid service layouts, animated SVG process flows, scroll-triggered number counters, and a horizontal testimonial marquee.
- **Cross-Device & Theme Support:** Fully responsive layout with a system-aware light/dark mode toggle.
- **Global Preloader:** Ensures all heavy assets (image frames) are cached and loaded before revealing the website.

### 2. Secure Admin Dashboard (`/admin`)

- **Authentication:** Protected by Next.js edge middleware. Uses secure, HTTP-only JWT cookies.
- **Contacts Management:** View incoming queries, mark as read/important, and reply directly from the dashboard. Replies are sent via Gmail API and stored in a threaded conversation view in the database.
- **Dynamic Product CMS:** Add, edit, disable, or delete products. Features dynamic form fields for adding infinite bullet points for features, specs, and applications. (Changes instantly update the frontend and sitemap).
- **Plant & Sensor Monitoring:** Full CRUD for managing client biogas plants. Features a detailed view with mock sensor data (Temperature, Pressure, Flow Rate) visualized through interactive Recharts with Hourly/Daily/Weekly/Monthly filters.
- **Profile Settings:** Admins can update their display name, email, avatar (base64 upload), and securely change their password.

---

## 🗄️ Database Schema (Drizzle ORM)

The PostgreSQL database consists of the following core tables:

1.  **`users`**: Admin credentials, role, and avatar.
2.  **`contacts`**: Inbound contact form submissions.
3.  **`contact_replies`**: Outbound replies sent by the admin, linked to contacts to form a conversation thread.
4.  **`products`**: Dynamic website offerings. Includes `jsonb` fields for arrays (features/specs) and an `isActive` toggle.
5.  **`plants`**: Installed biogas plants belonging to clients.
6.  **`machines`**: Specific equipment installed at a given plant.
7.  **`sensor_data`**: Telemetry data (temp, pressure, flow) tied to specific machines.

---

## 📂 Project Structure

## 📂 Project Structure

```text
eco-catch/
├── public/                 # Static assets
│   ├── images/
│   │   ├── explode/        # 3D canvas animation frames for the Homepage
│   │   └── powerplant/     # Static images for the site
│   ├── mobile/             # PWA app icons (192x192, 512x512)
│   └── social_share/       # OpenGraph SEO images (og-about, og-products, etc.)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (public)        # /about-us, /services, /product
│   │   ├── admin/          # Protected dashboard routes (contacts, plants, products, settings)
│   │   ├── admin-login/    # Standalone login page (bypasses admin layout)
│   │   ├── api/            # Next.js API Routes (admin CRUD, auth, public contact form)
│   │   ├── layout.tsx      # Root layout + Server-side DB fetching for Nav
│   │   ├── manifest.ts     # PWA Manifest generator
│   │   ├── robots.ts       # Robots.txt generator
│   │   └── sitemap.ts      # Dynamic XML sitemap generator
│   ├── components/         # Reusable UI components (Navbar, Footer, Canvas)
│   ├── db/                 # Drizzle ORM config, schema, and seed scripts
│   ├── lib/                # Utilities (Auth, Axios, Gmail API, Data Fetchers)
│   └── types/              # Shared TypeScript interfaces (admin.ts)
├── drizzle.config.ts       # Drizzle CLI configuration
├── middleware.ts           # Route protection logic
└── tailwind.config.ts      # Tailwind configuration

---
## ⚙️ Setup & Installation
1. Clone the repository and install dependencies:
```

npm install

```
2. Configure Environment Variables:
Create a .env file in the root directory with the following keys:

```

# Neon PostgreSQL Database

DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# Authentication

ADMIN_JWT_SECRET="your-secure-jwt-secret-key"

# Gmail OAuth2 (For sending contact replies)

GMAIL_USER="your-email@gmail.com"
GMAIL_CLIENT_ID="your-google-client-id"
GMAIL_CLIENT_SECRET="your-google-client-secret"
GMAIL_REFRESH_TOKEN="your-google-refresh-token"

#cloudinary For Avatar Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

```

3. Initialize the Database:
Push the Drizzle schema to your Neon database and run the seed script to create the default Admin account and populate the initial products.
```

npm run dev

```

Navigate to http://localhost:3000 to view the public site, and http://localhost:3000/admin-login to access the dashboard.

📈 SEO & Performance Highlights
Server Components: The Navbar, Footer, and Product Hub fetch data directly on the server, ensuring zero layout shift and instantaneous HTML delivery to search engines.

Dynamic Sitemap: sitemap.ts automatically pings the database for active products and uses their updatedAt timestamp, telling Google exactly when to recrawl specific URLs.

JSON-LD: Rich snippet integration connects the website, organization, and founder entities together for Google Knowledge Panels.

Next/Dynamic: Heavy libraries (like Recharts in the admin panel) are code-split and loaded asynchronously using next/dynamic to keep initial bundle sizes tiny.
```
