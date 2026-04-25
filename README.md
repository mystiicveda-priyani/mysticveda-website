# MysticVeda Holistic Studio

A modern full-stack wellness booking application for MysticVeda Holistic Studio.

## Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB via Mongoose, with automatic local JSON fallback for quick demos

## Features

- Premium spiritual landing page with hero, about, services, testimonials, and contact
- User login and sign-up flow before booking
- User profile page to view personal booking details after checkout
- Services listing with pricing and booking calls-to-action
- Custom session builder for combining multiple services in one booking
- Booking flow with service summary, date/time selection, live slot blocking, and instant booking confirmation
- Confirmation screen with booking summary and meeting details
- Admin dashboard to review all bookings and manage available time slots
- Protected admin login with role-based visibility in the UI
- WhatsApp contact shortcut
- Real Gmail SMTP welcome/booking email support with local log fallback
- Google Meet creation for live session bookings with local fallback when Google credentials are missing

## Project Structure

```text
.
|-- .env.example
|-- client
|   |-- .env.example
|   |-- src
|   |   |-- components
|   |   |-- lib
|   |   `-- pages
|-- server
|   |-- .env.example
|   |-- data
|   `-- src
|       |-- config
|       |-- controllers
|       |-- data
|       |-- models
|       |-- routes
|       `-- utils
```

## Run Locally

1. Copy `client/.env.example` to `client/.env`.
2. Copy `server/.env.example` to `server/.env`.
3. Optionally add a MongoDB connection string to `MONGODB_URI` inside `server/.env`.
4. To send real emails from `mystiicveda@gmail.com`, fill in `SMTP_USER`, `SMTP_PASS`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN` in `server/.env`.
5. Install dependencies from the root:

```bash
npm install
```

6. Start the frontend and backend together:

```bash
npm run dev
```

7. Open `http://localhost:5173`

## API Endpoints

- `GET /api/services`
- `GET /api/availability`
- `PUT /api/availability`
- `GET /api/appointments`
- `GET /api/appointments/:id`
- `POST /api/book-appointment`

## Notes

- If `MONGODB_URI` is not provided, bookings are saved to `server/data/appointments.json`.
- Available slots are managed by the admin and loaded from `server/data/availability.json`.
- Booked time slots are disabled automatically on the booking screen for the selected date.
- The admin dashboard is hidden unless an admin is logged in. Demo admin access is available at `/admin/login`.
- Users must log in or sign up before accessing the booking flow.
- If Gmail SMTP credentials are configured, welcome and booking emails are sent from `mystiicveda@gmail.com`. Otherwise they are logged to `server/data/email-log.json`.
- If Google Calendar credentials are configured, live bookings create real Google Meet links at the selected date and time. Otherwise a local fallback link is used.
- Report-only bookings do not receive meeting links.
