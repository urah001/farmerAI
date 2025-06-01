"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2 } from "lucide-react"

export function CropRecommendationForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    soilType: "",
    soilpH: 7.0,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 60,
    rainfall: 200,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call to AI model
    setTimeout(() => {
      // This would be replaced with actual AI model call
      setLoading(false)

      // Dispatch an event that the recommendation results component can listen for
      const event = new CustomEvent("cropRecommendationComplete", {
        detail: {
          recommendations: [
            { crop: "Rice", confidence: 92, yield: "High" },
            { crop: "Wheat", confidence: 85, yield: "Medium-High" },
            { crop: "Maize", confidence: 78, yield: "Medium" },
          ],
        },
      })
      window.dispatchEvent(event)
    }, 2000)
  }

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="soilType">Soil Type</Label>
          <Select value={formData.soilType} onValueChange={(value: unknown) => handleChange("soilType", value)}>
            <SelectTrigger id="soilType">
              <SelectValue placeholder="Select soil type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clay">Clay</SelectItem>
              <SelectItem value="loam">Loam</SelectItem>
              <SelectItem value="sandy">Sandy</SelectItem>
              <SelectItem value="silt">Silt</SelectItem>
              <SelectItem value="peat">Peat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="soilpH">Soil pH: {formData.soilpH.toFixed(1)}</Label>
          <Slider
            id="soilpH"
            min={0}
            max={14}
            step={0.1}
            value={[formData.soilpH]}
            onValueChange={(value: unknown[]) => handleChange("soilpH", value[0])}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nitrogen">Nitrogen (N): {formData.nitrogen} mg/kg</Label>
        <Slider
          id="nitrogen"
          min={0}
          max={140}
          step={1}
          value={[formData.nitrogen]}
          onValueChange={(value: unknown[]) => handleChange("nitrogen", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phosphorus">Phosphorus (P): {formData.phosphorus} mg/kg</Label>
        <Slider
          id="phosphorus"
          min={0}
          max={140}
          step={1}
          value={[formData.phosphorus]}
          onValueChange={(value: unknown[]) => handleChange("phosphorus", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="potassium">Potassium (K): {formData.potassium} mg/kg</Label>
        <Slider
          id="potassium"
          min={0}
          max={140}
          step={1}
          value={[formData.potassium]}
          onValueChange={(value: unknown[]) => handleChange("potassium", value[0])}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="temperature">Avg. Temperature (°C)</Label>
          <Input
            id="temperature"
            type="number"
            value={formData.temperature}
            onChange={(e) => handleChange("temperature", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="humidity">Avg. Humidity (%)</Label>
          <Input
            id="humidity"
            type="number"
            value={formData.humidity}
            onChange={(e) => handleChange("humidity", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
        <Input
          id="rainfall"
          type="number"
          value={formData.rainfall}
          onChange={(e) => handleChange("rainfall", Number(e.target.value))}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Get Recommendations"
        )}
      </Button>
    </form>
  )
}
