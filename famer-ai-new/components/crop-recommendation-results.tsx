"use client"

export function CropRecommendationResults({ result }: { result: string }) {
  return (
    <div className="text-center mt-4">
      {result ? (
        <div className="text-xl font-semibold text-green-600">
          🌱 Recommended Crop: <span className="font-bold">{result}</span>
        </div>
      ) : (
        <div className="text-gray-500">Enter your data to get a recommendation</div>
      )}
    </div>
  )
}
