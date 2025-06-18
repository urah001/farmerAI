"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function WeatherDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading current conditions...</div>;

  const { temperature, windSpeed, condition } = data.currentConditions;

  return (
    <div className="p-4 bg-gray-500 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Current Conditions</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {windSpeed} km/h</p>
      <p>Condition Code: {condition}</p>
    </div>
  );
}
