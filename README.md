# Recipes Project 🍳

A full-stack platform for sharing and managing recipes, with RESTful API integration and comprehensive database design. This application provides users with an intuitive interface to discover, create, and manage their favorite recipes.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Recipes Project is a modern web application designed to make recipe management easy and enjoyable. Whether you're a home cook or a culinary enthusiast, this platform allows you to discover new recipes, organize your favorites, and share your creations with the community.

## 🛠️ Tech Stack

### Frontend
- **TypeScript** - Type-safe JavaScript for robust client-side code
- **HTML** - Semantic markup for accessible web pages
- **CSS** - Responsive styling for beautiful UI design

### Backend
- **C#** - Robust server-side language for reliable API development
- **ASP.NET Core** - Modern framework for building scalable RESTful APIs

### Database
- **SQL Server** - Enterprise-grade relational database management system
- **T-SQL** - SQL Server-specific queries for data operations

## ✨ Features

- 📖 **Recipe Discovery** - Browse and search through a collection of recipes
- ➕ **Create Recipes** - Add new recipes with detailed ingredients and instructions
- ❤️ **Favorite Management** - Save and organize your favorite recipes
- 🔍 **Advanced Search** - Filter recipes by cuisine, difficulty level, and ingredients
- 👤 **User Profiles** - Manage your recipes and preferences
- 📱 **Responsive Design** - Access the platform from any device
- 🔐 **Authentication** - Secure user account management
- 🌟 **Ratings & Reviews** - Rate and review recipes from the community

## 📁 Project Structure

```
recipes_project/
├── frontend/                 # Client-side application
│   ├── src/
│   │   ├── components/      # React/Vue components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS stylesheets
│   │   ├── services/        # API service calls
│   │   └── assets/          # Images and static files
│   ├── public/              # Static assets
│   └── index.html           # Main HTML file
│
├── backend/                  # Server-side application
│   ├── Controllers/         # API endpoint controllers
│   ├── Models/              # Data models
│   ├── Services/            # Business logic
│   ├── Data/                # Database context and migrations
│   ├── Middleware/          # Custom middleware
│   └── appsettings.json     # Configuration file
│
├── database/                # Database scripts
│   ├── schema.sql           # Table definitions
│   ├── stored_procedures/   # Stored procedures
│   ├── seeds.sql            # Sample data
│   └── migrations/          # Database migrations
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14+) - For frontend development
- **.NET SDK** (6.0+) - For backend development
- **SQL Server** (2019+) - For database management
- **Git** - For version control

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Update the connection string in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER;Database=RecipesDB;Trusted_Connection=true;"
     }
   }
   ```

4. Run database migrations:
   ```bash
   dotnet ef database update
   ```

5. Start the backend server:
   ```bash
   dotnet run
   ```

   The API will be available at:
   ```
   http://localhost:5000
   ```

### Database Setup

1. Open **SQL Server Management Studio** (SSMS)

2. Execute the database initialization script:
   ```bash
   sqlcmd -S YOUR_SERVER -E -i database/schema.sql
   ```

3. (Optional) Seed sample data:
   ```bash
   sqlcmd -S YOUR_SERVER -E -i database/seeds.sql
   ```

4. Verify the database was created:
   ```sql
   SELECT name FROM sys.databases WHERE name = 'RecipesDB';
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Recipes
- `GET /recipes` - Get all recipes
- `GET /recipes/{id}` - Get a specific recipe
- `POST /recipes` - Create a new recipe
- `PUT /recipes/{id}` - Update a recipe
- `DELETE /recipes/{id}` - Delete a recipe
- `GET /recipes/search?query={query}` - Search recipes

#### Users
- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /users/{id}` - Get user profile
- `PUT /users/{id}` - Update user profile

#### Favorites
- `GET /users/{userId}/favorites` - Get user's favorite recipes
- `POST /users/{userId}/favorites/{recipeId}` - Add recipe to favorites
- `DELETE /users/{userId}/favorites/{recipeId}` - Remove recipe from favorites

#### Reviews
- `GET /recipes/{recipeId}/reviews` - Get reviews for a recipe
- `POST /recipes/{recipeId}/reviews` - Add a review
- `DELETE /reviews/{reviewId}` - Delete a review

## 🗄️ Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
```

#### Recipes
```sql
CREATE TABLE Recipes (
    RecipeId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    PrepTime INT,
    CookTime INT,
    Servings INT,
    Difficulty NVARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
```

#### Ingredients
```sql
CREATE TABLE Ingredients (
    IngredientId INT PRIMARY KEY IDENTITY(1,1),
    RecipeId INT NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Quantity DECIMAL(10,2),
    Unit NVARCHAR(50),
    FOREIGN KEY (RecipeId) REFERENCES Recipes(RecipeId) ON DELETE CASCADE
);
```

#### Instructions
```sql
CREATE TABLE Instructions (
    InstructionId INT PRIMARY KEY IDENTITY(1,1),
    RecipeId INT NOT NULL,
    StepNumber INT NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (RecipeId) REFERENCES Recipes(RecipeId) ON DELETE CASCADE
);
```

#### Reviews
```sql
CREATE TABLE Reviews (
    ReviewId INT PRIMARY KEY IDENTITY(1,1),
    RecipeId INT NOT NULL,
    UserId INT NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (RecipeId) REFERENCES Recipes(RecipeId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
```

#### Favorites
```sql
CREATE TABLE Favorites (
    FavoriteId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    RecipeId INT NOT NULL,
    AddedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (RecipeId) REFERENCES Recipes(RecipeId) ON DELETE CASCADE,
    UNIQUE(UserId, RecipeId)
);
```

## 💻 Usage

### Creating a Recipe

1. Click the "Create Recipe" button in the navigation
2. Fill in the recipe details:
   - Title and description
   - Preparation and cooking times
   - Number of servings
   - Difficulty level
3. Add ingredients with quantities and units
4. Add step-by-step instructions
5. Click "Save Recipe" to publish

### Searching for Recipes

1. Use the search bar on the home page
2. Filter by:
   - Cuisine type
   - Difficulty level
   - Cooking time
   - Dietary preferences
3. Click on a recipe to view full details

### Managing Favorites

1. Click the heart icon on any recipe to add/remove from favorites
2. View all favorites in your profile
3. Organize favorites into custom collections

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Cooking!** 👨‍🍳👩‍🍳

For questions or issues, please open an issue on the repository or contact the maintainers.
