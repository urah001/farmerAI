"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";

export function CropRecommendationForm({
  onResult,
}: {
  onResult: (result: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    //soilType: "",
    soilpH: 7.0,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 60,
    rainfall: 200,
  });

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      };

      const res = await fetch("http://127.0.0.1:5000/pred", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      onResult(data.recommended_crop); // Pass result to parent component
    } catch (error) {
      console.error("Error:", error);
      onResult("Error fetching crop recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* // Replace the Sliders with these plain Inputs for each field */}

      <div className="space-y-2">
        <Label htmlFor="nitrogen">
          Nitrogen (N) 
        </Label>
        <Input
          id="nitrogen"
          type="text"
          placeholder="e.g. 90,85,60"
          value={formData.nitrogen}
          onChange={(e) => handleChange("nitrogen", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phosphorus">
          Phosphorus (P) 
        </Label>
        <Input
          id="phosphorus"
          type="text"
          placeholder="e.g. 42,58,55"
          value={formData.phosphorus}
          onChange={(e) => handleChange("phosphorus", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="potassium">
          Potassium (K) 
        </Label>
        <Input
          id="potassium"
          type="text"
          placeholder="e.g. 43,41,44"
          value={formData.potassium}
          onChange={(e) => handleChange("potassium", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature (°C)</Label>
          <Input
            id="temperature"
            type="text"
            placeholder="e.g. 20.8,21.7,23.0"
            value={formData.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="humidity">Humidity (%)</Label>
          <Input
            id="humidity"
            type="text"
            placeholder="e.g. 82.0,80.3,82.3"
            value={formData.humidity}
            onChange={(e) => handleChange("humidity", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="soilpH">Soil pH</Label>
        <Input
          id="soilpH"
          type="text"
          placeholder="e.g. 6.5,7.0,7.8"
          value={formData.soilpH}
          onChange={(e) => handleChange("soilpH", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rainfall">Rainfall (mm)</Label>
        <Input
          id="rainfall"
          type="text"
          placeholder="e.g. 202.9,226.6,263.9"
          value={formData.rainfall}
          onChange={(e) => handleChange("rainfall", e.target.value)}
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
  );
}
