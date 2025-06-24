import React, { useEffect, useState, useCallback } from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import DeviceTable from "./components/DeviceTable.jsx";
import { fetchDevices } from "./service/api.js";

export default function App() {
  const [rows, setRows] = useState([]);
  const [scanning, setScanning] = useState(false);

  const scan = useCallback(async () => {
    try {
      setScanning(true);
      const data = await fetchDevices();
      setRows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setScanning(false);
    }
  }, []);

  useEffect(() => {
    scan();
    const id = setInterval(scan, 20000); // auto refresh every 20s (10s from backend + 10s from frontend)
    return () => clearInterval(id);
  }, [scan]);

  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: 'orange' }}>BLE Devices Nearby</Typography>
        <Button variant="contained" onClick={scan} disabled={scanning}>
          {scanning ? "Scanning…" : "Scan Now"}
        </Button>
      </Stack>
      <DeviceTable rows={rows} />
    </Container>
  );
}