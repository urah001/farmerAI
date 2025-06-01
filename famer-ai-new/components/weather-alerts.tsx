import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CloudRain, Thermometer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function WeatherAlerts() {
  const alerts = [
    {
      type: "Heavy Rain",
      severity: "Moderate",
      description: "Heavy rainfall expected on Friday. Consider postponing any planned fertilizer application.",
      icon: CloudRain,
      color: "text-blue-500",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      type: "Heat Wave",
      severity: "High",
      description: "Temperatures exceeding 30°C expected next week. Ensure adequate irrigation for crops.",
      icon: Thermometer,
      color: "text-red-500",
      badgeColor: "bg-red-100 text-red-800",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Alerts</CardTitle>
        <CardDescription>Important weather notifications for your farm</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <alert.icon className={`h-5 w-5 ${alert.color}`} />
                    <h4 className="font-medium">{alert.type}</h4>
                  </div>
                  <Badge className={alert.badgeColor}>{alert.severity}</Badge>
                </div>
                <p className="text-sm text-gray-600">{alert.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertTriangle className="h-10 w-10 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium">No Active Alerts</h3>
            <p className="text-sm text-gray-500 mt-1">There are currently no weather alerts for your farm location.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
