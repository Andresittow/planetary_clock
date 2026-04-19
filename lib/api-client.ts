// API client for Python backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? "/api" : "http://localhost:8000")

export interface TimeData {
  hours: number
  minutes: number
  seconds: number
}

export interface PlanetTimeResponse {
  planet: string
  planet_name: string
  time: TimeData
  rotation_hours: number
}

export interface CityTimeResponse {
  city: string
  city_name: string
  time: TimeData
  utc_offset: number
}

export interface PlanetData {
  name: string
  rotation_hours: number
  color: string
}

export interface CityData {
  name: string
  utc_offset: number
}

export async function getEarthTime(): Promise<TimeData> {
  const response = await fetch(`${API_BASE_URL}/time/earth`)
  const data = await response.json()
  return data.time
}

export async function getCityTime(cityId: string): Promise<CityTimeResponse> {
  const response = await fetch(`${API_BASE_URL}/time/earth/${cityId}`)
  return response.json()
}

export async function getPlanetTime(planetId: string, elapsedSeconds: number): Promise<PlanetTimeResponse> {
  const response = await fetch(`${API_BASE_URL}/time/planet/${planetId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ elapsed_seconds: elapsedSeconds }),
  })
  return response.json()
}

export async function getAllPlanets(): Promise<Record<string, PlanetData>> {
  const response = await fetch(`${API_BASE_URL}/planets`)
  const data = await response.json()
  return data.planets
}

export async function getAllCities(): Promise<Record<string, CityData>> {
  const response = await fetch(`${API_BASE_URL}/cities`)
  const data = await response.json()
  return data.cities
}
