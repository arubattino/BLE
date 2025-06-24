# BLE Web UI

A web application to scan and display nearby Bluetooth Low Energy (BLE) devices using a React frontend and a Python fastAPI backend with Bleak.

## Features

- Scan BLE devices from your host machine using a web interface.
- Live device table: See address, name, RSSI, and manufacturer data.
- Auto-refresh every 20 seconds or manual scan. (10s from backend + 10s from frontend)
- Dockerized: Easy to run with Docker Compose.

## Architecture

- Frontend: React + Material UI, served by Nginx.
- Backend: Python  FastAPI using Bleak for BLE scanning.
- Communication: The frontend proxies `/api/scan` requests to the backend.

## Prerequisites

- Docker and Docker Compose installed on your system.
- Host machine with Bluetooth hardware and Linux (for BLE scanning).

## Quick Start

1. Clone the repository:
```bash
   git clone https://github.com/arubattino/BLE.git
   cd BLE
```

2. Build and run the containers:
```bash
   docker-compose up --build
```

3. Access the web UI:
Open `http://localhost:3001` in your browser.

## Project Structure

```text
.
├── backend/
│   ├── app.py              # FastAPI for BLE scanning
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/                # React source code
│   ├── Dockerfile
│   ├── default.conf        # Nginx config (reverse proxy to backend)
│   └── package.json
├── .env
└── docker-compose.yml
```

## How it works

- The backend exposes `/api/scan`, which triggers a 10-second BLE scan using Bleak and returns a JSON list of devices.
- The frontend displays the results in a table and allows manual or automatic refresh.
- Nginx is configured to proxy `/api` requests to the backend.

## Dependencies

### Backend:

- Python 3.12
- FastAPI 0.115
- Bleak 0.22.0

### Frontend:

- React 19
- Material UI
- Axios
- Vite