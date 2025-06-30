"use client"
import { Sun, CloudRain, Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function WeatherForecast() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather?lat=7.55&lon=6.25")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data)
    return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
          <CardDescription>Loading forecast...</CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
        <CardDescription>Weather outlook for the coming days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
        {data?.forecast && data.forecast.map((day: any, idx: number) => {

          //{data.forecast.map((day: any, idx: number) => {
            const IconComponent =
              day.condition.toLowerCase().includes("sun")
                ? Sun
                : day.condition.toLowerCase().includes("rain")
                ? CloudRain
                : Cloud;

            return (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <IconComponent
                    className={`h-8 w-8 ${
                      day.condition.toLowerCase().includes("sun")
                        ? "text-yellow-500"
                        : day.condition.toLowerCase().includes("rain")
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm text-gray-500">{day.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {day.highTemp}° / {day.lowTemp}°
                  </p>
                  <p className="text-sm text-gray-500">
                    {day.precipitation}% precip
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
