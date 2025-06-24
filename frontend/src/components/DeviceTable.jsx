import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "address", headerName: "MAC", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "rssi", headerName: "RSSI", width: 90 },
  { field: "manufacturer_id", headerName: "Mfg ID", width: 110 },
  { field: "manufacturer_data", headerName: "Mfg Data", flex: 1 }
];

export default function DeviceTable({ rows }) {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows.map((r, idx) => ({ id: idx, ...r }))}
        columns={columns}
        density="compact"
        pageSizeOptions={[25, 50]}
      />
    </div>
  );
}