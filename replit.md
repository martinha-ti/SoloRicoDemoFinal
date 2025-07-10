# Solo Rico Website

## Overview

This is a full-stack agricultural company website built with React/TypeScript frontend and Express.js backend. The application serves as a corporate website for Solo Rico Agrociências, a Brazilian agricultural company specializing in fertilizers and agricultural solutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom brand colors
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **Email Service**: Nodemailer for contact forms and job applications
- **API Design**: RESTful API with JSON responses

## Key Components

### Data Models
- **Products**: Agricultural products with categories, descriptions, and benefits
- **Blog Posts**: Content management for agricultural articles and news
- **Contact Messages**: Customer inquiry handling
- **Job Applications**: Career application management
- **Users**: Basic user management system

### Page Structure
- **Home**: Hero carousel, featured products, company highlights
- **Company**: About us, history, mission and values
- **For Businesses**: B2B solutions and enterprise products
- **For You**: Individual consumer products and small producers
- **Comex**: International trade and export services
- **Blog**: Agricultural articles and industry news
- **Contact**: Contact form and company information
- **SAC**: Customer service and support
- **Work With Us**: Job applications and careers

### UI Components
- Responsive navigation with mobile menu
- Page headers with background images
- Product cards and detail pages
- Blog article layouts
- Contact and application forms
- Footer with company information and links
- WhatsApp floating button for customer support

## Data Flow

1. **Frontend requests** are made through the API client using TanStack Query
2. **Backend routes** handle API endpoints for products, blog, contact, and job applications
3. **Database operations** are performed using Drizzle ORM with PostgreSQL
4. **Email notifications** are sent via Nodemailer for form submissions
5. **Static assets** are served through Vite in development and Express in production

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- Routing: Wouter
- UI Libraries: Radix UI primitives, Lucide React icons
- Styling: Tailwind CSS, class-variance-authority
- State Management: TanStack Query
- Form Validation: Zod with hookform resolvers
- Date Utilities: date-fns
- Carousel: Embla Carousel

### Backend Dependencies
- Express.js framework
- Database: Drizzle ORM, @neondatabase/serverless
- Session: connect-pg-simple
- Email: Nodemailer
- Validation: Zod with drizzle-zod
- Development: tsx, esbuild

### Development Tools
- TypeScript for type safety
- Vite for fast development and building
- PostCSS with Tailwind CSS
- ESLint and Prettier (implied by setup)

## Deployment Strategy

### Development
- Uses Vite dev server for frontend with HMR
- Express server runs with tsx for TypeScript execution
- Database migrations handled by Drizzle Kit
- Environment variables for database and email configuration

### Production Build
- Frontend: Vite builds static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single deployment artifact with Express serving both API and static files
- Database: Neon Database (serverless PostgreSQL) for production
- Email: Configured SMTP service for production email sending

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for PostgreSQL connection
- SMTP configuration for email service
- All sensitive configuration through environment variables

### File Structure
- `client/`: Frontend React application
- `server/`: Backend Express application
- `shared/`: Shared TypeScript types and schemas
- `attached_assets/`: Static HTML files (legacy/reference)
- Root configuration files for build tools and dependencies