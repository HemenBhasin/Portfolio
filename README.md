# Hemen Bhasin | Interactive Portfolio

Welcome to the source code of my interactive, animated Full-Stack Development & AI/NLP portfolio. This project was meticulously crafted to provide a cinematic, premium browsing experience using modern web technologies and advanced 3D visual elements.

![Portfolio Preview](public/favicon.svg) <!-- Replace with an actual screenshot of the portfolio -->

## ✨ Key Features

- **Cinematic Aesthetic:** Features full-screen video background loops with luminosity blending and frosted glassmorphism overlays to create depth and focus.
- **macOS-Style Dock Navigation:** A dynamic, physics-based bottom navigation dock powered by Framer Motion, providing seamless smooth-scrolling between sections.
- **3D Interactive Map:** A customized GTA V-style interactive 3D map built with `maplibre-gl`, featuring 3D pitch/tilt, a pulsating radar blip, and authentic HUD elements pinpointing my exact location.
- **Liquid Glass UI:** Custom CSS implementation of advanced glassmorphism (`.liquid-glass-strong`) that beautifully blurs the dynamic backgrounds behind content cards.
- **Micro-interactions & Animations:** Extensive use of `framer-motion` for entry animations and `gsap` for continuous ambient animations (like the infinite scrolling marquee).
- **Responsive Layout:** fully optimized grid systems that adapt perfectly from mobile to ultra-wide desktop displays.

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS for complex blend modes
- **Animation:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Mapping:** [MapLibre GL JS](https://maplibre.org/)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HemenBhasin/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm run dev
   ```

4. **Build for production:**
   ```bash
   pnpm run build
   ```

## 📂 Project Structure

- `/src/components/` - Contains all the major UI sections (`Hero`, `SelectedWorks`, `Education`, `Contact`, etc.)
- `/src/components/ui/` - Contains reusable, interactive core components like the `map.tsx` and the `dock.tsx`.
- `/src/index.css` - Global stylesheet containing custom utility classes like `.liquid-glass-strong` and specific animations.
- `/public/` - Static assets including background videos, project thumbnails, and vector icons.

## 🤝 Let's Connect

- **GitHub:** [@HemenBhasin](https://github.com/HemenBhasin)
- **Email:** hemenbhasin@gmail.com
- **Location:** Patiala, Punjab, India

---
*Built with passion, coffee, and React.*
