# EduPath Kazakhstan - University Admission Platform

A modern, full-featured platform for students to explore and apply to top universities in Kazakhstan.

## Features

### Pages
- **Home** - Landing page with hero, trust indicators, benefits, and featured universities
- **Universities** - Searchable catalog of all universities with filters
- **University Detail** - In-depth information about each university with programs, admissions requirements
- **Apply** - Multi-step application form with progress tracking
- **Dashboard** - Student personal dashboard with application tracking
- **Services** - Pricing tiers and service information
- **About** - Company information and team profiles
- **Contact** - Contact form and office information

### Key Components
- **Responsive Navigation** - Fixed header with mobile menu
- **Hero Section** - Engaging hero with call-to-action
- **University Cards** - Display universities with ratings and quick info
- **Cost Calculator** - Interactive tool to estimate education costs
- **Benefits Section** - Showcase platform advantages
- **Testimonials** - Student success stories
- **Application Wizard** - Step-by-step form for applications
- **Dashboard** - Track application status and messages

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter (body), Manrope (headlines)

## Color Scheme

- **Primary**: Black (#000000)
- **Secondary**: Teal (#00687a)
- **Accent**: Light Blue (#acedff)
- **Background**: Light Gray (#f7f9fb)

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Home page
│   ├── universities/            # Universities catalog
│   │   ├── page.tsx
│   │   └── [id]/               # University detail page
│   ├── apply/                   # Application form
│   ├── dashboard/               # Student dashboard
│   ├── services/                # Services & pricing
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   └── layout.tsx               # Root layout
├── components/
│   ├── navbar.tsx               # Navigation component
│   ├── footer.tsx               # Footer component
│   ├── modal-cta.tsx           # CTA modal
│   └── sections/                # Page sections
│       ├── hero.tsx
│       ├── universities.tsx
│       ├── benefits.tsx
│       ├── cost-calculator.tsx
│       ├── testimonials.tsx
│       ├── how-it-works.tsx
│       ├── cta.tsx
│       └── trust-indicators.tsx
├── lib/
│   ├── utils.ts                 # Utility functions
│   └── constants.ts             # App constants
├── types/
│   └── index.ts                 # TypeScript types
└── public/                       # Static files
```

## Key Features

### Responsive Design
- Mobile-first approach
- Responsive grids and flexbox layouts
- Mobile navigation menu

### User Experience
- Smooth scrolling
- Interactive forms with validation
- Loading states and feedback
- Accessible components (ARIA labels)

### Performance
- Next.js optimization
- Image optimization
- Fast page loads
- SEO-friendly structure

## Customization

### Colors
Edit CSS variables in `app/globals.css` to customize the color scheme.

### Fonts
Modify font imports in `app/layout.tsx` to change typography.

### Content
Update university data in `lib/constants.ts` and individual page components.

## Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License - See LICENSE file for details

## Support

For questions or issues, please contact support@edupath.kz or visit our contact page.

---

Made with ❤️ for EduPath Kazakhstan
