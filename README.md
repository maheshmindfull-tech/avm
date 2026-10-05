# AVM — Premium Real Estate Website & Lead Management System

A high-converting, architecture-led web application built for **AVM**, a specialized real estate advisory firm connecting discerning homebuyers with verified residential developments through an accredited channel partner network.

---

## ✨ Features & Highlights

- **Refined Architectural Design**: Editorial typography (*Newsreader* serif + *Figtree* sans-serif), natural earth-and-forest color palette, micro-animations with Framer Motion, and mobile-first responsive layout.
- **Dynamic Project Showcase**: Search and multi-criteria filtering across locations, property types, and configurations.
- **Dedicated Project Detail Pages**: High-resolution imagery, interactive thumbnail gallery, status indicators, key amenities checklist, and pre-populated sticky enquiry form.
- **Channel Partner Transparency**: Honest and transparent presentation of the AVM advisory model, RERA compliance verification, zero-brokerage primary sales, and the 6-step journey from Search to Possession.
- **Production Lead Capture & Google Sheets Integration**:
  - Direct connection to a Google Sheets database via a serverless Google Apps Script Web App.
  - Zero credential exposure on client-side code.
  - Honeypot anti-spam protection and double-submission safeguards.
  - Unique lead tracking ID generation (`AVM-YYYYMMDD-XXXXX`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, Vite |
| **Routing** | React Router v7 |
| **Styling** | Tailwind CSS v3, PostCSS, Autoprefixer |
| **Typography** | Newsreader (editorial serif), Figtree (modern sans) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion, CSS custom transitions |
| **Serverless Integration** | Google Apps Script Web App endpoint writing to Google Sheets |

---

## 📂 Project Directory Structure

```
AVM/
├── google-apps-script/
│   ├── Code.gs                # Production Apps Script webhook endpoint
│   └── README.md              # Step-by-step Google Sheets setup guide
├── public/
│   └── favicon.svg            # Custom AVM SVG favicon
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   └── EnquiryForm.jsx     # Reusable lead form with validation & honeypot
│   │   ├── layout/
│   │   │   ├── Container.jsx       # Layout width constraint
│   │   │   ├── Footer.jsx          # Brand footer with navigation & contact info
│   │   │   ├── Navbar.jsx          # Responsive nav with scroll transition
│   │   │   └── ScrollToTop.jsx     # Smooth scroll restoration on route changes
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx     # Listing card with status badges & hover effects
│   │   │   ├── ProjectFilters.jsx  # Search bar and dropdown filters
│   │   │   └── ProjectGrid.jsx     # Responsive grid with empty state handling
│   │   ├── sections/
│   │   │   ├── AboutPreview.jsx    # Home about preview
│   │   │   ├── ContactCTA.jsx      # High-conversion bottom CTA banner
│   │   │   ├── FeaturedProjects.jsx# Top highlighted projects
│   │   │   ├── Gallery.jsx         # Architecture photo gallery with lightbox
│   │   │   ├── Hero.jsx            # Full-bleed hero with dual CTAs
│   │   │   ├── HowItWorks.jsx      # 6-step Search to Possession process
│   │   │   └── WhyChooseAVM.jsx    # Core value proposition cards
│   │   └── ui/
│   │       ├── Button.jsx          # Polymorphic button / link component
│   │       ├── SectionHeading.jsx  # Consistent section header with eyebrow label
│   │       └── StateDisplays.jsx   # Loading, empty, and error state components
│   ├── data/
│   │   └── projects.js             # Verified demo project listings & taxonomy
│   ├── hooks/
│   │   ├── useEnquiryForm.js       # Form state, validation & submission hook
│   │   └── useScrollAnimation.js   # Viewport intersection animation hook
│   ├── pages/
│   │   ├── AboutPage.jsx           # Brand story, guiding standards, and process
│   │   ├── ContactPage.jsx         # Advisory desk, FAQ accordion, and inquiry form
│   │   ├── HomePage.jsx            # Assembled landing experience
│   │   ├── NotFoundPage.jsx        # 404 page with navigation options
│   │   ├── ProjectDetailPage.jsx   # Comprehensive project details & sticky inquiry
│   │   └── ProjectsPage.jsx        # Searchable and filterable project catalogue
│   ├── services/
│   │   ├── enquiryService.js       # Async submission layer to Google Apps Script
│   │   └── projectService.js       # Project retrieval and filtering layer
│   ├── utils/
│   │   └── helpers.js              # ID generator, formatters, validation utilities
│   ├── App.jsx                     # Route definitions & application shell
│   ├── index.css                   # Custom theme tokens & Tailwind layers
│   └── main.jsx                    # React root entry point
├── .env.example                    # Environment variable template
├── package.json                    # Project dependencies & scripts
├── tailwind.config.js              # Brand color palette & typography tokens
└── vite.config.js                  # Vite configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your deployed Google Apps Script Web App URL:
```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
*(If left blank, the application will display a graceful fallback notice instead of crashing).*

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📑 Lead Integration Setup

Refer to the detailed guide in [`google-apps-script/README.md`](file:///c:/Projects/AVM/google-apps-script/README.md) to set up your Google Sheet in less than 3 minutes.
