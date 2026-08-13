# RealEstateHub

A full-stack real estate management application built with the MERN stack (MongoDB, Express, React, Node.js), TypeScript, Vite, and Tailwind CSS.

## Tech Stack

**Frontend (`client/`)**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Apollo Client (GraphQL)
- React Router
- Zustand (state management)
- React Hook Form

**Backend (`server/`)**
- Node.js + TypeScript
- GraphQL
- MongoDB

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local instance or Atlas connection string)

### Installation

Clone the repository:
```bash
git clone https://github.com/shuklapriyanshu1234/RealEstateHub.git
cd RealEstateHub
```

Install dependencies for both client and server:
```bash
cd client
npm install

cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory (see `.env.example` for reference) and a `.env` file in `client/` if needed.

### Running the App

**Server:**
```bash
cd server
npm run dev
```

**Client:**
```bash
cd client
npm run dev
```

## Project Structure

```
RealEstateHub/
├── client/          # React frontend
│   ├── public/
│   └── src/
└── server/           # Node.js backend
    ├── src/
    └── dist/          # Build output
```

## License

This project currently has no license specified. All rights reserved by default.

## Contact

Priyanshu Shukla — [GitHub](https://github.com/shuklapriyanshu1234)
