import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Leaf, CloudSun, Bug } from "lucide-react";
import Image from "next/image";
import AuthNav from "@/components/AuthNav";
import { WeatherDashboard } from "@/components/weather-dashboard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <AuthNav />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950"
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Smart Farming with AI
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Make data-driven decisions for your farm with our
                      AI-powered recommendations for crops, disease detection,
                      and weather monitoring.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg" asChild>
                      <Link href="/crop-recommendation">
                        Get Crop Recommendations
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/disease-detection">
                        Detect Plant Diseases
                      </Link>
                    </Button>
                  </div>
                </div>
                <Image
                  src="/Localfamer.jpg?height=550&width=800"
                  alt="Smart farming with AI"
                  width={800}
                  height={550}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Key Features
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our AI-driven platform provides comprehensive tools to
                    enhance your farming practices
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-800">
                        <Leaf className="h-6 w-6 text-green-600 dark:text-green-200" />
                      </div>
                      <CardTitle className="mt-4">
                        Crop Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Get personalized crop suggestions based on your soil
                        conditions, weather patterns, and historical data using
                        our Random Forest model.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-800">
                        <Bug className="h-6 w-6 text-green-600 dark:text-green-200" />
                      </div>
                      <CardTitle className="mt-4">Disease Detection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Upload images of your plants to identify diseases and
                        get treatment recommendations using our CNN model.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-800">
                        <CloudSun className="h-6 w-6 text-green-600 dark:text-green-200" />
                      </div>
                      <CardTitle className="mt-4">Weather Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Access real-time weather data and forecasts to plan your
                        farming activities effectively.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Current Weather
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Stay updated with the latest weather conditions for your
                    farm
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-3xl py-12">
                <WeatherDashboard />
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="w-full border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"></div>
        </footer>
      </div>
    </>
  );
}
