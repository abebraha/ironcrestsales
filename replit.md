# IronCrest Sales - Business Landing Page

## Overview

IronCrest Sales is a professional business landing page built as a full-stack React application that showcases outsourced sales solutions. The application features a modern design with smooth animations, a contact form system, and comprehensive service information. It's designed to help businesses understand and connect with IronCrest's sales department scaling services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Animations**: Framer Motion for smooth page transitions and scroll animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for contact form submissions and data retrieval
- **Development Server**: Custom Vite integration for hot module replacement in development
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: Configured for PostgreSQL with Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Database Schema
- **Users Table**: Basic user authentication with username and password
- **Contact Submissions Table**: Captures lead information including name, email, company, revenue goals, and messages
- **Validation**: Zod schemas for both database inserts and API validation

### Design System
- **Typography**: Montserrat for headings, Open Sans for body text
- **Color Scheme**: Professional blue and neutral palette with gold accents
- **Component Library**: Comprehensive shadcn/ui components including forms, dialogs, navigation, and data display
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: ARIA labels and semantic HTML structure

## External Dependencies

### Core Technologies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Build Tools**: Vite with TypeScript, PostCSS, Autoprefixer
- **Database**: Drizzle ORM, @neondatabase/serverless, PostgreSQL
- **Validation**: Zod for runtime type checking and schema validation

### UI and Styling
- **Component Library**: @radix-ui/* primitives for accessible components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment (@replit/vite-plugin-*)
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint-ready structure with TypeScript path mapping

### Third-Party Services
- **Database Hosting**: Neon Database (serverless PostgreSQL)
- **Fonts**: Google Fonts (Montserrat, Open Sans)
- **Session Storage**: PostgreSQL-based session management

The application is designed to be easily deployable to various platforms with environment-based configuration and includes both development and production build processes.