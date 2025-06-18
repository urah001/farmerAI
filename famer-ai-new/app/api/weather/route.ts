import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const latitude = searchParams.get("lat") || "7.55"; // Okene Osara latitude
    const longitude = searchParams.get("lon") || "6.25"; // Okene Osa ra longitude

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Africa%2FLagos`;

    const res = await fetch(weatherUrl);
    const data = await res.json();

    const current = data.current_weather;
    const forecast = data.daily;

    const result = {
      currentConditions: {
        temperature: current.temperature,
        humidity: 0,
        windSpeed: current.windspeed,
        precipitation: 0,
        condition: current.weathercode.toString(),
      },
      forecast: forecast.time.slice(0, 5).map((day: string, idx: number) => ({
        day,
        condition: forecast.weathercode ? forecast.weathercode[idx].toString() : "N/A",
        highTemp: forecast.temperature_2m_max[idx],
        lowTemp: forecast.temperature_2m_min[idx],
        precipitation: forecast.precipitation_sum[idx],
      })),
      farmingRecommendations: [
        {
          category: "Irrigation",
          recommendation: "Adjust irrigation based on recent rainfall patterns.",
          priority: "Medium",
        },
        {
          category: "Pest Control",
          recommendation: "Monitor for pests after rain and high humidity days.",
          priority: "Low",
        },
      ],
      alerts: [],
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}