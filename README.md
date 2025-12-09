# Gaming_World

> A comprehensive full-stack gaming platform designed to showcase games, manage user libraries, and provide an immersive gaming experience with modern web technologies.

## 📋 Project Overview

Gaming_World is a full-stack web application that creates a centralized platform for gamers to explore, manage, and interact with their gaming libraries. The platform features a responsive frontend and a robust backend API with user authentication, game management, and library features.

## ✨ Features

- **User Authentication & Authorization** - Secure user registration and login system
- **Game Library Management** - Add, remove, and organize games in personal library
- **Game Catalog** - Browse extensive collection of games with detailed information
- **User Profiles** - Customizable user profiles with library statistics
- **Responsive Design** - Mobile-friendly UI that works seamlessly across all devices
- **Modern Architecture** - Clean separation of concerns with dedicated Frontend and Backend
- **Cloud Integration** - Cloud-based deployment capabilities for scalability

## 🏗️ Project Structure

```
Gaming_World/
├── Frontend/                # React-based UI application
│   ├── src/
│   ├── public/
│   └── package.json
├── Backend/                 # Spring Boot API server
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── README.md
└── .gitignore
```

## 🛠️ Technology Stack

### Frontend
- **React** - UI library for building interactive user interfaces
- **JavaScript (ES6+)** - Modern JavaScript for dynamic functionality
- **CSS & Tailwind CSS** - Styling and responsive design
- **Axios** - HTTP client for API communication

### Backend
- **Spring Boot** - Java framework for building RESTful APIs
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - ORM for database operations
- **MySQL/PostgreSQL** - Relational database for data persistence
- **Docker** - Containerization for deployment

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+) and npm
- Java JDK 11 or higher
- Maven
- Docker (optional, for containerized deployment)
- MySQL/PostgreSQL database

### Backend Setup

1. Navigate to the Backend directory
   ```bash
   cd Backend
   ```

2. Install dependencies and build the project
   ```bash
   mvn clean install
   ```

3. Configure database connection in `application.properties`
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gaming_world
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. Run the Spring Boot application
   ```bash
   mvn spring-boot:run
   ```

The API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the Frontend directory
   ```bash
   cd Frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Games
- `GET /api/games` - Get all games
- `GET /api/games/{id}` - Get game details
- `POST /api/games` - Add new game (Admin)
- `PUT /api/games/{id}` - Update game (Admin)
- `DELETE /api/games/{id}` - Delete game (Admin)

### User Library
- `GET /api/library` - Get user's game library
- `POST /api/library/add/{gameId}` - Add game to library
- `DELETE /api/library/remove/{gameId}` - Remove game from library

### User Profile
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile

## 🐳 Docker Deployment

To run the application using Docker:

```bash
# Build the Docker image for Backend
cd Backend
docker build -t gaming-world-api .
docker run -p 8080:8080 gaming-world-api

# Run Frontend (use Node image or build static files)
cd Frontend
docker build -t gaming-world-ui .
docker run -p 3000:3000 gaming-world-ui
```

## 📝 Recent Updates

- Refactored library pages for improved user experience
- Added cloud/virtualization features for scalability
- Enhanced user authentication mechanisms
- Optimized database queries for better performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and owned by Vamsee295. Please contact the project owner for usage and distribution rights.

## 👥 Contributors

- **Vamsee295** (Vamsee Krishna) - Project Lead
- **Bindu7729** - Contributor

## 📧 Contact

For questions or suggestions, feel free to reach out to the project maintainers.

---

**Happy Gaming! 🎮**
