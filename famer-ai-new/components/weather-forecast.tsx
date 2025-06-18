"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function WeatherForecast() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather?lat=7.55&lon=6.25")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading forecast...</div>;

  return (
    <div className="p-4 bg-gray-500 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">5-Day Forecast</h2>
      {data.forecast.map((day: any, idx: number) => (
        <div key={idx} className="mb-2">
          <p>{day.day}</p>
          <p>
            High: {day.highTemp}°C, Low: {day.lowTemp}°C
          </p>
          <p>Precipitation: {day.precipitation} mm</p>
        </div>
      ))}
    </div>
  );
}
