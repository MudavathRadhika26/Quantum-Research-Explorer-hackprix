# Quantum Research Explorer

A premium full-stack application that marries Multimodal AI scientific document extraction with local Density Functional Theory (DFT) quantum chemistry simulations.

## Key Features

1. **Multimodal Ingestion Pipeline**: Ingest flat literature scans (PDF, CSV, JPEG, PNG, TXT) and convert them to structured, copyable, and downloadable chemical JSON databases. Includes clear mocks and endpoints illustrating where to integrate Tesseract OCR and GPT-4 Vision.
2. **Quantum Chemistry Explorer**: Search, filter, and compare molecules and properties (dipole moments, HOMO-LUMO gaps, masses).
3. **Interactive DFT Simulator**: Configurable parameters (functional theories, basis sets) with animated energy convergence logs and molecular orbital SVG diagrams (occupied/virtual levels, spin arrows, HOMO-LUMO gap scales).
4. **Theme Orchestrator**: Dark/Light modes with premium Outfit/Inter typography, transitions, and glassmorphism.

---

## Directory Structure

```
quantum-research-explorer/
├── package.json                 # Root script coordinator
├── README.md                    # Setup and guide handbook
├── backend/
│   ├── src/
│   │   ├── config/              # SQLite connection config
│   │   ├── database/            # Schemas and seeder values
│   │   ├── repositories/        # SQLite / Custom repository mappers
│   │   ├── services/            # Simulation & AI cleanup models
│   │   ├── controllers/         # HTTP request controllers
│   │   ├── routes/              # Routing endpoints
│   │   ├── app.ts               # Express configuration
│   │   └── server.ts            # Server launching entry
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts         # Testing parameters
└── frontend/
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx              # App routing layout shell
    │   ├── index.css            # Tailwind directives & glass styles
    │   ├── types.ts             # TS contracts
    │   ├── context/             # Global contexts (Theme & App state)
    │   ├── components/          # Shared components (Uploader, SVG cards, Recharts)
    │   └── pages/               # Dashboard, Upload, Explorer, Detail, About
```

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## Setup & Run Locally

### 1. Install all dependencies
In the root directory (`quantum-research-explorer`), run:
```bash
npm run install:all
```
This script will concurrently install root package details, Express backend components, and React frontend assets.

### 2. Run in Development Mode
To start both the Node backend and React Vite server simultaneously, run:
```bash
npm run dev
```
- **React Frontend**: http://localhost:3000
- **Express Backend**: http://localhost:5000

---

## MongoDB Transition Guide

As requested, the database is structured using the Repository Pattern. The active repository is mapped through the `IMoleculeRepository` contract. 

To swap from SQLite to **MongoDB**:
1. Install MongoDB drivers in `backend/`: `npm install mongoose @types/mongoose`
2. Create a Mongoose schema representing the `Molecule` model.
3. Write a new file `backend/src/repositories/mongo.repository.ts` implementing the same contract:
   ```typescript
   import { IMoleculeRepository, Molecule } from './molecule.repository';
   
   export class MongoMoleculeRepository implements IMoleculeRepository {
     // Implement MongoDB specific CRUD querying...
   }
   ```
4. Replace occurrences of `SqliteMoleculeRepository` with `MongoMoleculeRepository` in:
   - `backend/src/controllers/molecule.controller.ts`
   - `backend/src/routes/simulation.routes.ts`

---

## Run Backend API Tests

We use **Vitest** and **Supertest** to validate endpoints and database operations.
To execute tests, run:
```bash
npm run test:backend
```
To run frontend tests (if you add them later), run:
```bash
npm run test:frontend
```

---

## Packaging the Project (Create ZIP)

To package the complete project code into a downloadable ZIP archive, you can run the following script from the root directory:
```bash
npm run zip
```
Or run the PowerShell command directly:
```powershell
Compress-Archive -Path backend, frontend, package.json, README.md, zip-project.js -DestinationPath quantum-research-explorer.zip -Force
```
This generates a single `quantum-research-explorer.zip` archive containing the entire implementation.
