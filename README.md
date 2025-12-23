# Gaming_World 🎮

> A next-generation full-stack gaming platform with premium visual effects, 3D interactions, and comprehensive game management features.

## 📋 Project Overview

Gaming_World is a full-stack web application that creates a premium gaming platform with world-class visual effects, featuring 3D card interactions, dynamic lighting, cinematic backgrounds, and comprehensive game management capabilities.

## ✨ Key Features

- **User Authentication & Profiles** - Secure login/register with customizable profiles
- **Game Library Management** - Browse, search, and manage your game collection
- **Shopping Cart & Wishlist** - Add games to cart and save favorites
- **3D Visual Effects & Animations** - Premium card interactions and cinematic backgrounds
- **Friends & Community System** - Connect with friends, chat, and join communities
- **Database-Backed Recommendations** - Personalized game discovery powered by user activity tracking

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14.2.6** - React framework
- **React 18** - UI library
- **TypeScript 5+** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion, GSAP** - Advanced animations
- **React Three Fiber** - 3D graphics

### Backend
- **Spring Boot 3.4** - Java framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database ORM
- **MySQL** - Relational database
- **JWT** - Token-based authentication

---

## 🎨 Interactive UI Components

### Core Components
- **Navigation** - Navigation Menu, Dropdown Menu, Context Menu, Menubar
- **Dialogs & Overlays** - Dialog, Alert Dialog, Popover, Hover Card, Tooltip
- **Forms** - Checkbox, Radio Group, Select, Slider, Switch, Label
- **Notifications** - Toast, Progress, Alert
- **Layout** - Accordion, Tabs, Collapsible, Scroll Area, Separator, Aspect Ratio

### Visual Effects
- **3D Effects** - Card hover transformations, Three.js animations
- **Animations** - Framer Motion transitions, GSAP timelines, Spotlight effects  
- **Dynamic UI** - Parallax scrolling, Floating particles, Glassmorphism, Cinematic backgrounds

### Custom Features
- Interactive game cards with hover effects
- Live search with quick results
- Real-time notifications
- Video trailer modal player
- Friend request system
- Sticky navigation with scroll effects

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ and npm
- **Java** 17+
- **Maven** 3.8+
- **MySQL** 8+

### Setup & Run

**Frontend:**
```bash
cd Frontend
npm install
npm run dev
# Open http://localhost:3000
```

**Backend:**
```bash
# 1. Configure database in Backend/src/main/resources/application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/gaming_world
# spring.datasource.username=root
# spring.datasource.password=your_password

# 2. Run backend
cd Backend
mvn clean install
mvn spring-boot:run
```

---

## 📦 Commands Reference

### Frontend Commands

```bash
npm install              # Install dependencies
npm run dev              # Start development server (port 3000)
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Check code quality
```

### Backend Commands

```bash
mvn clean install        # Clean & install dependencies
mvn spring-boot:run      # Run application
mvn compile              # Compile project
mvn test                 # Run tests
mvn package              # Create JAR file
mvn clean install -DskipTests  # Build without tests
```

### Database Commands

```bash
mysql -u root -p         # Login to MySQL
CREATE DATABASE gaming_world;  # Create database
USE gaming_world;        # Use database
SHOW TABLES;             # List all tables
```

---

## 🏗️ Project Structure

```
Gaming_World/
├── Frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── context/            # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Next.js pages
│   │   └── styles/             # Global styles
│   └── package.json
│
├── Backend/                     # Spring Boot Backend
│   ├── src/main/java/com/Gaming/Backend/
│   │   ├── controller/         # REST controllers
│   │   ├── service/            # Business logic
│   │   ├── repository/         # Data access
│   │   └── entity/             # Database entities
│   └── pom.xml
│
└── README.md
```

---

## 📄 License

This project is private and owned by **Vamsee295**. Contact the project owner for usage rights.

---

**Happy Gaming! 🎮✨**
