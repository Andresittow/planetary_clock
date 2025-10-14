"use client"

interface Planet {
  id: string
  name: string
  color: string
  rotation_hours: number
}

interface PlanetSelectorProps {
  planets: Planet[]
  selectedPlanet: Planet
  onSelectPlanet: (planet: Planet) => void
}

export function PlanetSelector({ planets, selectedPlanet, onSelectPlanet }: PlanetSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {planets.map((planet) => {
        const isSelected = planet.id === selectedPlanet.id
        return (
          <button
            key={planet.id}
            onClick={() => onSelectPlanet(planet)}
            className="group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            style={{
              backgroundColor: isSelected ? planet.color : "transparent",
              color: isSelected ? "#0a0a0f" : planet.color,
              borderWidth: "2px",
              borderColor: planet.color,
              boxShadow: isSelected ? `0 0 30px ${planet.color}66` : "none",
            }}
          >
            {planet.name}

            {/* Hover glow effect */}
            {!isSelected && (
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"
                style={{ backgroundColor: planet.color }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
