# OneDAO FE Interview Task

A responsive React application that displays a collection of product cards and implements the Login, Register, OTP, and (optional) Dashboard screens from the provided Figma designs.

## Status

- [x] Project scaffolding
- [x] Login screen (`/login`)
- [x] Register screen (`/register`)
- [x] OTP screen (`/otp`)
- [x] 404 not found page
- [ ] Dashboard (optional)
- [ ] Product cards

## Tech Stack

| Purpose | Choice | Why |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) (React 19, App Router, TypeScript) | Official, actively maintained way to scaffold a modern React app - Create React App is deprecated. Includes routing, bundling, and optimized builds out of the box, so pages like `/login`, `/register`, `/otp`, and `/dashboard` map cleanly to folders. |
| Styling | [Bootstrap 5](https://getbootstrap.com) via [React Bootstrap](https://react-bootstrap.github.io) | Required by the task spec. React Bootstrap wraps Bootstrap's CSS in React components (`Form`, `InputGroup`, `Button`, `Container`/`Row`/`Col`) instead of raw `className` strings, so markup stays declarative and accessible (correct ARIA roles/keyboard handling) out of the box. |
| Icons | [Font Awesome](https://fontawesome.com) (`@fortawesome/react-fontawesome` + free icon sets) | Required by the task spec; the official React bindings render icons as SVG components instead of an icon font, which keeps bundle size down and avoids FOUC. |
| Language | TypeScript | Type safety and editor autocomplete across components and data models (e.g. the `Product` type). |

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout - global styles (Bootstrap, Font Awesome, globals.css) load here
    page.tsx           # Home route - redirects to /login
    globals.css
    login/
      page.tsx          # /login route
    register/
      page.tsx          # /register route
    otp/
      page.tsx          # /otp route
    not-found.tsx       # 404 page (matches unmatched routes)
    not-found.module.css
  components/
    auth/
      AuthShell.tsx           # Shared split-panel layout (hero image panel + form panel) for auth screens
      FormField.tsx           # Shared labeled input (icon + error message) built on React Bootstrap Form/InputGroup
      PasswordToggleButton.tsx  # Shared show/hide password button
      OtpInput.tsx            # Shared 6-digit OTP input (auto-advance, backspace, paste support)
      LoginForm.tsx           # Login form - composes AuthShell + FormField
      RegisterForm.tsx        # Register form - composes AuthShell + FormField
      OtpForm.tsx             # OTP form - composes AuthShell + OtpInput
      auth.module.css         # Shared visual styling for all auth screens
  lib/
    fontawesome.ts     # Font Awesome config (disables auto CSS injection)
public/
  auth-hero.jpg         # Hero photo used in the auth screens' image panel
```

Login, Register, and OTP all compose the same `AuthShell`/`FormField` building blocks, so any future auth screen can reuse them too. On successful registration, `RegisterForm` navigates to `/otp` to mirror the typical sign-up flow. Upcoming route (`dashboard`, optional) and shared UI (`components/ProductCard`, etc.) will be added under `src/app/` and `src/components/` as they're built.

## Getting Started

Requires Node.js 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Design Reference

Layout, color scheme, typography, and component styling follow the Figma page supplied for this task (Login, Register, OTP, Dashboard).
