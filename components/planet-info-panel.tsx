import { Card } from "@/components/ui/card"

interface Planet {
  id: string
  name: string
  color: string
  rotation_hours: number
}

interface PlanetInfoPanelProps {
  planet: Planet
}

const PLANET_FACTS: Record<string, string[]> = {
  mercury: [
    "Mercurio es el planeta más cercano al Sol",
    "Un día en Mercurio dura 59 días terrestres",
    "No tiene atmósfera significativa",
    "Su superficie está cubierta de cráteres",
  ],
  venus: [
    "Venus es el planeta más caliente del sistema solar",
    "Un día en Venus dura 243 días terrestres",
    "Rota en dirección opuesta a la mayoría de planetas",
    "Su atmósfera es extremadamente densa",
  ],
  earth: [
    "La Tierra es el único planeta conocido con vida",
    "Un día terrestre dura exactamente 24 horas",
    "El 71% de su superficie está cubierta de agua",
    "Tiene un satélite natural: la Luna",
  ],
  mars: [
    "Marte es conocido como el planeta rojo",
    "Un día marciano dura 24.6 horas terrestres",
    "Tiene dos lunas: Fobos y Deimos",
    "Posee el volcán más grande del sistema solar",
  ],
  jupiter: [
    "Júpiter es el planeta más grande del sistema solar",
    "Un día en Júpiter dura solo 9.9 horas",
    "Tiene al menos 79 lunas conocidas",
    "Su Gran Mancha Roja es una tormenta gigante",
  ],
  saturn: [
    "Saturno es famoso por sus espectaculares anillos",
    "Un día en Saturno dura 10.7 horas",
    "Tiene más de 80 lunas conocidas",
    "Es el segundo planeta más grande",
  ],
  uranus: [
    "Urano rota de lado, casi perpendicular a su órbita",
    "Un día en Urano dura 17.2 horas",
    "Tiene 27 lunas conocidas",
    "Es un gigante de hielo con atmósfera de metano",
  ],
  neptune: [
    "Neptuno es el planeta más lejano del Sol",
    "Un día en Neptuno dura 16.1 horas",
    "Tiene los vientos más rápidos del sistema solar",
    "Tiene 14 lunas conocidas",
  ],
}

const PLANET_ICONS: Record<string, string> = {
  mercury: "☿",
  venus: "♀",
  earth: "🌍",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
}

export function PlanetInfoPanel({ planet }: PlanetInfoPanelProps) {
  const facts = PLANET_FACTS[planet.id] || []
  const icon = PLANET_ICONS[planet.id] || "🪐"

  return (
    <Card className="p-6 border-2" style={{ borderColor: planet.color }}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-6xl">{icon}</span>
          <div>
            <h3 className="text-3xl font-bold" style={{ color: planet.color }}>
              {planet.name}
            </h3>
            <p className="text-muted-foreground">
              Duración del día: {planet.rotation_hours.toFixed(1)} horas terrestres
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-foreground">Datos curiosos:</h4>
          <ul className="space-y-2">
            {facts.map((fact, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span style={{ color: planet.color }}>•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
