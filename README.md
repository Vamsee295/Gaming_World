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

## 🏗️ Project Structure

```
Gaming_World/
├── Frontend/                           # Next.js Frontend Application
│   ├── src/
│   │   ├── components/                # Reusable components
│   │   │   ├── ui/                   # UI components
│   │   │   ├── effects/              # Visual effects
│   │   │   ├── friends/              # Friend features
│   │   │   └── Images/               # Image assets
│   │   ├── context/                  # React contexts
│   │   ├── hooks/                    # Custom hooks
│   │   ├── pages/                    # Next.js pages
│   │   │   ├── index.tsx            # Home/Store page
│   │   │   ├── game/[id].tsx        # Game details
│   │   │   ├── library/
│   │   │   ├── store/               # Cart, transaction, wishlist
│   │   │   ├── community/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── support/
│   │   └── styles/
│   │       └── globals.css          # Global styles
│   ├── public/                       # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── Backend/                           # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/Gaming/Backend/
│   │       │   ├── controller/      # REST controllers
│   │       │   ├── service/         # Business logic
│   │       │   ├── repository/      # Data access
│   │       │   └── entity/          # Database entities
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── Dockerfile
│
└── README.md                          # This file
```

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14.2.6** - React framework
- **React 18** - UI library
- **TypeScript 5+** - Type safety
- **Tailwind CSS 3** - Utility-first styling

### Backend
- **Spring Boot** - Java framework
- **Spring Security** - Authentication
- **Spring Data JPA** - Database ORM
- **MySQL** - Database

---

## 🚀 Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** 16+ and npm
- **Java** 17+
- **Maven** 3.8+
- **MySQL** 8+

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Backend Setup

1. **Configure MySQL Database**
   
   Create a database and update `Backend/src/main/resources/application.properties`:
   
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gaming_world
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

2. **Run Backend**
   
   ```bash
   cd Backend
   mvn clean install
   mvn spring-boot:run
   ```

---

## 📄 License

This project is private and owned by **Vamsee295**. Contact the project owner for usage rights.

---

**Happy Gaming! 🎮✨**
