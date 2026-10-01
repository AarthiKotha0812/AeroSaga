# AeroSaga 🚁
<<<<<<< HEAD
**Temporal.io Autonomous Drone Mission Control**

This repository contains the codebase for the AeroSaga project, simulating a logistics operator monitoring a fleet of 50 delivery drones via a 3D browser map. It uses a robust Temporal.io backend to manage long-running drone mission state, paired with a React and CesiumJS frontend for live 3D visualization.

## Development Progress

### Week 1: Foundation & 3D Scaffolding ✅
**Frontend Contributions (Completed):**
*   **Initialized React App:** Set up a lightning-fast React development environment using Vite.
*   **3D Earth Integration:** Swapped in **CesiumJS** (via `resium`) as the core 3D visualization engine to render a true 3D globe.
*   **Static Drone Markers:** Added stationary 3D drone `<Entity>` markers hovering at specific coordinates above the globe, preparing the UI for live telemetry.

**Backend Setup (Scaffolded):**
*   **Temporal Cluster:** Created a `docker-compose.yml` to easily spin up a local Temporal cluster and its Web UI.
*   **Spring Boot + Temporal SDK:** Initialized the Java backend structure (`AeroSagaApplication`).
*   **First Workflow:** Created the initial `DroneWorkflow` and `DroneActivity` stubs representing the drone's "Takeoff" command.

---

## How to Run the Frontend (Week 1)

1. Open your terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
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

## Java Development & Contributors

- Kotha Aarthi
- Anushka Patil
- Ramappa Yaragudri
- Siddhesh Dinesh Bhuvad
