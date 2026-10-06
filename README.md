# RealEstateHub

A full-stack real-estate CRM for browsing, listing, and managing properties. Built with the MERN stack, TypeScript, and GraphQL.

<!-- Optional: add screenshots
![Home](screenshots/home.png)
![Listing detail](screenshots/listing.png)
-->

## ✨ Features

- 🔐 **Authentication** — register, login, logout, and session refresh with JWT access + refresh tokens (httpOnly cookies) and bcrypt password hashing.
- 🏠 **Listings** — create and edit properties through a multi-step wizard, with image uploads via Cloudinary.
- 🔎 **Search & filters** — filter by price, size, category, type, province, and district; sort by price or date.
- ❤️ **Favorites** — save and revisit listings you like.
- 🔔 **Notifications** — get alerts when a favorited listing's price changes.
- 🛡️ **Role-based access** — user / admin / banned roles enforced with `graphql-shield`.
- 👑 **Admin panel** — manage users and listings.
- 🌗 **Dark / light theme** — automatic system theme detection.

## 🧱 Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| State / data | Apollo Client, Zustand, React Hook Form |
| API | GraphQL (Apollo Server), Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcrypt, graphql-shield, cookie-parser |
| Media | Cloudinary |

## 📁 Project Structure

```
RealEstateHub/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # reusable UI (layout, form, ui, common)
│       ├── pages/          # Home, Listings, Search, Estate, Admin, ...
│       ├── graphql/        # queries & mutations
│       ├── routes/         # ProtectedRoute, AdminRoute
│       ├── store/          # Zustand stores (auth, theme)
│       ├── services/       # UploadService (Cloudinary)
│       └── utils/
└── server/                 # Node + Express + GraphQL backend
    └── src/
        ├── config/         # DB connection
        ├── graphql/        # typeDefs, resolvers, context, permissions
        ├── models/         # Mongoose schemas
        └── services/       # business logic
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB (local instance or a MongoDB Atlas connection string)

### 1. Install dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 2. Configure environment variables

**`server/.env`** — copy from `.env.example` and fill in:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/realestate
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**`client/.env`** — copy from `.env.example` and fill in:

```env
VITE_GRAPHQL_SERVER_URI=http://localhost:5000/graphql
VITE_CLOUD_NAME=your_cloud_name
VITE_UPLOAD_PRESET=your_upload_preset
```

> The two Cloudinary variables are only required for image uploads. Create a free account at [cloudinary.com](https://cloudinary.com) and add an **unsigned** upload preset.

### 3. Seed reference data

Types, provinces, and districts power the listing form. Load them once:

```bash
cd server
npx ts-node src/seed.ts
```

### 4. Run the app

Start the backend:

```bash
cd server
npm run dev
# → Connected to MongoDB. | Server is running on port: 5000
```

In a second terminal, start the frontend:

```bash
cd client
npm run dev
# → http://localhost:5173
```

Open **http://localhost:5173**.

## 🔐 Authentication Flow

- **Login** issues a short-lived access token (30m) and a long-lived refresh token (30 days).
- Tokens are stored in **httpOnly cookies**; the access token can also be sent as a `Bearer` header.
- **Refresh** (`reauthenticate`) rotates the refresh token on every use.
- Protected mutations/roles are enforced per-field with `graphql-shield`.

## ☁️ Deploying

The server includes a `vercel.json` for deploying the compiled API to Vercel, and the client builds to static files (`npm run build`) for Vercel/Netlify.

Remember to set the production environment variables in your hosting dashboard:
- Backend: `MONGO_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CLIENT_URL`, `NODE_ENV=production`
- Frontend: `VITE_GRAPHQL_SERVER_URI=<your_api_url>`, `VITE_CLOUD_NAME`, `VITE_UPLOAD_PRESET`

## 📄 License

MIT
