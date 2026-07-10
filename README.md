# OneDAO FE Interview Task

A responsive React application implementing the Login, Register, OTP, and Dashboard screens from the provided Figma designs, with a real (localStorage-backed) auth flow wired through Redux Toolkit.

## Status

- [x] Project scaffolding
- [x] Login screen (`/login`)
- [x] Register screen (`/register`)
- [x] OTP screen (`/otp`)
- [x] 404 not found page
- [x] Dashboard (optional) (`/dashboard`)
- [x] Auth flow: register → OTP → login → dashboard, route-guarded, logout
- [ ] Product cards

## Auth Flow

Registration, OTP verification, login, and session state are wired end-to-end (no backend — data lives in Redux + `localStorage`, standing in for a real API):

1. **Register** (`/register`) — submits email/password, generates a 6-digit OTP, persists the account to `localStorage`, shows the OTP in a toast (standing in for an email/SMS you can't actually receive in a demo), and navigates to `/otp`.
2. **OTP** (`/otp`) — verifies the entered code against the pending OTP, then navigates to `/login`.
3. **Login** (`/login`) — checks email/password against the registered accounts in the store; on success, saves the session to `localStorage` and navigates to `/dashboard`.
4. **Dashboard** (`/dashboard`) — guarded: reads the persisted session on mount and redirects to `/login` if there isn't one, so the page can't be opened without logging in first. Refreshing the page keeps you logged in (session persists in `localStorage`).
5. **Logout** — the header's logout button clears the session and returns to `/login`.

## Tech Stack

| Purpose | Choice | Why |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) (React 19, App Router, TypeScript) | Official, actively maintained way to scaffold a modern React app — Create React App is deprecated. Includes routing, bundling, and optimized builds out of the box, so pages like `/login`, `/register`, `/otp`, and `/dashboard` map cleanly to folders. |
| Styling | [Bootstrap 5](https://getbootstrap.com) via [React Bootstrap](https://react-bootstrap.github.io) | Required by the task spec. React Bootstrap wraps Bootstrap's CSS in React components (`Form`, `InputGroup`, `Button`, `Table`, `Container`/`Row`/`Col`) instead of raw `className` strings, so markup stays declarative and accessible (correct ARIA roles/keyboard handling) out of the box. |
| Icons | [Font Awesome](https://fontawesome.com) (`@fortawesome/react-fontawesome` + free icon sets) | Required by the task spec; the official React bindings render icons as SVG components instead of an icon font, which keeps bundle size down and avoids FOUC. |
| State management | [Redux Toolkit](https://redux-toolkit.js.org) + [React Redux](https://react-redux.js.org) | Not in the required stack, but the register → OTP → login → dashboard flow needs state shared across routes (registered accounts, pending OTP, session) that outlives any single component — Redux Toolkit's `createSlice` keeps that logic centralized and typed instead of threading it through props or re-deriving it from `localStorage` in every component. |
| Charts | [Recharts](https://recharts.org) | Not in the required stack, but the Dashboard's statistics panel needs a line chart; Recharts is the standard SVG-based charting library for React, composes declaratively like the rest of the UI, and needs no imperative canvas code. |
| Language | TypeScript | Type safety and editor autocomplete across components and data models. |

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout — Bootstrap/Font Awesome/globals.css, ReduxProvider, ToastHost
    page.tsx           # Home route — redirects to /login
    globals.css
    login/
      page.tsx          # /login route
    register/
      page.tsx          # /register route
    otp/
      page.tsx          # /otp route
    dashboard/
      page.tsx          # /dashboard route (guarded — see DashboardShell)
    not-found.tsx       # 404 page (matches unmatched routes)
    not-found.module.css
  components/
    auth/
      AuthShell.tsx           # Shared split-panel layout (hero image panel + form panel) for auth screens
      FormField.tsx           # Shared labeled input (icon + error message) built on React Bootstrap Form/InputGroup
      PasswordToggleButton.tsx  # Shared show/hide password button
      OtpInput.tsx            # Shared 6-digit OTP input (auto-advance, backspace, paste support)
      LoginForm.tsx           # Login form — validates against Redux, dispatches loginSuccess, navigates to /dashboard
      RegisterForm.tsx        # Register form — dispatches registerUser + OTP toast, navigates to /otp
      OtpForm.tsx             # OTP form — verifies against Redux pendingOtp, navigates to /login
      auth.module.css         # Shared visual styling for all auth screens
    dashboard/
      DashboardShell.tsx      # Composes sidebar + header + content; route guard (redirects to /login if no session)
      Sidebar.tsx             # Left nav — user card, main menu, animated sliding active-item indicator, mobile off-canvas
      DashboardHeader.tsx     # Greeting header, mobile menu toggle, logout button (dispatches logout)
      StatCardRow.tsx         # Horizontally-scrollable "Knowledge base" cards with scroll-aware fade edges
      StatCard.tsx            # Colored KPI card used inside StatCardRow
      StatisticChart.tsx      # Recharts line chart panel (Average grade vs Exams)
      TopDrivers.tsx          # Right-hand ranked driver list panel
      OrdersTable.tsx         # Orders table with row selection + pagination
      Avatar.tsx              # Photo avatar (optional ring border) or initials fallback (deterministic color per name)
      dashboard.module.css    # Shared visual styling for the dashboard screen
    providers/
      ReduxProvider.tsx       # Wraps the app in <Provider>, hydrates auth state from localStorage on mount
    ui/
      ToastHost.tsx           # Renders queued toasts (React Bootstrap Toast) from the Redux toast slice
      toast.module.css
  store/
    store.ts            # configureStore — combines auth + toast reducers
    hooks.ts             # Typed useAppDispatch / useAppSelector
    authSlice.ts         # Registered users, session, pending OTP — persisted to localStorage
    toastSlice.ts        # Queue of toast messages (id, title, message, variant)
  data/
    dashboardData.ts    # Dashboard dummy data + types (nav items, stat cards, drivers, orders, chart data, current user)
  lib/
    fontawesome.ts     # Font Awesome config (disables auto CSS injection)
public/
  auth-hero.jpg         # Hero photo used in the auth screens' image panel
  profile-1.jpg         # Sidebar user avatar photo
```

Login, Register, and OTP all compose the same `AuthShell`/`FormField` building blocks, so any future auth screen can reuse them too. The Dashboard follows the same pattern: one composing "shell" component plus small, single-purpose panel components, all driven by typed dummy data in `src/data/dashboardData.ts` rather than hardcoded JSX so the data source is a single, obvious place to swap for a real API later. Upcoming shared UI (`components/ProductCard`, etc.) will be added under `src/components/` as it's built.

## Getting Started

Requires Node.js 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You'll land on `/login`; register a new account to try the full flow (the OTP is shown in a toast since there's no real email/SMS backend).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Design Reference

Layout, color scheme, typography, and component styling follow the Figma page supplied for this task (Login, Register, OTP, Dashboard).
