/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Coordinates for Osara, Okene, Kogi, Nigeria
    const latitude = "7.733";
    const longitude = "6.435";

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Africa%2FLagos`;

    const res = await fetch(weatherUrl);
    const data = await res.json();

    const curr = data.current_weather;
    const daily = data.daily;

    const result = {
      currentConditions: {
        temperature: curr.temperature,
        windSpeed: curr.windspeed,
        condition: curr.weathercode.toString(),
      },
      forecast: daily.time.slice(0, 5).map((day: string, i: number) => ({
        day,
        condition: daily.weathercode[i].toString(),
        highTemp: daily.temperature_2m_max[i],
        lowTemp: daily.temperature_2m_min[i],
        precipitation: daily.precipitation_sum[i],
      })),
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return NextResponse.json({ error: "Weather fetch failed" }, { status: 500 });
  }
}
