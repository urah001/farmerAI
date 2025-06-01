import { NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Define the schema for crop recommendations
const cropRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      crop: z.string(),
      confidence: z.number(),
      yield: z.string(),
      plantingTime: z.string(),
      harvestTime: z.string(),
      waterRequirements: z.string(),
      fertilizers: z.array(z.string()),
      notes: z.string().optional(),
    }),
  ),
  soilAnalysis: z.object({
    healthScore: z.number(),
    recommendations: z.array(z.string()),
  }),
})

export async function POST(req: Request) {
  try {
    const { soilType, soilpH, nitrogen, phosphorus, potassium, temperature, humidity, rainfall } = await req.json()

    // Generate crop recommendations using AI
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: cropRecommendationSchema,
      prompt: `
        Generate crop recommendations based on the following farm data:
        Soil Type: ${soilType}
        Soil pH: ${soilpH}
        Nitrogen: ${nitrogen} mg/kg
        Phosphorus: ${phosphorus} mg/kg
        Potassium: ${potassium} mg/kg
        Average Temperature: ${temperature}°C
        Average Humidity: ${humidity}%
        Annual Rainfall: ${rainfall} mm
        
        Provide 3-5 crop recommendations with confidence scores, expected yield, planting and harvest times, 
        water requirements, and recommended fertilizers. Also include a soil health analysis with recommendations.
        
        Base your recommendations on the sample dataset provided:
        | Soil pH | Nitrogen (N) | Phosphorus (P) | Potassium (K) | Temperature (°C) | Humidity (%) | Rainfall (mm) | Recommended Crop |
        | ------- | ------------ | -------------- | ------------- | ---------------- | ------------ | ------------- | ---------------- |
        | 7.32    | 123          | 64             | 60            | 15.96            | 77           | 80            | Potato           |
        | 6.6     | 118          | 49             | 141           | 21.54            | 48           | 278           | Rice             |
        | 6.73    | 52           | 6              | 134           | 24.58            | 43           | 220           | Wheat            |
        | 4.65    | 79           | 61             | 142           | 23.38            | 89           | 172           | Potato           |
        | 4.67    | 137          | 33             | 11            | 36.32            | 38           | 194           | Rice             |
        | 5.95    | 20           | 20             | 8             | 16.14            | 52           | 264           | Maize            |
      `,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("Error generating crop recommendations:", error)
    return NextResponse.json({ error: "Failed to generate crop recommendations" }, { status: 500 })
  }
}
