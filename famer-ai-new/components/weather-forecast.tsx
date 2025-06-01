import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react"

export function WeatherForecast() {
  const forecast = [
    {
      day: "Today",
      condition: "Partly Cloudy",
      high: 26,
      low: 15,
      precipitation: 10,
      icon: CloudSun,
    },
    {
      day: "Tomorrow",
      condition: "Sunny",
      high: 28,
      low: 16,
      precipitation: 0,
      icon: Sun,
    },
    {
      day: "Wednesday",
      condition: "Sunny",
      high: 29,
      low: 17,
      precipitation: 0,
      icon: Sun,
    },
    {
      day: "Thursday",
      condition: "Cloudy",
      high: 25,
      low: 16,
      precipitation: 20,
      icon: Cloud,
    },
    {
      day: "Friday",
      condition: "Rain",
      high: 22,
      low: 14,
      precipitation: 80,
      icon: CloudRain,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
        <CardDescription>Weather outlook for the coming days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecast.map((day) => (
            <div key={day.day} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <day.icon
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
                  {day.high}° / {day.low}°
                </p>
                <p className="text-sm text-gray-500">{day.precipitation}% precip</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
