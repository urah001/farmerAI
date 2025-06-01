"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "@/components/ui/chart"

export function FarmStats() {
  const cropYieldData = [
    { name: "Wheat", yield: 85 },
    { name: "Corn", yield: 92 },
    { name: "Rice", yield: 78 },
    { name: "Soybeans", yield: 88 },
    { name: "Potatoes", yield: 76 },
  ]

  const soilHealthData = [
    { month: "Jan", pH: 6.5, nitrogen: 45, phosphorus: 30 },
    { month: "Feb", pH: 6.6, nitrogen: 48, phosphorus: 32 },
    { month: "Mar", pH: 6.7, nitrogen: 52, phosphorus: 35 },
    { month: "Apr", pH: 6.8, nitrogen: 55, phosphorus: 38 },
    { month: "May", pH: 6.7, nitrogen: 53, phosphorus: 36 },
    { month: "Jun", pH: 6.6, nitrogen: 50, phosphorus: 34 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Performance</CardTitle>
        <CardDescription>Monitor your farm's key metrics and performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crop-yield">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="crop-yield">Crop Yield</TabsTrigger>
            <TabsTrigger value="soil-health">Soil Health</TabsTrigger>
          </TabsList>
          <TabsContent value="crop-yield" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropYieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: "Yield %", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="soil-health" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pH" stroke="#4ade80" />
                  <Line type="monotone" dataKey="nitrogen" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="phosphorus" stroke="#f97316" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
