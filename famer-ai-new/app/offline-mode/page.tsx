"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudOff, Database, Upload, Check, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OfflineModePage() {
  const [syncStatus, setSyncStatus] = useState<"synced" | "pending" | "error">("synced")
  const [pendingEntries, setPendingEntries] = useState(0)

  const handleSync = () => {
    setSyncStatus("pending")

    // Simulate sync process
    setTimeout(() => {
      setSyncStatus("synced")
      setPendingEntries(0)
    }, 2000)
  }

  const handleAddPendingEntry = () => {
    setPendingEntries((prev) => prev + 1)
    setSyncStatus("pending")
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Offline Mode</h1>
          <p className="text-gray-500 mt-2 max-w-3xl">
            Access essential features and record data even without internet connectivity. All data will sync
            automatically when connection is restored.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className={`
              ${
                syncStatus === "synced"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : syncStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : "bg-red-100 text-red-800 border-red-200"
              }
            `}
          >
            {syncStatus === "synced" ? (
              <>
                <Check className="h-3 w-3 mr-1" /> Synced
              </>
            ) : syncStatus === "pending" ? (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" /> Pending Sync ({pendingEntries})
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" /> Sync Error
              </>
            )}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={syncStatus === "synced" || pendingEntries === 0}
          >
            <Upload className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
        </div>
      </div>

      <Tabs defaultValue="available">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="available">Available Offline</TabsTrigger>
          <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Crop Recommendations</CardTitle>
                <CardDescription>Previously generated recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last cached:</span>
                  <span className="text-sm">Today, 10:45 AM</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Cached Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Disease Library</CardTitle>
                <CardDescription>Common crop diseases and treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last cached:</span>
                  <span className="text-sm">Yesterday, 3:20 PM</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Disease Library
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Farm Records</CardTitle>
                <CardDescription>Your saved farm data and records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last cached:</span>
                  <span className="text-sm">Today, 9:15 AM</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Farm Records
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg dark:bg-blue-950">
            <div className="flex items-start space-x-3">
              <CloudOff className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-200">Offline Mode Information</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  While offline, you can access cached data and record new information. AI-powered features like new
                  crop recommendations and disease detection require an internet connection, but previously generated
                  results are available offline.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data-entry" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Offline Data Entry</CardTitle>
              <CardDescription>
                Record farm data while offline. It will automatically sync when connection is restored.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Field Observations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Record crop conditions, growth stages, and issues observed in the field.
                    </p>
                    <Button onClick={handleAddPendingEntry}>
                      <Database className="h-4 w-4 mr-2" />
                      Add Field Observation
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Harvest Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Record harvest quantities, quality metrics, and other relevant data.
                    </p>
                    <Button onClick={handleAddPendingEntry}>
                      <Database className="h-4 w-4 mr-2" />
                      Add Harvest Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Input Application</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Record fertilizer, pesticide, or other input applications.
                    </p>
                    <Button onClick={handleAddPendingEntry}>
                      <Database className="h-4 w-4 mr-2" />
                      Add Input Application
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Equipment Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Record equipment usage, maintenance, and fuel consumption.
                    </p>
                    <Button onClick={handleAddPendingEntry}>
                      <Database className="h-4 w-4 mr-2" />
                      Add Equipment Usage
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
