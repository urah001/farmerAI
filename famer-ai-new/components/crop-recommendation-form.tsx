"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2 } from "lucide-react"

export function CropRecommendationForm({ onResult }: { onResult: (result: string) => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    //soilType: "",
    soilpH: 7.0,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 60,
    rainfall: 200,
  })

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare data for Flask API
      const payload = {
        SoilPH: formData.soilpH,
        NitrogenN: formData.nitrogen,
        PhosphorusP: formData.phosphorus,
        PotassiumK: formData.potassium,
        TemperatureOC: formData.temperature,
        Humidity: formData.humidity,
        RainfallMM: formData.rainfall,
  
        // Note: soilType not sent since your Python model doesn’t expect it
      }

      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      onResult(data.recommended_crop)  // Pass result to parent component
    } catch (error) {
      console.error("Error:", error)
      onResult("Error fetching crop recommendation")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
      {/*  <div className="space-y-2">
          <Label htmlFor="soilType">Soil Type</Label>
          <Select value={formData.soilType} onValueChange={(value: string) => handleChange("soilType", value)}>
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
        </div>*/}

        <div className="space-y-2">
          <Label htmlFor="soilpH">Soil pH: {formData.soilpH.toFixed(1)}</Label>
          <Slider
            id="soilpH"
            min={0}
            max={14}
            step={0.1}
            value={[formData.soilpH]}
            onValueChange={(value: number[]) => handleChange("soilpH", value[0])}
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
          onValueChange={(value: number[]) => handleChange("nitrogen", value[0])}
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
          onValueChange={(value: number[]) => handleChange("phosphorus", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="potassium">Potassium (K): {formData.potassium} mg/kg</Label>
        <Slider
          id="potassium"
          min={0}
          max={150}
          step={1}
          value={[formData.potassium]}
          onValueChange={(value: number[]) => handleChange("potassium", value[0])}
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
