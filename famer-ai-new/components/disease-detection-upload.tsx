"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, Loader2 } from "lucide-react"
import Image from "next/image"

export function DiseaseDetectionUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [cropType, setCropType] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleAnalyze = () => {
    if (!selectedImage || !cropType) return

    setLoading(true)

    // the API call to AI model
    setTimeout(() => {
      setLoading(false)

      // call an event that the results component can listen for
      const event = new CustomEvent("diseaseDetectionComplete", {
        detail: {
          disease: "Late Blight",
          confidence: 94,
          description:
            "Late blight is a plant disease that mainly affects potatoes and tomatoes, causing significant damage to leaves, stems, and fruits.",
          treatment:
            "Apply fungicide containing chlorothalonil or mancozeb. Remove and destroy infected plant parts. Improve air circulation around plants.",
          severity: "High",
        },
      })
      window.dispatchEvent(event)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cropType">Crop Type</Label>
        <Select value={cropType} onValueChange={setCropType}>
          <SelectTrigger id="cropType">
            <SelectValue placeholder="Select crop type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tomato">Tomato</SelectItem>
            <SelectItem value="potato">Potato</SelectItem>
            <SelectItem value="corn">Corn</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="rice">Rice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-64 cursor-pointer"
        onClick={handleUploadClick}
      >
        {selectedImage ? (
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="Selected plant"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center text-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm font-medium mb-1">Click to upload an image</p>
            <p className="text-xs text-gray-500">JPG, PNG or WEBP (max. 5MB)</p>
          </div>
        )}
        <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={handleUploadClick}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            // This would activate the device camera in a real implementation
            alert("Camera functionality would be implemented here")
          }}
        >
          <Camera className="h-4 w-4 mr-2" />
          Take Photo
        </Button>
      </div>

      <Button className="w-full" disabled={!selectedImage || !cropType || loading} onClick={handleAnalyze}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Analyze Image"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        For best results, ensure the affected area is clearly visible and well-lit.
      </p>
    </div>
  )
}
