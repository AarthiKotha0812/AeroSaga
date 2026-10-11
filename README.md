<div align="center">

# 🚁 AeroSaga
### **Autonomous Drone Fleet Mission Control & Live 3D Geospatial Telemetry**

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![CesiumJS](https://img.shields.io/badge/CesiumJS-60B5CC?style=for-the-badge&logo=cesium&logoColor=white)](#)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](#)
[![Temporal](https://img.shields.io/badge/Temporal.io-000000?style=for-the-badge&logo=temporal&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)

<p align="center">
  <strong>Next-Generation Mission Control System for Autonomous UAV Fleets</strong><br>
  Real-time 3D airspace globe rendering, live flight polyline trajectories, dynamic Temporal activity DAG orchestration, and sub-second fleet metrics.
</p>

</div>

---

## 📌 Table of Contents
- [System Architecture](#-system-architecture)
- [Complete Technology Stack](#-complete-technology-stack)
- [Weekly Progress Roadmap](#-weekly-progress-roadmap)
  - [Week 1: 3D Scaffolding & Geospatial Foundation](#week-1-3d-scaffolding--geospatial-foundation)
  - [Week 2: Live Telemetry & 50–100 Drone Stress Benchmark](#week-2-live-telemetry--50100-drone-stress-benchmark)
  - [Week 3: Workflow UI – Live Mission DAG](#week-3-workflow-ui--live-mission-dag)
- [Key Features & Capabilities](#-key-features--capabilities)
- [Quick Start Guide](#-quick-start-guide)
- [Review Session Live Demo Script](#-review-session-live-demo-script)
- [Engineering Team](#-engineering-team)

---

## 🏗 System Architecture

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 AeroSaga Architecture                                  │
└────────────────────────────────────────────────────────────────────────────────────────┘

    [ CesiumJS 3D Globe ]          [ Temporal DAG Panel ]          [ Telemetry Panel ]
    • 3D WGS84 Coordinates         • Interactive State DAG         • Fleet Metrics (Active/Idle)
    • Sampled Polyline Trails      • Check Battery -> RTB          • Live FPS & 10Hz Monitor
    • Dynamic Drone Markers        • Dispatch Trigger Action       • Aircraft Selection Roster
              ▲                              ▲                              ▲
              │                              │                              │
              └──────────────────────────────┴──────────────────────────────┘
                                             │
                                    [ React 18 + Vite ]
                                             │
                   ┌─────────────────────────┴─────────────────────────┐
                   │                                                   │
        [ useFleetSimulation Hook ]                           [ useTelemetry Hook ]
        (Deterministic 50-100 Fleet)                         (Live WebSocket Streaming)
                   │                                                   │
                   │                                                   ▼
                   │                                         [ Spring Boot Backend ]
                   │                                         (Port: 8082 / REST API)
                   │                                                   │
                   ▼                                                   ▼
         Client 10Hz Physics                               [ Temporal Workflow Engine ]
                                                           • Activity Orchestration
                                                           • Task Queue: DRONE_TASK_QUEUE
                                                           • Cassandra Persistence
```

---

## 💻 Complete Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `v18.3.1` | Declarative UI, state orchestration, component lifecycle |
| **Build Tool & Bundler** | **Vite** | `v5.4.2` | Lightning-fast HMR development server and optimized bundle |
| **Geospatial & 3D Core** | **CesiumJS** | `v1.119+` | True 3D globe ellipsoidal rendering, pitch/yaw/roll camera controls |
| **React 3D Bindings** | **Resium** | `v1.17.2` | Declarative React wrappers for Cesium Viewer, Entities, & Polylines |
| **Backend Framework** | **Spring Boot** | `v3.x` | RESTful API controllers, WebSocket dispatching, Temporal workers |
| **Workflow Engine** | **Temporal.io** | `v1.20+` | Durable, fault-tolerant state machine & activity orchestration |
| **Database & Cache** | **Apache Cassandra** | `v3.11` | High-throughput distributed storage for Temporal history |
| **Containerization** | **Docker & Compose** | `v3.8` | Multi-container orchestration (`temporal`, `cassandra`, `temporal-ui`) |
| **Styling & FX** | **Modern CSS3** | — | Glassmorphism (`backdrop-filter`), Cyberpunk radar pulse animations, CSS Grid |

---

## 📅 Weekly Progress Roadmap

```text
  Week 1: 3D Scaffolding           Week 2: Telemetry & Benchmark       Week 3: Workflow DAG
  ┌───────────────────────┐       ┌───────────────────────────┐       ┌───────────────────────┐
  │  React 18 + Resium    │  ──▶  │  50–100 Drone Simulation  │  ──▶  │  Live Temporal DAG    │
  │  3D CesiumJS Globe    │       │  Live Sampled Trails      │       │  Node State Machines  │
  │  Static 3D Markers    │       │  FPS & Velocity Monitor   │       │  Dispatch Automation  │
  └───────────────────────┘       └───────────────────────────┘       └───────────────────────┘
          [ COMPLETE ]                     [ COMPLETE ]                       [ COMPLETE ]
```

<details open>
<summary><h3>✅ Week 1: 3D Scaffolding & Geospatial Foundation</h3></summary>

* **React & Vite Scaffolding:** Initialized high-performance project structure with rapid Hot Module Replacement (HMR).
* **CesiumJS & Resium Integration:** Configured 3D WGS84 globe viewport with custom camera bounds targeting the San Francisco Bay Area airspace.
* **Geospatial Entities:** Built [`DroneMarker.jsx`](file:///c:/Users/rames/OneDrive/Documents/projects/AeroSaga/frontend/src/components/DroneMarker.jsx) with custom color semantics:
  * 🟢 **Active** (`#54e0c1`)
  * 🟡 **Idle** (`#f4b942`)
  * ⚪ **Offline** (`#8b949e`)
* **Camera Flight Automation:** Auto-flyTo orientation centering upon selected aircraft coordinates on startup.

</details>

<details open>
<summary><h3>✅ Week 2: Live Telemetry & 50–100 Drone Visual Benchmark</h3></summary>

* **Fleet Physics Simulation:** Engineered [`useFleetSimulation.js`](file:///c:/Users/rames/OneDrive/Documents/projects/AeroSaga/frontend/src/hooks/useFleetSimulation.js) running deterministic multi-axis orbital trajectories with pitch, altitude oscillation, and battery drain.
* **Sampled 3D Flight Trails:** Created [`DroneTrail.jsx`](file:///c:/Users/rames/OneDrive/Documents/projects/AeroSaga/frontend/src/components/DroneTrail.jsx) rendering 3D polyline ribbons showing the last 18 flight waypoints without memory leakage.
* **Interactive Operations Dashboard:** Built [`TelemetryPanel.jsx`](file:///c:/Users/rames/OneDrive/Documents/projects/AeroSaga/frontend/src/components/TelemetryPanel.jsx) displaying:
  * Fleet counts: Total, Active, Idle, Offline.
  * Selected drone parameters: Altitude (m), Speed (km/h), Heading (°), Battery (%), and Lat/Lng coordinates.
* **High-Load Performance Benchmark:** Implemented fleet slider testing **50 through 100 concurrent aircraft**, verifying stable 60 FPS rendering and a 10 Hz telemetry tick engine.
* **WebSocket Integration Layer:** Implemented [`useTelemetry.js`](file:///c:/Users/rames/OneDrive/Documents/projects/AeroSaga/frontend/src/hooks/useTelemetry.js) hook with automated auto-reconnect backoff for live backend streaming.

</details>

<details open>
<summary><h3>✅ Week 3: Workflow UI – Live Mission DAG (Directed Acyclic Graph)</h3></summary>

* **Live Activity DAG Side-Panel:** Built [`WorkflowPanel.jsx`](file:///c:/Users/rames/OneDrive/Documents/projects/AeroSaga/frontend/src/components/WorkflowPanel.jsx) displaying the live mission sequence mirrored after Temporal activities:
  $$\text{Check Battery} \longrightarrow \text{Takeoff} \longrightarrow \text{Navigate} \longrightarrow \text{Drop Package} \longrightarrow \text{Return To Base}$$
* **Dynamic Node States:**
  * **Completed (✓):** Filled node with checkmark and highlighted green connector path.
  * **Active (▶):** Glowing pulse badge with gentle floating animation and radar-sweep beacon.
  * **Pending (○):** Dimmed awaiting state.
  * **Suspended / Waiting (⏸):** Automatically activated when drone status is `OFFLINE`.
  * **Failed / Compensation (✕):** Triggered when battery drops below safe landing thresholds (< 30%).
* **Temporal Dispatch Integration:** Built-in direct dispatch button triggering `POST /api/missions/{droneId}` to start workflows on the Spring Boot backend.
* **Collapsible Panel UI:** Quick toggle tab (`◀ / ▶`) allowing operators to minimize the panel to maximize 3D globe visibility.

</details>

---

## ⚡ Key Features & Capabilities

* **🌐 True 3D Spherical Coordinate Space:** No flat approximations—elevations and orbits calculated in genuine ellipsoidal 3D coordinates.
* **🚀 High-Fidelity Performance:** Smoothly renders 100+ entities with interactive polyline trails and low draw-call overhead.
* **🔮 Cyberpunk Aviation Aesthetic:** Glassmorphic translucent HUDs, radar pulse animations, and tabular monospace telemetry figures.
* **🛡 Resilient State Machine:** Visual state transitions for disconnects, low-battery compensation, and mission hand-offs.
* **🔌 Dual-Mode Architecture:** Seamlessly toggles between local 10Hz simulation mode and backend WebSocket streams.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18.0.0 or higher) & **npm**
* *(Optional for backend)*: Java 17+, Maven, and Docker Desktop

### 1. Run the Frontend Dashboard (Recommended)
```powershell
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Run Backend & Temporal Orchestration (Optional)
```powershell
# Start Temporal Server & Cassandra in Docker
docker-compose up -d

# Start the Spring Boot backend
cd backend
./mvnw spring-boot:run
```
Temporal UI will be accessible at `http://localhost:8081` and Spring Boot at `http://localhost:8082`.

---

## 🎤 Review Session Live Demo Script

When presenting this project to reviewers, follow this crisp **3-step demonstration**:

1. **3D Airspace Visualization (Week 1):**
   * *Tilt and rotate the Cesium globe* to show the San Francisco Bay Area airspace with 50+ aircraft orbiting in 3D space with altitude clearance.
2. **Fleet Operations & Stress Test (Week 2):**
   * Click an aircraft on the map or roster. Point to the **Telemetry Panel** showing real-time velocity, heading, and altitude.
   * Drag the **Fleet Size Slider to 100 drones** and point to the **Render Performance counter** maintaining smooth 60 FPS.
3. **Temporal Mission DAG (Week 3):**
   * Expand the **Mission Workflow DAG** on the left side-panel.
   * Show the animated progression: `Battery Check ✓` ➔ `Takeoff ✓` ➔ `Navigate ▶ (Active)` ➔ `Drop Package ○`.
   * Point out the **radar sweep animation** on the active node and the auto-suspension state when an offline drone is selected.

---

## 👥 Contributors

<div align="center">
  <table>
    <tr>
      <td align="center" width="25%">
        <a href="https://github.com/AarthiKotha0812">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Aarthi&backgroundColor=0d1416" width="70px;" alt="Kotha Aarthi" style="border-radius:50%; border: 2px solid #62e0bd; box-shadow: 0 0 14px rgba(98, 224, 189, 0.4);"/><br />
          <sub><b style="color: #62e0bd; font-size: 14px;">Kotha Aarthi</b></sub>
        </a>
      </td>
      <td align="center" width="25%">
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Anushka&backgroundColor=0d1416" width="70px;" alt="Anushka Patil" style="border-radius:50%; border: 2px solid #62e0bd; box-shadow: 0 0 14px rgba(98, 224, 189, 0.4);"/><br />
        <sub><b style="color: #62e0bd; font-size: 14px;">Anushka Patil</b></sub>
      </td>
      <td align="center" width="25%">
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Ramappa&backgroundColor=0d1416" width="70px;" alt="Ramappa Yaragudri" style="border-radius:50%; border: 2px solid #62e0bd; box-shadow: 0 0 14px rgba(98, 224, 189, 0.4);"/><br />
        <sub><b style="color: #62e0bd; font-size: 14px;">Ramappa Yaragudri</b></sub>
      </td>
      <td align="center" width="25%">
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Siddhesh&backgroundColor=0d1416" width="70px;" alt="Siddhesh Dinesh Bhuvad" style="border-radius:50%; border: 2px solid #62e0bd; box-shadow: 0 0 14px rgba(98, 224, 189, 0.4);"/><br />
        <sub><b style="color: #62e0bd; font-size: 14px;">Siddhesh Dinesh Bhuvad</b></sub>
      </td>
    </tr>
  </table>
</div>

---

<div align="center">
  <sub>Built with passion for autonomous aviation & high-performance geospatial engineering.</sub>
</div>
