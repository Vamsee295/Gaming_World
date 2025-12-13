# Gaming_World 🎮

> A next-generation full-stack gaming platform with premium visual effects, 3D interactions, and comprehensive game management features.

[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-cyan)](https://tailwindcss.com/)

## 📋 Project Overview

Gaming_World is a full-stack web application that creates a premium gaming platform with world-class visual effects, featuring 3D card interactions, dynamic lighting, cinematic backgrounds, and comprehensive game management capabilities.

---

## 🏗️ Complete Project Structure

```
Gaming_World/
├── Frontend/                           # Next.js Frontend Application
│   ├── src/
│   │   ├── components/                # Reusable components
│   │   │   ├── ui/                   # UI components
│   │   │   │   ├── Card3D.tsx       # 3D hover tilt cards
│   │   │   │   ├── Carousel3D.tsx   # 3D rotating carousel
│   │   │   │   ├── HoverVideoPreview.tsx
│   │   │   │   ├── DynamicGameCard.tsx
│   │   │   │   ├── LazyImage.tsx
│   │   │   │   ├── SoundToggle.tsx
│   │   │   │   ├── SkipToContent.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── slider.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   └── tabs.tsx
│   │   │   ├── effects/              # Visual effects
│   │   │   │   ├── AmbientParticles.tsx
│   │   │   │   ├── CinematicBackground.tsx
│   │   │   │   └── ParallaxSection.tsx
│   │   │   ├── friends/              # Friend features
│   │   │   │   ├── FriendsChat.tsx
│   │   │   │   └── FriendsSidebar.tsx
│   │   │   └── Images/               # Image assets
│   │   ├── context/                  # React contexts
│   │   │   ├── CartContext.tsx
│   │   │   ├── WishlistContext.tsx
│   │   │   ├── UserContext.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   └── SoundContext.tsx
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useDynamicColors.ts
│   │   │   └── useMediaQuery.ts
│   │   ├── pages/                    # Next.js pages
│   │   │   ├── index.tsx            # Home/Store page
│   │   │   ├── _app.tsx
│   │   │   ├── _document.tsx
│   │   │   ├── game/
│   │   │   │   └── [id].tsx         # Game details
│   │   │   ├── library/
│   │   │   ├── store/
│   │   │   │   ├── cart.tsx
│   │   │   │   ├── transaction.tsx
│   │   │   │   └── wishlist.tsx
│   │   │   ├── community/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── support/
│   │   └── styles/
│   │       └── globals.css          # Global styles with 370+ lines
│   ├── public/                       # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── Backend/                           # Spring Boot Backend (if present)
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
└── README.md                          # This file
```

---

## ✨ Features

### 🎨 Visual Enhancements (120+ Features)
- **3D Hover Tilt Cards** - Mouse-tracking 3D transforms
- **Animated Gradient Glows** - Premium button animations
- **Micro-Animations** - Heart pop, ripple effects, price animations
- **Ambient Particles** - Subtle floating particles (50 particles, 0.05 opacity)
- **Cinematic Backgrounds** - Video backgrounds with auto-pause
- **3D Carousel** - Rotating perspective carousel
- **Dynamic Lighting** - Color extraction from game art
- **Hover Video Previews** - Image to video on hover
- **Glassmorphism** - Frosted glass effects (4 variants)
- **Sound System** - Optional UI sounds with localStorage

### 🎮 Core Features
- **User Authentication** - Secure login/register system
- **Game Library** - Personal game collection management
- **Shopping Cart** - Add games to cart and checkout
- **Wishlist** - Save favorite games
- **Transactions** - Purchase flow with payment
- **User Profiles** - Customizable profiles with avatars
- **Friends System** - Add friends, chat, view activity
- **Community Features** - Forums, groups, events
- **Search & Filters** - Find games by genre, price, rating
- **Responsive Design** - Works on all devices

### ⚡ Performance & Accessibility
- **Lazy Loading** - Intersection Observer for images
- **Reduced Motion Support** - Respects user preferences
- **Mobile Optimizations** - Disabled heavy effects on mobile
- **Focus Indicators** - Keyboard navigation support
- **Screen Reader Support** - ARIA labels throughout
- **Skip to Content** - Accessibility navigation link

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14.2.6** - React framework
- **React 18** - UI library
- **TypeScript 5+** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **tsParticles** - Particle effects
- **React Scroll Parallax** - Parallax scrolling
- **Color Thief** - Color extraction

### Backend (if applicable)
- **Spring Boot** - Java framework
- **Spring Security** - Authentication
- **Spring Data JPA** - Database ORM
- **MySQL/PostgreSQL** - Database

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 14+ and npm
- **Java JDK 11+** (for backend)
- **Maven** (for backend)

### Frontend Setup

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Backend Setup (if present)

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   mvn clean install
   ```

3. **Configure database** in `application.properties`
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gaming_world
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. **Run application**
   ```bash
   mvn spring-boot:run
   ```

---

## 📦 NPM Commands Used

### Core Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Phase 2 Packages (Cinematic Effects)
```bash
npm install tsparticles @tsparticles/react @tsparticles/slim react-scroll-parallax
```

### Phase 3 Packages (Dynamic Lighting)
```bash
npm install colorthief
```

### All Dependencies
```bash
# Install all required packages at once
npm install framer-motion lucide-react next react react-dom
npm install -D typescript @types/react @types/node tailwindcss postcss autoprefixer
npm install tsparticles @tsparticles/react @tsparticles/slim
npm install react-scroll-parallax colorthief
```

---

## 📂 Key Files & Their Purpose

### Components

| File | Purpose |
|------|---------|
| `Card3D.tsx` | 3D tilt effect on mouse hover |
| `Carousel3D.tsx` | 3D rotating carousel for featured games |
| `HoverVideoPreview.tsx` | Video preview on hover |
| `DynamicGameCard.tsx` | Color-adaptive cards with extracted colors |
| `AmbientParticles.tsx` | Floating particle background |
| `CinematicBackground.tsx` | Video backgrounds |
| `SoundContext.tsx` | Audio management system |
| `LazyImage.tsx` | Lazy loading images |
| `SkipToContent.tsx` | Accessibility navigation |

### Hooks

| File | Purpose |
|------|---------|
| `useDynamicColors.ts` | Extract colors from game art |
| `useMediaQuery.ts` | Mobile/reduced motion detection |

### Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `index.tsx` | Home/Store page |
| `/game/[id]` | `game/[id].tsx` | Game details |
| `/store/cart` | `store/cart.tsx` | Shopping cart |
| `/store/transaction` | `store/transaction.tsx` | Checkout |
| `/store/wishlist` | `store/wishlist.tsx` | Wishlist |

---

## 🎨 CSS Classes

### Glassmorphism
- `.glass` - Light frosted glass
- `.glass-dark` - Dark frosted glass (navigation)
- `.glass-light` - Enhanced blur
- `.glass-panel` - Premium panels

### Animations
- `.glow-gradient` - Constant gradient animation
- `.glow-gradient-hover` - Hover-activated glow
- `.badge-glow` - Pulsing badge
- `.animate-heart-pop` - Heart pop animation
- `.btn-ripple` - Button ripple effect
- `.price-shake` - Price shake animation
- `.price-slide-in` - Price slide in
- `.price-glow` - Green glow pulse

### 3D Effects
- `.card-3d` - 3D card container
- `.card-3d-content` - 3D content layer

---

## 📡 API Routes (Next.js API)

```
/api/auth/*        - Authentication endpoints
/api/games/*       - Game data endpoints
/api/library/*     - User library endpoints
/api/users/*       - User profile endpoints
```

---

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t gaming-world-frontend .

# Run container
docker run -p 3000:3000 gaming-world-frontend
```

---

## 📊 Project Stats

- **13 Components** created for visual effects
- **370+ lines** of custom CSS
- **120+ features** implemented
- **5 Implementation Phases** completed
- **25+ Routes** configured and tested

---

## 🎯 Implementation Phases

### Phase 1: High-Impact Effects ✅
- 3D hover tilt cards
- Animated gradient glows
- Micro-animations

### Phase 2: Cinematic Upgrades ⚠️
- Ambient particles (awaiting install)
- Cinematic backgrounds
- Enhanced sections

### Phase 3: Advanced Features ✅
- 3D carousel
- Dynamic lighting from game art
- Hover video previews

### Phase 4: Design Polish ✅
- Glassmorphism (4 variants)
- Sound system with toggle

### Phase 5: Performance & Accessibility ✅
- Mobile optimizations
- Reduced motion support
- Lazy loading
- ARIA labels & focus indicators

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is private and owned by **Vamsee295**. Contact the project owner for usage rights.

---

## 👥 Contributors

- **Vamsee295** (Vamsee Krishna) - Project Lead & Full Stack Developer
- **Bindu7729** - Contributor

---

## 📧 Contact

For questions or suggestions, contact the project maintainers.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- tsParticles for particle effects

---

**Happy Gaming! 🎮✨**

*Built with ❤️ by the Gaming World team*
