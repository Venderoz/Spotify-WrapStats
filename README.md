# 🎵 Spotify Wrap-Stats

A **Fullstack** web application that integrates with the Spotify Web API to analyze and visualize your personal listening habits. This project combines a secure **Java Spring Boot** backend with a dynamic **React** frontend, offering deep insights into your top artists, tracks, and genre trends beyond the standard "Spotify Wrapped".

## ✨ Key Features

* 🔐 **Secure Authentication (OAuth 2.0)** – Login via the official Spotify portal using the Authorization Code Flow.
* 📊 **Deep Data Analysis** – View your Top Artists and Tracks across different time ranges (4 weeks, 6 months, All time).
* 🧠 **Smart Genre Analysis** – Custom "Two-Pass" algorithm that filters and groups redundant sub-genres (e.g., merging "pop" and "dance pop") for a cleaner chart.
* 📝 **Music Story** – An editorial-style narrative component that describes your current musical "vibe".
* 🎨 **Modern UI** – Responsive design featuring glassmorphism

---

## 🛠️ Tech Stack

### Backend
* **Java 17**
* **Spring Boot 3** (REST API)
* **Spotify Web API** (Wrapper / Http Interface)
* **Maven** (Dependency Management)

### Frontend
* **React** (Vite)
* **Chart.js** (Data Visualization)
* **CSS Modules** (Styling)

---

## 🔄 How It Works

1.  **User Action:** User clicks "Login with Spotify".
2.  **Authorization:** Spotify validates credentials and returns a temporary **Auth Code**.
3.  **Backend Processing:** The Java backend exchanges this code for a secure **Access Token**.
4.  **Data Fetching:** The backend performs parallel requests to fetch the user's Profile, History, and Top Items.
5.  **Visualization:** The React frontend receives the aggregated data and renders the interactive dashboard.

---

## 🚀 Getting Started

This project is designed to be run locally using an IDE (like IntelliJ IDEA, Eclipse, or VS Code).

### Prerequisites
1.  **Java JDK 17** or higher.
2.  **Node.js** and **npm**.
3.  A registered app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/):
    * Get your **Client ID** and **Client Secret**.
    * Set **Redirect URI** to: `http://localhost:5173/callback` (or your frontend port).

### Step 1: Backend Setup (Java)
1.  Open the `backend` folder in your IDE (e.g., IntelliJ IDEA).
2.  Configure your API keys in `src/main/resources/application.properties` or directly in the `SpotifyController` class (depending on your configuration).
3.  Allow Maven to download dependencies.
4.  Run the main application class (click the **Run** button).
    * *Server will start on port: 8080*

### Step 2: Frontend Setup (React)
1.  Open the `frontend` folder in your IDE or terminal.
2.  Install dependencies (first time only):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the application in your browser (usually `http://localhost:5173`).

---

## 📄 License
Created for educational purposes.

---
Created by **Ivan Soboliev**