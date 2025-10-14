"use client"

import { X } from "lucide-react"

interface City {
  id: string
  name: string
  utc_offset: number
}

interface CitySelectorProps {
  cities: City[]
  selectedCity: City | null
  onSelectCity: (city: City | null) => void
}

export function CitySelector({ cities, selectedCity, onSelectCity }: CitySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Hora Local de Ciudades</h3>
        {selectedCity && (
          <button
            onClick={() => onSelectCity(null)}
            className="text-sm px-4 py-2 rounded-lg bg-card border-2 border-cyan-400 hover:bg-muted transition-all hover:scale-105 flex items-center gap-2"
          >
            <X className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-cyan-400">Volver al Planeta</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectCity(city)}
            className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
              selectedCity?.id === city.id
                ? "bg-primary/20 border-primary shadow-lg shadow-primary/50"
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <div className="text-sm font-semibold text-foreground">{city.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              UTC{city.utc_offset >= 0 ? "+" : ""}
              {city.utc_offset}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
