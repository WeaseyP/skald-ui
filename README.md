# Skald UI

This repository contains the official frontend for **Skald**, a visual node-based audio tool. It is a desktop application built with **Electron** and **React**.

---

## Core Technologies

* **Framework**: Electron
* **Build Tool**: Vite
* **Language**: TypeScript
* **UI Library**: React
* **Node Editor**: React Flow

---

## Getting Started

### Prerequisites

* **Node.js** (which includes npm) installed on your system.

### Installation

Clone the repository and install the dependencies.

```bash
npm install
```

### Running the Application in Development Mode

To start the application with hot-reloading enabled, run the following command:

```bash
npm start
```

---

## Architecture

This is a **decoupled frontend application**. Its sole responsibilities are:

* Rendering the node graph editor and all UI panels.
* Managing the graph state.
* Serializing the graph state into the official JSON format.
* Invoking the `skald-codegen` backend process and displaying the generated code.