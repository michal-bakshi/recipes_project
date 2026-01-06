# 🍰 Recipe Sharing Platform - Backend API

This repository contains the C# backend for a recipe sharing platform. It is built using **ASP.NET Core Web API** and implements a multi-layered architecture, utilizing **Entity Framework Core (Code First)** for data persistence with a SQL database.

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* **.NET SDK** (The version specified in `global.json` or compatible with your project files .NET 6.0 or later).
* **SQL Database** (e.g., SQL Server LocalDB, SQL Express, or a full SQL Server instance).
* **Visual Studio** or **Visual Studio Code** with C# extension.

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/michal-bakshi/backend_cs_recipes.git
    cd backend_cs_recipes/Webapi
    ```

2.  **Restore dependencies:**
    Open your terminal in the main project directory (`Webapi`) and run:
    ```bash
    dotnet restore
    ```

3.  **Database Configuration:**
    * Open the file `Webapi/appsettings.json` or `Webapi/appsettings.Development.json`.
    * Update the `DefaultConnection` string to point to your local SQL database instance.
        *Example (for SQL Server LocalDB):*
        ```json
        "ConnectionStrings": {
          "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=RecipeDb;Trusted_Connection=True;MultipleActiveResultSets=true"
        }
        ```

4. **Run Database Migrations:**
   Ensure your database is up-to-date with the models defined in the **Data** project using Entity Framework Core Migrations.
   ```bash
   # You might need to navigate to the Data project directory first
   # cd ../Data
   # dotnet ef database update 
   # Or run from the solution root:
   dotnet ef database update --project Dataf database update --project Data
    ```

5.  **Run the application:**
    Start the API from the `Webapi` project:
    ```bash
    dotnet run --project Webapi/Webapi.csproj
    ```
    The API should start and typically be accessible at `https://localhost:7076` (or the port defined in `launchSettings.json`).

---

## Architecture Overview

The project is structured into three main layers, following the principles of **Separation of Concerns**:

### 1. Core (`core` project)

* **Entities:** Defines the core business objects (`User.cs`, `Recipe.cs`, `Ingredient.cs`, `IngredientsForRecipe.cs`). These map directly to the database tables.
* **Interfaces:** Contains interfaces for the **Repositories** and **Services** layers (`IRecipeReposetory.cs`, `IRecipeService.cs`, etc.).

### 2. Data (`Data` project)

* **Data Context (`DataContext.cs`):** Manages the database connection and configuration (via **Entity Framework Core**). This is where your DbSet properties are defined.
* **Repositories:** Implements the repository pattern, handling all direct database access and logic for data manipulation (CRUD operations). Examples: `RecipeReposetory.cs`, `UserReposetory.cs`.

### 3. Service (`service` project)

* **Business Logic:** Implements the service interfaces defined in **Core**. This layer contains the primary business rules and application logic, coordinating data access from the Repositories. Examples: `RecipeService.cs`, `UserSevice.cs`.

### 4. Web API (`Webapi` project)

* **Controllers:** Acts as the entry point for HTTPS requests. It routes requests to the appropriate services and returns HTTPS responses. Examples: `RecipeController.cs`, `UersController.cs`.
* **Dependency Injection (DI):** Configured in `Program.cs` to manage the lifetime of services and repositories.

---

##  API Endpoints (Controllers)

The following main controllers expose the API's functionality:

* **`UersController`**: Handles user-related operations (e.g., login, registration, getting user details).
* **`RecipeController`**: Manages recipe-related operations (e.g., getting all recipes, adding a new recipe, updating a recipe).
* **`IngredientsController`**: Provides access to ingredient data.
* **`IngredientsForRecipeController`**: Manages the relationship between recipes and their ingredients.
* **`ImagesController`**: Handles file serving or uploading, as indicated by the presence of a dedicated controller.

---

## 🛠️ Key Technologies

* **Backend Framework:** ASP.NET Core Web API
* **Language:** C#
* **Database Access:** Entity Framework Core
* **Database:** SQL (configured via connection string)

---

## Contribution

If you would like to contribute, please feel free to fork the repository and submit a pull request with your changes.
