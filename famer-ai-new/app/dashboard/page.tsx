/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { CropRecommendationResults } from "@/components/crop-recommendation-results";
import { WeatherDashboard } from "@/components/weather-dashboard";

export default function DashboardPage() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [result] = useState("");
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather"); // your Next.js weather API route
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to load weather:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Farmer!</h1>
      <p className="text-gray-500">Heres your farm insights dashboard.</p>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Crop</CardTitle>
            <CardDescription>Latest AI crop suggestion</CardDescription>
          </CardHeader>
          <CardContent>
            
            <CropRecommendationResults result={result} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weather Summary</CardTitle>
            <CardDescription>Todays forecast</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
                <Loader2 className="animate-spin w-6 h-6" />
            ) : (
                <>
                <p className="text-xl">{weather?.description}</p>
                <p>{weather?.temperature}</p>
                <WeatherDashboard />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Detection</CardTitle>
            <CardDescription>Last Scan Result</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-green-600">No Disease Detected ✅</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soil pH Level</CardTitle>
            <CardDescription>Latest Reading</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">6.5</p>
            <p className="text-sm text-gray-500">Ideal for most crops</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your farm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            
            <Button className="w-full">Get Crop Recommendation</Button>
            <Button className="w-full">Run Disease Detection</Button>
            <Button className="w-full">View Full Weather Forecast</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Crop Recommendation: Rice suggested 2 hours ago</li>
              <li>🧪 Disease Detection: Healthy result on Tomato leaf</li>
              <li>☁️ Weather Forecast checked 30 mins ago</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
