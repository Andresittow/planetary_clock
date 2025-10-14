"use client"

import { useState, useEffect } from "react"
import { getAllPlanets, getAllCities } from "@/lib/api-client"
import { PlanetaryClock } from "@/components/planetary-clock"
import { PlanetInfoPanel } from "@/components/planet-info-panel"
import { PlanetSelector } from "@/components/planet-selector"
import { CitySelector } from "@/components/city-selector"
import { StarfieldBackground } from "@/components/starfield-background"

interface Planet {
  id: string
  name: string
  color: string
  rotation_hours: number
}

interface City {
  id: string
  name: string
  utc_offset: number
}

export default function HomePage() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [planetsData, citiesData] = await Promise.all([getAllPlanets(), getAllCities()])

        // Convert planets object to array
        const planetsArray = Object.entries(planetsData).map(([id, data]) => ({
          id,
          name: data.name,
          color: data.color,
          rotation_hours: data.rotation_hours,
        }))

        // Convert cities object to array
        const citiesArray = Object.entries(citiesData).map(([id, data]) => ({
          id,
          name: data.name,
          utc_offset: data.utc_offset,
        }))

        setPlanets(planetsArray)
        setCities(citiesArray)

        // Set Earth as default
        const earth = planetsArray.find((p) => p.id === "earth")
        if (earth) setSelectedPlanet(earth)

        setIsLoading(false)
      } catch (err) {
        console.error("[v0] Error loading data from API:", err)
        setError("Error al conectar con el servidor. Asegúrate de que el backend de Python esté ejecutándose.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarfieldBackground />
        <div className="relative z-10 text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xl text-cyan-400">Cargando relojes planetarios...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarfieldBackground />
        <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto p-8">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400">Error de Conexión</h2>
          <p className="text-lg text-muted-foreground">{error}</p>
          <div className="mt-6 p-4 bg-card rounded-lg border-2 border-red-400/50 text-left">
            <p className="font-semibold text-red-400 mb-2">Para ejecutar el backend:</p>
            <code className="text-sm text-foreground block">cd scripts</code>
            <code className="text-sm text-foreground block">pip install -r requirements.txt</code>
            <code className="text-sm text-foreground block">python api_server.py</code>
          </div>
        </div>
      </div>
    )
  }

  if (!selectedPlanet) return null

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Relojes Planetarios
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora el tiempo en diferentes planetas del sistema solar y ciudades del mundo. Cada mundo tiene su propio
            ritmo único.
          </p>
        </header>

        {/* Planet selector */}
        <div className="mb-8">
          <PlanetSelector planets={planets} selectedPlanet={selectedPlanet} onSelectPlanet={setSelectedPlanet} />
        </div>

        <div className="mb-12">
          <CitySelector cities={cities} selectedCity={selectedCity} onSelectCity={setSelectedCity} />
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Clock */}
          <div className="flex justify-center">
            <PlanetaryClock planet={selectedPlanet} selectedCity={selectedCity} />
          </div>

          {/* Info panel */}
          <div className="flex items-center">
            <PlanetInfoPanel planet={selectedPlanet} />
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            Los tiempos planetarios son calculados usando <strong>listas dobles circulares</strong> en Python.
            {selectedCity
              ? " La hora de la ciudad seleccionada se muestra en tiempo real."
              : " La Tierra muestra la hora local real de tu sistema."}
          </p>
        </footer>
      </div>
    </div>
  )
}
