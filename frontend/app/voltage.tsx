"use client";
import { useState, useMemo } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, IconButton, InputLabel } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { fetchVoltage } from "./api/voltage";
import { useQuery } from "@tanstack/react-query";
import getAfterTimestamp from "@/utils/getAfterTimestamp";
import { LineChart } from "@mui/x-charts";

interface Voltage {
  timestamp: string;
  voltage: number;
}

export default function VoltageScreen() {
  const [timeRange, setTimeRange] = useState<string>();

  const after = useMemo(
    () => (timeRange ? getAfterTimestamp(timeRange).toISOString() : undefined),
    [timeRange],
  );
  const {
    isLoading,
    error,
    data = [],
    refetch,
  } = useQuery<Voltage[]>({
    queryKey: ["voltages", after],
    queryFn: () => fetchVoltage(after),
  });

  const handleChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  const options = [
    { label: "Last 1 Minutes", value: "1m" },
    { label: "Last 15 Minutes", value: "15m" },
    { label: "Last 1 Hour", value: "1h" },
    { label: "Last 6 Hours", value: "6h" },
    { label: "Last 12 Hours", value: "12h" },
  ];

  const xData = data.map((d) => new Date(d.timestamp));
  const yData = data.map((d) => d.voltage);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="w-full font-mono text-sm flex items-center gap-2">
        <FormControl className="flex-1 lg:flex-none lg:w-64">
          <InputLabel id="demo-simple-select-helper-label">
            Time Range
          </InputLabel>
          <Select
            value={timeRange || ""}
            label="Time Range"
            onChange={handleChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          className="flex-none w-16"
          onClick={() => {
            setTimeRange("");
            refetch();
          }}
          disabled={isLoading}
        >
          <Refresh />
        </IconButton>
      </div>
      {error && <div className="text-red-500">Error: {error.message}</div>}
      <div className="w-full h-[70vh]">
        <LineChart
          xAxis={[
            {
              data: xData,
              scaleType: "time",
              label: "Time",
            },
          ]}
          series={[
            {
              data: yData,
              label: "Voltage (V)",
              curve: "monotoneX",
              area: true,
            },
          ]}
        />
      </div>
    </main>
  );
}
