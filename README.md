# Vision Studio - MERN Photography Booking System

A complete MERN stack application for managing photography session bookings.

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

## Project Structure
```
vision-studio/
├── backend/      # Express + MongoDB API
└── frontend/     # React (Vite) client
```

## Setup Instructions

### 1. Backend
```bash
cd backend
npm install
# Create .env file (see .env.example)
npm run dev
```
Server runs on `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`

### 3. MongoDB
Use MongoDB Atlas (recommended) or local MongoDB.
Set `MONGO_URI` in `backend/.env`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/visionstudio
PORT=5000
```

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST   | /api/booking      | Create new booking |
| GET    | /api/booking      | Get all bookings |
| DELETE | /api/booking/:id  | Delete a booking |
| PATCH  | /api/booking/:id  | Update status (pending/confirmed) |

## Pages
- `/` — Home with hero, gallery, booking form
- `/admin` — Admin panel to manage bookings
