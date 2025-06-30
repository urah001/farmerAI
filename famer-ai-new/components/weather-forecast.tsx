/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, CloudSun } from "lucide-react";

export function WeatherForecast() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data?.forecast) {
    return <Card className="p-4"><CardHeader><CardTitle>5‑Day Forecast</CardTitle><CardDescription>Loading...</CardDescription></CardHeader></Card>;
  }

  const mapIcon = (code: string) => {
    const num = +code;
    if (num === 0) return <Sun className="h-8 w-8 text-yellow-500" />;
    if ([1,2,3].includes(num)) return <CloudSun className="h-8 w-8 text-gray-500" />;
    if ([61,63,65,80,81,82].includes(num)) return <CloudRain className="h-8 w-8 text-blue-500" />;
    return <Cloud className="h-8 w-8 text-gray-500" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>5‑Day Forecast – Okene</CardTitle>
        <CardDescription>Osara, Kogi State</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.forecast.map((day:any, idx:number) => (
            <div key={idx} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center space-x-4">
                {mapIcon(day.condition)}
                <div>
                  <p className="font-medium">{day.day}</p>
                </div>
              </div>
              <p className="text-right">
                {day.highTemp}° / {day.lowTemp}° – {day.precipitation} mm
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
