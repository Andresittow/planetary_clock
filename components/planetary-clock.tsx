"use client"

import { useEffect, useState } from "react"
import { getEarthTime, getCityTime, getPlanetTime } from "@/lib/api-client"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

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

interface PlanetaryClockProps {
  planet: Planet
  selectedCity?: City | null
}

export function PlanetaryClock({ planet, selectedCity }: PlanetaryClockProps) {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    async function fetchTime() {
      try {
        if (selectedCity) {
          // Get city time from API
          const response = await getCityTime(selectedCity.id)
          setHours(response.time.hours)
          setMinutes(response.time.minutes)
          setSeconds(response.time.seconds)
        } else if (planet.id === "earth") {
          // Get Earth time from API
          const time = await getEarthTime()
          setHours(time.hours)
          setMinutes(time.minutes)
          setSeconds(time.seconds)
        } else {
          // Get planet time from API
          const response = await getPlanetTime(planet.id, elapsedSeconds)
          setHours(response.time.hours)
          setMinutes(response.time.minutes)
          setSeconds(response.time.seconds)
        }
      } catch (error) {
        console.error("[v0] Error fetching time from API:", error)
      }
    }

    fetchTime()
  }, [planet, selectedCity, elapsedSeconds])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      if (planet.id === "earth" || selectedCity) {
        // For Earth and cities, increment normally
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((m) => {
              if (m === 59) {
                setHours((h) => (h + 1) % 24)
                return 0
              }
              return m + 1
            })
            return 0
          }
          return prev + 1
        })
      } else {
        // For other planets, increment elapsed seconds for API calculation
        setElapsedSeconds((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, planet.id, selectedCity])

  const handleReset = async () => {
    setElapsedSeconds(0)
    try {
      if (selectedCity) {
        const response = await getCityTime(selectedCity.id)
        setHours(response.time.hours)
        setMinutes(response.time.minutes)
        setSeconds(response.time.seconds)
      } else if (planet.id === "earth") {
        const time = await getEarthTime()
        setHours(time.hours)
        setMinutes(time.minutes)
        setSeconds(time.seconds)
      } else {
        const response = await getPlanetTime(planet.id, 0)
        setHours(response.time.hours)
        setMinutes(response.time.minutes)
        setSeconds(response.time.seconds)
      }
    } catch (error) {
      console.error("[v0] Error resetting time:", error)
    }
  }

  const handleAdvance = () => {
    setHours((prev) => (prev + 1) % 24)
  }

  const handleRewind = () => {
    setHours((prev) => (prev - 1 + 24) % 24)
  }

  // Calculate hand rotations
  const hourRotation = ((hours % 12) / 12) * 360 + (minutes / 60) * 30
  const minuteRotation = (minutes / 60) * 360 + (seconds / 60) * 6
  const secondRotation = (seconds / 60) * 360

  const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  const displayColor = selectedCity ? "#00d9ff" : planet.color
  const displayTitle = selectedCity ? selectedCity.name : planet.name

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold" style={{ color: displayColor }}>
        {displayTitle}
      </h2>

      {/* Clock display */}
      <div className="relative">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-50"
          style={{
            background: `radial-gradient(circle, ${displayColor} 0%, transparent 70%)`,
            transform: "scale(1.2)",
          }}
        />

        {/* Clock face */}
        <div
          className="relative w-80 h-80 rounded-full border-4 flex items-center justify-center"
          style={{
            borderColor: displayColor,
            background: `radial-gradient(circle at 30% 30%, ${displayColor}22, transparent)`,
            boxShadow: `0 0 40px ${displayColor}66, inset 0 0 40px ${displayColor}22`,
          }}
        >
          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360
            const isQuarter = i % 3 === 0
            return (
              <div
                key={i}
                className="absolute bg-foreground/30"
                style={{
                  width: isQuarter ? "3px" : "2px",
                  height: isQuarter ? "20px" : "12px",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-140px)`,
                  transformOrigin: "center",
                }}
              />
            )
          })}

          {/* Minute markers */}
          {Array.from({ length: 60 }).map((_, i) => {
            if (i % 5 === 0) return null
            const angle = (i / 60) * 360
            return (
              <div
                key={`min-${i}`}
                className="absolute w-px h-2 bg-foreground/20"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-140px)`,
                  transformOrigin: "center",
                }}
              />
            )
          })}

          {/* Hour hand */}
          <div
            className="absolute rounded-full transition-transform duration-1000 ease-linear"
            style={{
              width: "6px",
              height: "80px",
              backgroundColor: displayColor,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
              transformOrigin: "bottom center",
              boxShadow: `0 0 15px ${displayColor}`,
              zIndex: 3,
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute rounded-full transition-transform duration-1000 ease-linear"
            style={{
              width: "4px",
              height: "120px",
              backgroundColor: displayColor,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
              transformOrigin: "bottom center",
              boxShadow: `0 0 20px ${displayColor}`,
              opacity: 0.9,
              zIndex: 2,
            }}
          />

          {/* Seconds hand */}
          <div
            className="absolute rounded-full transition-transform duration-1000 ease-linear"
            style={{
              width: "2px",
              height: "130px",
              backgroundColor: "#ff4444",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -100%) rotate(${secondRotation}deg)`,
              transformOrigin: "bottom center",
              boxShadow: "0 0 10px #ff4444",
              opacity: 0.8,
              zIndex: 1,
            }}
          />

          {/* Center dot */}
          <div className="absolute w-4 h-4 rounded-full z-10" style={{ backgroundColor: displayColor }} />

          {/* Time display */}
          <div className="absolute bottom-16 text-3xl font-bold font-mono" style={{ color: displayColor }}>
            {timeString}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleRewind}
          className="px-6 py-3 rounded-lg bg-card border-2 hover:bg-muted transition-all hover:scale-105 flex items-center gap-2"
          style={{ borderColor: displayColor }}
          title="Retroceder 1 hora"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: displayColor }} />
          <span className="font-semibold" style={{ color: displayColor }}>
            Atrás
          </span>
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
          style={{
            backgroundColor: displayColor,
            color: "#0a0a0f",
            boxShadow: `0 0 20px ${displayColor}66`,
          }}
        >
          {isRunning ? "Pausar" : "Reanudar"}
        </button>

        <button
          onClick={handleAdvance}
          className="px-6 py-3 rounded-lg bg-card border-2 hover:bg-muted transition-all hover:scale-105 flex items-center gap-2"
          style={{ borderColor: displayColor }}
          title="Avanzar 1 hora"
        >
          <span className="font-semibold" style={{ color: displayColor }}>
            Adelante
          </span>
          <ChevronRight className="w-5 h-5" style={{ color: displayColor }} />
        </button>

        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-lg bg-card border-2 hover:bg-muted transition-all hover:scale-105 flex items-center gap-2"
          style={{ borderColor: displayColor }}
          title="Reiniciar a hora actual"
        >
          <RotateCcw className="w-5 h-5" style={{ color: displayColor }} />
          <span className="font-semibold" style={{ color: displayColor }}>
            Reiniciar
          </span>
        </button>
      </div>
    </div>
  )
}
