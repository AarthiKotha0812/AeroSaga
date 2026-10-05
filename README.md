<div align="center">

# AeroSaga

**Autonomous Drone Mission Control & Live 3D Telemetry**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![CesiumJS](https://img.shields.io/badge/CesiumJS-60B5CC?style=for-the-badge&logo=cesium&logoColor=white)](#)

An interactive React and CesiumJS dashboard for visualizing and monitoring a simulated drone fleet on a 3D globe.

</div>

---

## Contributors

- Kotha Aarthi
- Anushka Patil
- Ramappa Yaragudri
- Siddhesh Dinesh Bhuvad

## Frontend Contribution

Frontend work covers the React dashboard, CesiumJS globe, aircraft visualization, and responsive mission-control interface.

## Development Progress

<details open>
<summary><strong>Week 1: Foundation & 3D Scaffolding (Complete)</strong></summary>

- [x] Set up the React and Vite frontend.
- [x] Integrate CesiumJS through Resium.
- [x] Establish the interactive globe and drone visualization foundation.
</details>

<details open>
<summary><strong>Week 2: Telemetry Dashboard (Frontend Complete)</strong></summary>

- [x] Build a telemetry panel for fleet counts, aircraft state, mission, and performance information.
- [x] Show selected drone position, altitude, speed, heading, and battery.
- [x] Add local simulated telemetry and flight history to drive the frontend demo.
- [ ] Connect the dashboard to live WebSocket telemetry and Temporal mission workflows.

The current dashboard uses local simulation. The `useTelemetry.js` hook is an integration point; live backend telemetry is not connected to the running demo.
</details>

<details open>
<summary><strong>Mid-week: 50+ Drone Visual Performance Check (Complete)</strong></summary>

- [x] Simulate 50 to 100 drones on deterministic routes around the San Francisco Bay Area.
- [x] Render moving markers and sampled flight trails on the CesiumJS globe.
- [x] Select aircraft from the globe or roster and inspect its telemetry.
- [x] Show active, idle, and offline counts, active missions, and average speed.
- [x] Add pause/resume and fleet-size controls.
- [x] Display FPS and simulator update rate.
- [x] Verify the 100-drone roster, selection behavior, and responsive layout in the browser.
</details>

### Overall Progress

| Area | Status |
| :--- | :--- |
| React/Vite and CesiumJS frontend foundation | Complete |
| 50–100 drone local simulation and globe visualization | Complete |
| Fleet dashboard, drone selection, and performance monitor | Complete |
| Live WebSocket telemetry and Temporal workflow integration | Pending |

The current milestone is a working frontend demonstration. Backend telemetry and Temporal mission orchestration are not yet connected to the dashboard.

## Frontend Technology

| Technology | Purpose |
| :--- | :--- |
| React and Vite | UI components and local development server |
| CesiumJS and Resium | 3D globe and geospatial entities |
| JavaScript | Fleet simulation and dashboard behavior |
| CSS | Mission-control layout and responsive styling |

## Run the Frontend Dashboard

Requirements: Node.js and npm.

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build with:

```powershell
npm run build
```

## Visual Performance Check

Use the fleet-size slider to test 50 through 100 drones. Verify that markers move, trails update, selecting a roster item updates the detail panel, and pause/resume works. FPS varies by browser and hardware, so evaluate it on the target demo machine.

The Cesium viewer currently uses the default ion access token. Configure an application token for deployments that require Cesium ion assets or services.
- Displaying live drone locations
