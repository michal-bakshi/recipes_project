# 🧁 Recipe Sharing Platform - Frontend Application

This repository contains the front-end application for the Recipe Sharing Platform. It is built using **Angular** and is designed to interact with the C# ASP.NET Core Web API backend.

---

##  Features

* **User Management:** Register and Login via the API (`/login`, `/register`).
* **Recipe Display:** View a gallery of available recipes (Home Page).
* **Detailed View:** Get full details, including ingredients and steps, for any recipe.
* **Recipe Submission:** Users can add new recipes to the platform (if logged in).
* **Navigation:** Clear navigation bar to move between sections.

---

## 🛠️ Technology Stack

* **Framework:** Angular
* **Language:** TypeScript, HTML, CSS
* **Styling:** Bootstrap 5 (used for responsive design and components)
* **HTTPS Communication:** Angular's `HttpClient` for API calls to the C# backend.

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

* **Node.js and npm (Node Package Manager)** (latest LTS version recommended).
* **Angular CLI** (Command Line Interface). If you don't have it, install globally:
    ```bash
    npm install -g @angular/cli
    ```
* **Running Backend Server:** Ensure the C# backend API is running and accessible (typically on `https://localhost:4200`).

### Installation and Setup

1.  **Clone the repository and navigate to the project directory:**
    ```bash
    git clone https://github.com/michal-bakshi/fronted_recipes.git
    cd fronted_recipes
    ```

2.  **Install Dependencies:**
    Use npm to download and install all required libraries and dependencies defined in `package.json`:
    ```bash
    npm install
    ```

3.  **Configure API URL (If Necessary):**
    The application is configured to communicate with the backend. Check your Services (e.g., `src/service/Recipe.service.ts`) to ensure the base URL for the API matches where your C# server is running.

4. **Run the application:**
    Start the Angular development server using the script defined in `package.json`:
    
    ```bash
    npm start
    ```
    
    *(This command runs the underlying `ng serve` command, which starts the server and watches for changes.)*
    
    The application will automatically reload if you change any of the source files. The front-end is typically accessible in your web browser at `http://localhost:4200`.

---

## 📁 Project Structure Highlights

The application follows a standard Angular structure, emphasizing modularity and separation of concerns:

| Directory | Description |
| :--- | :--- |
| `src/app/` | Core application components, pipes, and main module configuration. |
| `src/components/` | Contains all the main user interface features (e.g., `login`, `register`, `home-page`, `add-recipe`). |
| `src/service/` | Houses Angular Services responsible for all business logic, data fetching, and communicating with the backend API. |
| `src/Interface/` | Defines TypeScript interfaces for data models (e.g., `Recipe.interface.ts`, `User.interface.ts`). |

---

## Application Screenshots

Here are some examples of the application interface:

### Home Page Showcase
A clean display of the available recipes.
![](/my-project/public/home_page.png)


### Detailed Recipe View
A view showcasing the ingredients, steps, and preparation time.
![](/my-project/public/recipe_details.png)


---