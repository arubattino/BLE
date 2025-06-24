"""FastAPI API that runs a BLE scan with Bleak and returns JSON."""
import os
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from bleak import BleakScanner

app = FastAPI()

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SCAN_TIMEOUT = float(os.getenv("SCAN_TIMEOUT", 10))
scan_lock = asyncio.Lock()

@app.get("/api/scan")
async def scan_endpoint():
    """Asynchronously triggers a scan and returns JSON."""
    async with scan_lock:
        # Use return_adv=True to get both the device and its advertisement data.
        # It returns a dictionary of {address: (device, advertisement_data)}.
        devices = await BleakScanner.discover(timeout=SCAN_TIMEOUT, return_adv=True)
        parsed = []
        for dev, adv_data in devices.values():
            mfg = adv_data.manufacturer_data
            if mfg:
                # grab first (id -> bytes) pair
                mfg_id, raw = next(iter(mfg.items()))
                encoded = raw.hex()
            else:
                mfg_id, encoded = None, None
            parsed.append({
                "address": dev.address,
                "name": dev.name or adv_data.local_name or "",
                "rssi": adv_data.rssi,
                "manufacturer_id": hex(mfg_id) if mfg_id is not None else None,
                "manufacturer_data": encoded,
            })
        return parsed

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)