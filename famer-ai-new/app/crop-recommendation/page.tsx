"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CropRecommendationForm } from "@/components/crop-recommendation-form";
import { CropRecommendationResults } from "@/components/crop-recommendation-results";
import NavText from "@/components/NavText";

export default function CropRecommendationPage() {
  const [result, setResult] = useState("");

  return (
    <>
    <NavText/>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Crop Recommendation System</h1>
        <p className="text-gray-500 mb-8 max-w-3xl">
          Our AI-powered crop recommendation system uses a Random Forest
          algorithm to analyze your soil conditions, local climate, and other
          factors to suggest the most suitable crops for your farm.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input Your Farm Data</CardTitle>
              <CardDescription>
                Provide details about your soil and farm conditions
              </CardDescription>
            </CardHeader>
            <CardContent> 
              <CropRecommendationForm onResult={setResult} /> FIXED HERE
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Personalized crop suggestions based on your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CropRecommendationResults result={result} />
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  The system collects essential data points needed for accurate
                  predictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Our Random Forest algorithm analyzes your data against
                  historical patterns and agricultural research to generate
                  recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personalized Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Receive tailored crop suggestions with confidence scores,
                  expected yield, and care instructions specific to your farm.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
