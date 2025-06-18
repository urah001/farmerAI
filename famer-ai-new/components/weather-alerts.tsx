"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function WeatherAlerts() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading alerts...</div>;

  if (!data.alerts.length) return <div className="p-4 bg-gray-500 rounded-lg shadow">No alerts available.</div>;

  return (
    <div className="p-4 bg-gray-500 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Weather Alerts</h2>
      {data.alerts.map((alert: any, idx: number) => (
        <div key={idx} className="mb-2">
          <p>{alert.type} - {alert.severity}</p>
          <p>{alert.description}</p>
        </div>
      ))}
    </div>
  );
}
