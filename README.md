<div align="center">
  
# 🚁 AeroSaga

**Autonomous Drone Mission Control & Live 3D Telemetry**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![CesiumJS](https://img.shields.io/badge/CesiumJS-60B5CC?style=for-the-badge&logo=cesium&logoColor=white)](#)
*AeroSaga is an advanced autonomous mission control system built to manage and monitor a massive fleet of delivery drones via a highly immersive 3D browser dashboard.*

</div>

---

## 👥 Java Development & Contributors

This system is brought to life by an incredible engineering team:
*   🚀 **Kotha Aarthi**
*   🚀 **Anushka Patil**
*   🚀 **Ramappa Yaragudri**
*   🚀 **Siddhesh Dinesh Bhuvad**

---

## 👨‍💻 My Contribution: Frontend Engineering

As the **Lead Frontend Developer**, my primary focus is designing, building, and optimizing the interactive 3D command center. The goal is to provide a seamless, premium, and highly responsive user experience using modern web technologies.

### 🌟 Core Responsibilities
- **React Dashboard:** Architecting a scalable and maintainable UI framework.
- **3D Earth Visualization:** Integrating **CesiumJS** to render a highly accurate, interactive 3D globe.
- **Live Telemetry Streams:** Consuming high-frequency **WebSocket** data to paint real-time drone coordinates across the map.
- **Premium UI/UX:** Designing a sleek, glassmorphism-inspired interface with fluid animations and responsive layouts.

---

## 🚀 Weekly Development Progress (Step-by-Step)

<details open>
<summary><b>🟢 Week 2: Live Telemetry & Real-Time Drone Tracking (Completed)</b></summary>
<br/>
Successfully bridged the gap between the backend simulation and the frontend map, bringing the 3D globe to life with moving drones and glowing flight trails.

**My Frontend Tasks Completed:**
- [x] **WebSocket Integration:** Engineered the `useTelemetry.js` hook to establish a persistent WebSocket connection, parsing live GPS streams dynamically.
- [x] **Real-Time 3D Rendering:** Mapped incoming Latitude, Longitude, and Altitude data directly to CesiumJS `<Entity>` markers, creating smooth real-time movement.
- [x] **Glowing Flight Trails:** Developed a historical tracking array to render vibrant, translucent blue `<PolylineGraphics>` trails tracking behind the active drones.
- [x] **Glassmorphism HUD:** Designed a premium, animated UI panel (`TelemetryPanel.jsx`) displaying live drone metrics (Speed, Heading) and a pulsing connection status indicator.
</details>

<details open>
<summary><b>🟢 Week 1: Foundation & 3D Scaffolding (Completed)</b></summary>
<br/>
Laid the essential groundwork for the project, setting up the environments and rendering the base 3D globe.

**My Frontend Tasks Completed:**
- [x] **Vite & React Setup:** Initialized a lightning-fast modern web application.
- [x] **CesiumJS Engine:** Configured `resium` to project the high-fidelity 3D globe.
- [x] **Static Drone Mapping:** Implemented the initial `Cartesian3` coordinates and 3D drone tags to verify the UI placement.
</details>

---

## 🛠️ Frontend Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React (Vite)** | Lightning-fast component rendering and state management |
| **CesiumJS (Resium)** | High-performance 3D geospatial visualization |
| **WebSockets** | Low-latency, bi-directional live telemetry streaming |
| **Vanilla CSS** | Custom styling with glassmorphism and keyframe animations |

---

<<<<<<< HEAD
## ⚙️ How to Run the Frontend Dashboard

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install all necessary Node dependencies:**
   ```bash
   npm install
   ```
3. **Spin up the Vite development server:**
   ```bash
   npm run dev
   ```
4. Open your browser to the local URL (usually `http://localhost:5173`) to view the 3D globe and static drone markers!
=======
### Temporal.io Autonomous Drone Mission Control

AeroSaga is an autonomous drone mission control system that manages long-running drone missions and displays live drone information through a 3D web dashboard.

## 👨‍💻 My Contribution

I am responsible for the **Frontend Development** of the project.

### Frontend Responsibilities
- Building the dashboard using **React**
- Integrating **CesiumJS** for 3D Earth visualization
- Displaying live drone locations
- Showing drone mission and workflow status
- Integrating frontend with backend through **WebSockets**
- Designing a responsive and user-friendly command center

## 🛠️ Frontend Tech Stack

- React
- CesiumJS
- JavaScript
- WebSockets
- HTML
- CSS

## 📁 Frontend Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
├── public/
├── package.json
└── README.md
>>>>>>> origin/main
