/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";
import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";

export function WeatherDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data?.currentConditions) {
    return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Weather Dashboard</CardTitle>
          <CardDescription>Loading current conditions...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { temperature, windSpeed, condition } = data.currentConditions;

  const getWeatherIcon = (code: string) => {
    const num = +code;
    if (num === 0) return <Sun className="h-10 w-10 text-yellow-500" />;
    if ([1,2,3].includes(num)) return <CloudSun className="h-10 w-10 text-gray-500" />;
    if ([61,63,65,80,81,82].includes(num)) return <CloudRain className="h-10 w-10 text-blue-500" />;
    return <Cloud className="h-10 w-10 text-gray-500" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Dashboard</CardTitle>
        <CardDescription>Current conditions in Osara, Okene</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {getWeatherIcon(condition)}
          <div>
            <p className="text-3xl font-bold">{temperature}°C</p>
            <p className="text-gray-500">Code {condition}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Wind Speed:</p>
          <p className="text-lg">{windSpeed} km/h</p>
        </div>
      </CardContent>
    </Card>
  );
}
