"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Calendar, Droplet } from "lucide-react"

type Recommendation = {
  crop: string
  confidence: number
  yield: string
}

export function CropRecommendationResults() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [hasResults, setHasResults] = useState(false)

  useEffect(() => {
    const handleRecommendationComplete = (event: CustomEvent) => {
      setRecommendations(event.detail.recommendations)
      setHasResults(true)
    }

    window.addEventListener("cropRecommendationComplete", handleRecommendationComplete as EventListener)

    return () => {
      window.removeEventListener("cropRecommendationComplete", handleRecommendationComplete as EventListener)
    }
  }, [])

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <Leaf className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Recommendations Yet</h3>
        <p className="text-gray-500 max-w-xs">
          Fill out the form with your farm data to receive AI-powered crop recommendations.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {recommendations.map((rec, index) => (
        <Card key={index} className={index === 0 ? "border-green-500 shadow-md" : ""}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{rec.crop}</h3>
              <span className="text-sm font-medium text-gray-500">{rec.confidence}% match</span>
            </div>
            <Progress value={rec.confidence} className="h-2 mb-4" />

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center">
                <Leaf className="h-4 w-4 mr-2 text-green-500" />
                <span>Yield: {rec.yield}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                <span>Plant: Spring</span>
              </div>
              <div className="flex items-center">
                <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                <span>Water: Medium</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Note:</strong> These recommendations are based on your provided data and AI analysis. Actual results
          may vary based on specific local conditions and farming practices.
        </p>
      </div>
    </div>
  )
}
