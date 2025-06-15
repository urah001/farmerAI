export function CropRecommendationResults({ result }: { result: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Recommended Crop:</h3>
      <p className="text-white">{result || "No recommendation yet"}</p>
    </div>
  );
}
