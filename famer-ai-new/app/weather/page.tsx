import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherDashboard } from "@/components/weather-dashboard"
import { WeatherForecast } from "@/components/weather-forecast"
import { WeatherAlerts } from "@/components/weather-alerts"

export default function WeatherPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Weather Monitoring</h1>
      <p className="text-gray-500 mb-8 max-w-3xl">
        Access real-time weather data, forecasts, and agricultural recommendations based on weather conditions for your
        farm location.
      </p>

      <div className="grid gap-6">
        <WeatherDashboard />

        <div className="grid gap-6 md:grid-cols-2">
          <WeatherForecast />
          <WeatherAlerts />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Weather-Based Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Irrigation Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Based on the forecast, optimal irrigation times are suggested to conserve water and maximize crop
                health.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pest Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Weather conditions are analyzed to predict potential pest outbreaks, allowing for preventative measures.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Harvest Timing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Recommendations for optimal harvest times based on upcoming weather conditions to maximize crop quality.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
