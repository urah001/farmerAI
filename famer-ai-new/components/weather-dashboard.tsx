/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react";

export function WeatherDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data)
    return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Weather Dashboard</CardTitle>
          <CardDescription>Loading current conditions...</CardDescription>
        </CardHeader>
      </Card>
    );

  const { temperature, windSpeed, condition } = data.currentConditions;

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case "partly cloudy":
        return <CloudSun className="h-10 w-10 text-gray-500" />;
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Dashboard</CardTitle>
        <CardDescription>
          Current conditions for your location
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {getWeatherIcon(condition)}
          <div>
            <p className="text-3xl font-bold">{temperature}°C</p>
            <p className="text-gray-500 capitalize">{condition}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Wind Speed</p>
            <p className="text-lg">{windSpeed} km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}