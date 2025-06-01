"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Thermometer, Wind, Droplet } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temperature: 24,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 8,
    precipitation: 0,
  })

  // Simulate real-time weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small changes in weather data
      setWeather((prev) => ({
        ...prev,
        temperature: prev.temperature + (Math.random() * 2 - 1),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() * 4 - 2))),
        windSpeed: Math.max(0, Math.min(20, prev.windSpeed + (Math.random() * 2 - 1))),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <p className="text-2xl font-bold">{weather.temperature.toFixed(1)}°C</p>
              <p className="text-sm text-gray-500">{weather.condition}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{weather.humidity.toFixed(0)}% Humidity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{weather.windSpeed.toFixed(1)} km/h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplet className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{weather.precipitation} mm Precip</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Forecast: Ideal conditions for irrigation in the next 24 hours. Consider scheduling irrigation for tomorrow
            morning.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
