# 🎵 Spotify Wrap-Stats

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://spotifywrapstats.netlify.app)

A **Production-Ready Fullstack** web application that analyzes and visualizes your personal listening habits. This project features a containerized **Java Spring Boot** backend and a **React** frontend, delivering deep insights into your music story.

## 🔗 Live Application
* **Frontend:** [https://spotifywrapstats.netlify.app](https://spotifywrapstats.netlify.app)
* **Backend API:** [https://spotify-wrapstats.onrender.com](https://spotify-wrapstats.onrender.com)

## ✨ Key Features

* 🔐 **Production OAuth 2.0 Flow** – Secure authentication using Spotify's official Authorization Code Flow.
* 📊 **Dynamic Insights** – Interactive charts for Top Artists and Tracks (Vite + Chart.js).
* 🧠 **Genre Filtering** – Custom logic to group redundant sub-genres for cleaner data visualization.
* 📝 **Personalized Music Story** – An automated narrative summarizing your current musical "vibe".

## 🛠️ Tech Stack & Deployment

### Backend (Deployed on Render)
* **Java 25 / Spring Boot 3** – RESTful API.
* **Docker** – Multi-stage build for optimized production images.
* **Spotify Web API** – Integration for real-time user data.

### Frontend (Deployed on Netlify)
* **React (Vite)** – Modern, high-performance frontend.
* **Chart.js / React-Icons** – Data visualization and polished UI components.
* **SPA Routing** – Netlify redirect rules for seamless navigation.

## 🔄 Production Architecture

1.  **Frontend (Netlify):** Requests a login URL from the backend.
2.  **Auth Flow:** User authenticates via Spotify; Spotify redirects back to the Netlify production URL with an `auth_code`.
3.  **Backend (Render/Docker):** The Spring Boot service exchanges the code for tokens and fetches the user's data.
4.  **Security:** Cross-Origin Resource Sharing (CORS) is strictly limited to the production frontend domain.

## 🚀 Local Development

### Prerequisites
* **JDK 25** (or update `pom.xml` for older versions).
* **Node.js & npm**.
* Spotify Developer credentials.

### Installation
1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Venderoz/spotify-wrap-stats.git
    ```
2.  **Backend:** Configure `application.properties` with your `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI`. Run via IDE or `mvn spring-boot:run`.
3.  **Frontend:** ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *Note: Ensure `.env` contains `VITE_API_URL=http://localhost:8080`*

---
## 📄 License & Credits
Created for educational purposes and portfolio demonstration.
**Author:** Ivan Soboliev