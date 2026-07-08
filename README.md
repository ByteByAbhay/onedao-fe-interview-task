# OneDAO FE Interview Task

A responsive React application that displays a collection of product cards and implements the Login, Register, OTP, and (optional) Dashboard screens from the provided Figma designs.

## Status

Project scaffolding is complete. UI screens (Login, Register, OTP, Dashboard, Product Cards) are not yet implemented.

## Tech Stack

| Purpose | Choice | Why |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) (React 19, App Router, TypeScript) | Official, actively maintained way to scaffold a modern React app — Create React App is deprecated. Includes routing, bundling, and optimized builds out of the box, so pages like `/login`, `/register`, `/otp`, and `/dashboard` map cleanly to folders. |
| Styling | [Bootstrap 5](https://getbootstrap.com) | Required by the task spec; used via utility/component classes on plain markup (no extra component-wrapper library needed). |
| Icons | [Font Awesome](https://fontawesome.com) (`@fortawesome/react-fontawesome` + free icon sets) | Required by the task spec; the official React bindings render icons as SVG components instead of an icon font, which keeps bundle size down and avoids FOUC. |
| Language | TypeScript | Type safety and editor autocomplete across components and data models (e.g. the `Product` type). |

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout — global styles (Bootstrap + globals.css) load here
    page.tsx         # Home route
    globals.css
public/               # Static assets (images, icons)
```

Upcoming routes (`login`, `register`, `otp`, `dashboard`) and shared UI (`components/ProductCard`, etc.) will be added under `src/app/` and `src/components/` as they're built.

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
