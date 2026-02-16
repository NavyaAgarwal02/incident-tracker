# Incident Tracker Mini App

Full Stack Incident Management System.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: SQLite + Prisma

## Setup

### Backend
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## APIs

POST /api/incidents  
GET /api/incidents  
GET /api/incidents/:id  
PATCH /api/incidents/:id  

## Features
- Incident creation
- Pagination
- Search & filter
- Status update
- REST APIs
- Seeded database

## Design Decisions
- Prisma ORM for safety
- Server-side pagination
- REST architecture

## Tradeoffs
- SQLite for simplicity
- Minimal UI

## Improvements
- Authentication
- Role management
- Better UI
- Caching
