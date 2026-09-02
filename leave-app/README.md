# Ledger — Employee Leave Management System

A React + Vite app with separate employee and admin portals.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Demo logins

- **Admin:** admin@company.com / admin123
- **Employee:** arjun@company.com / employee123
  (also fatima@company.com / kevin@company.com, same password)

## What's inside

- `src/data/seed.js` — in-memory seed data (users, leave types, requests) and date helpers
- `src/components/Login.jsx` — role-aware login screen
- `src/components/EmployeePortal.jsx` — employee shell (overview, request form, history)
- `src/components/AdminPortal.jsx` — admin shell (approval queue, all requests, team directory)
- `src/components/DecisionModal.jsx` — approve/reject modal with a note field
- `src/components/Shared.jsx` — status stamp badge, leave-type pill, empty state

## Notes

- All data is held in React state (`App.jsx`) and resets on page refresh — there's no backend yet.
- To persist data, swap the `useState` calls in `App.jsx` for calls to your API/database of choice, and load seed data from there instead of `seed.js`.
- Leave balances live on each employee object in `seed.js`; when you wire up a backend, deduct days server-side on approval rather than trusting the client.
