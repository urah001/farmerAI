"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import //LineChart,
//Line,
// XAxis,
// YAxis,
// CartesianGrid,
// Tooltip,
// ResponsiveContainer,
// AreaChart,
// Area,
"lucide-react";

import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Cloud,
  CloudRain,
  Droplet,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";

export function WeatherDashboard() {
  const currentWeather = {
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 45,
    windSpeed: 8,
    precipitation: 0,
    location: "Central Farm Region",
  };

  const temperatureData = [
    { time: "00:00", temp: 18 },
    { time: "03:00", temp: 16 },
    { time: "06:00", temp: 15 },
    { time: "09:00", temp: 19 },
    { time: "12:00", temp: 24 },
    { time: "15:00", temp: 26 },
    { time: "18:00", temp: 23 },
    { time: "21:00", temp: 20 },
  ];

  const precipitationData = [
    { time: "00:00", chance: 5 },
    { time: "03:00", chance: 10 },
    { time: "06:00", chance: 15 },
    { time: "09:00", chance: 5 },
    { time: "12:00", chance: 0 },
    { time: "15:00", chance: 0 },
    { time: "18:00", chance: 20 },
    { time: "21:00", chance: 30 },
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case "partly cloudy":
        return <Cloud className="h-10 w-10 text-gray-500" />;
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
          Current conditions and 24-hour forecast for {currentWeather.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {getWeatherIcon(currentWeather.condition)}
              <div>
                <p className="text-3xl font-bold">
                  {currentWeather.temperature}°C
                </p>
                <p className="text-gray-500">{currentWeather.condition}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Droplet className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-lg">{currentWeather.humidity}%</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Wind</p>
                  <p className="text-lg">{currentWeather.windSpeed} km/h</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <CloudRain className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Precipitation</p>
                  <p className="text-lg">{currentWeather.precipitation} mm</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Feels Like</p>
                  <p className="text-lg">{currentWeather.temperature - 1}°C</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-950">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Farm Advisory:</strong> Ideal conditions for irrigation
                in the next 24 hours. Consider scheduling irrigation for
                tomorrow morning.
              </p>
            </div>
          </div>

          <div>
            <Tabs defaultValue="temperature">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
                <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
              </TabsList>
              <TabsContent value="temperature" className="space-y-4">
                <div className="h-[250px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis
                        domain={[10, 30]}
                        label={{
                          value: "°C",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#f97316"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="precipitation" className="space-y-4">
                <div className="h-[250px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={precipitationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis
                        domain={[0, 100]}
                        label={{
                          value: "%",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="chance"
                        fill="#3b82f6"
                        stroke="#2563eb"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
