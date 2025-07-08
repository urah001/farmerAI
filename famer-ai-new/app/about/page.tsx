"use client";

import Footer from "@/components/footer";
import NavText from "@/components/NavText";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <NavText />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-700 mb-6">About FarmAI</h1>

        <section className="space-y-4 text-gray-300">
          <p>
            <strong>FarmAI</strong> is an intelligent crop recommendation
            platform built to help farmers and agricultural researchers make
            informed decisions about what crops to plant based on real-time soil
            and environmental data.
          </p>

          <p>
            The system leverages <strong>Machine Learning</strong> models
            trained on agricultural datasets to recommend the most suitable crop
            for a given condition. With just a few inputs like soil pH, nutrient
            content, temperature, humidity, and rainfall, users can get instant
            suggestions tailored to their land.
          </p>

          <h2 className="text-2xl font-semibold text-green-600">
            🌿 How It Works
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Users input values such as Nitrogen (N), Phosphorus (P), Potassium
              (K), Soil pH, Temperature, Humidity, and Rainfall into the system.
            </li>
            <li>
              These values are sent to a backend Flask API where a trained
              <strong> Random Forest Classifier</strong> processes the data.
            </li>
            <li>
              The model, trained using real crop datasets, predicts the most
              suitable crop for that condition.
            </li>
            <li>
              The result is returned and displayed instantly to the user via a
              modern, user-friendly interface.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-600">
            🧠 Technology Stack
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Frontend:</strong> Built with <code>Next.js</code>, styled
              using Tailwind CSS for a responsive and clean user experience.
            </li>
            <li>
              <strong>Backend:</strong> Flask (Python) handles the machine
              learning prediction API.
            </li>
            <li>
              <strong>Model:</strong> Trained using <code>scikit-learn</code>s
              Random Forest Classifier on a labeled agricultural dataset with
              crops such as rice, maize, muskmelon, etc.
            </li>
            <li>
              <strong>Authentication:</strong> User login and logout is managed
              via <code>Kinde Auth</code>.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-600">📦 Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Crop recommendation using real-time user input</li>
            <li>Simple and intuitive sliders and input fields</li>
            <li>Secure user authentication and logout</li>
            <li>Clean and responsive UI design</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-600">
            🎯 Why It Matters
          </h2>
          <p>
            In a time where agricultural yield is more crucial than ever, FarmAI
            helps farmers make science-backed decisions for better productivity.
            It saves time, reduces guesswork, and supports food sustainability
            goals.
          </p>

          <p>
            Whether youre a farmer, student, or agricultural expert — FarmAI
            gives you the tools to plant smart and harvest better.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
