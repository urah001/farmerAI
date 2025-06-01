import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertTriangle, Info } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "alert",
      message: "Potential pest detected in Wheat field (North)",
      time: "2 hours ago",
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
    },
    {
      id: 2,
      type: "recommendation",
      message: "Optimal time to fertilize Corn field (East)",
      time: "5 hours ago",
      icon: Info,
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      type: "action",
      message: "Irrigation completed for Soybean field",
      time: "Yesterday",
      icon: Check,
      iconColor: "text-green-500",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest alerts and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div
                className={`mt-0.5 rounded-full p-1 ${activity.type === "alert" ? "bg-yellow-100" : activity.type === "recommendation" ? "bg-blue-100" : "bg-green-100"}`}
              >
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
