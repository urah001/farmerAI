"use client";
import React, { useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import Image from "next/image";
import NavText from "@/components/NavText";

export default function DiseaseDetector() {
  const [prediction, setPrediction] = useState<string>("Waiting for image...");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const modelRef = useRef<tmImage.CustomMobileNet | null>(null);
  const modelURL = "https://teachablemachine.withgoogle.com/models/pSEUU8y40/";

  const initModel = async () => {
    if (!modelRef.current) {
      const model = await tmImage.load(
        `${modelURL}model.json`,
        `${modelURL}metadata.json`
      );
      modelRef.current = model;
    }
  };

  const predict = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setImageSrc(objectURL);

    await initModel();
  };

  const handleImageLoad = async (img: HTMLImageElement) => {
    if (!modelRef.current) return;
    const predictions = await modelRef.current.predict(img);
    const topPrediction = predictions.sort(
      (a, b) => b.probability - a.probability
    )[0];
    setPrediction(
      `${topPrediction.className} (${(topPrediction.probability * 100).toFixed(
        2
      )}%)`
    );
  };

  return (
    <>
    <NavText/>
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Plant Disease Detector</h2>
      <input type="file" accept="image/*" onChange={predict} className="mb-4" />
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Uploaded Preview"
          onLoad={(e) => handleImageLoad(e.currentTarget)}
          className="max-w-xs mx-auto mb-4"
          width={800}
          height={550}
        />
      )}
      <p className="text-gray-100 font-semibold">{prediction}</p>
    </div>
    </>
  );
}
