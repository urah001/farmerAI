"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Info, Pill } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type DiseaseResult = {
  disease: string
  confidence: number
  description: string
  treatment: string
  severity: "Low" | "Medium" | "High"
}

export function DiseaseDetectionResults() {
  const [result, setResult] = useState<DiseaseResult | null>(null)

  useEffect(() => {
    const handleDetectionComplete = (event: CustomEvent) => {
      setResult(event.detail)
    }

    window.addEventListener("diseaseDetectionComplete", handleDetectionComplete as EventListener)

    return () => {
      window.removeEventListener("diseaseDetectionComplete", handleDetectionComplete as EventListener)
    }
  }, [])

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <AlertTriangle className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Diagnosis Yet</h3>
        <p className="text-gray-500 max-w-xs">
          Upload a plant image to receive AI-powered disease detection and treatment recommendations.
        </p>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-yellow-100 text-yellow-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{result.disease}</h3>
        <Badge className={getSeverityColor(result.severity)}>{result.severity} Severity</Badge>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Confidence</span>
        <span className="text-sm font-medium">{result.confidence}%</span>
      </div>
      <Progress value={result.confidence} className="h-2 mb-4" />

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start space-x-2 mb-4">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">About This Disease</h4>
              <p className="text-sm text-gray-600">{result.description}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Pill className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">Recommended Treatment</h4>
              <p className="text-sm text-gray-600">{result.treatment}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Note:</strong> This is an AI-generated diagnosis. For critical cases, consult with an agricultural
          expert.
        </p>
      </div>
    </div>
  )
}
