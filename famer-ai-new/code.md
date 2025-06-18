import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DiseaseDetectionUpload } from "@/components/disease-detection-upload"
import { DiseaseDetectionResults } from "@/components/disease-detection-results"

export default function DiseaseDetectionPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Plant Disease Detection</h1>
      <p className="text-gray-500 mb-8 max-w-3xl">
        Our AI-powered disease detection system uses a Convolutional Neural Network (CNN) to identify plant diseases
        from images. Upload photos of your crops to get instant diagnosis and treatment recommendations.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>  
            <CardTitle>Upload Plant Images</CardTitle>
            <CardDescription>Take clear photos of affected plant parts</CardDescription>
          </CardHeader>
          <CardContent>
            <DiseaseDetectionUpload />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Diagnosis</CardTitle>
            <CardDescription>Disease identification and treatment recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            {/* the components incharge of the result of the disease detection */}
            <DiseaseDetectionResults />
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Image Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Upload clear images of affected plant parts. For best results, take close-up photos in good lighting
                conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CNN Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Our Convolutional Neural Network (CNN) analyzes the images to identify patterns associated with specific
                plant diseases.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Treatment Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Receive a detailed diagnosis with confidence score, disease information, and recommended treatment
                options.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
