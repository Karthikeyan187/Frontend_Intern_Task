# Backend (Node + Express)

## Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`
4. `npm run dev` (requires nodemon) or `npm start`

## Available endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/profile (protected)
- PUT /api/profile (protected)
- GET /api/notes (protected)
- POST /api/notes (protected)
- PUT /api/notes/:id (protected)
- DELETE /api/notes/:id (protected)
