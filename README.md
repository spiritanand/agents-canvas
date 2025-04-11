# Agents Canvas

A modern web application built with the T3 Stack, featuring a canvas-based interface for agent management and visualization.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI, Radix UI
- **State Management**: React Query, tRPC
- **Database**: Prisma with PostgreSQL
- **Authentication**: Auth.js
- **Form Handling**: React Hook Form with Zod validation
- **Visualization**: React Flow (@xyflow/react)
- **Code Quality**: Biome
- **Package Manager**: pnpm

## Features

- Modern, responsive UI with dark mode support
- Canvas-based agent visualization
- Real-time data updates
- Type-safe API with tRPC
- Secure authentication
- Form validation with Zod
- Database migrations and schema management
- Code quality enforcement with Biome

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

## Database Setup

1. Start the database:

   ```bash
   ./start-database.sh
   ```

2. Run migrations:

   ```bash
   pnpm db:generate
   ```

3. Access Prisma Studio:

   ```bash
   pnpm db:studio
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm check` - Run Biome checks
- `pnpm typecheck` - Run TypeScript checks
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/ui/ # Reusable UI components
├── lib/          # Utility functions and configurations
├── server/       # Server-side code and API routes
├── styles/       # Global styles and Tailwind config
├── trpc/         # tRPC router and procedures
├── types/        # TypeScript type definitions
├── env.js        # Environment validation
└── middleware.ts # Next.js middleware
```

## Environment Variables

Required environment variables are defined in `.env.example`. Make sure to set them up in your `.env` file.

## License

MIT
