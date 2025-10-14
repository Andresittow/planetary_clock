from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from clock_engine import ClockEngine
import uvicorn

app = FastAPI(title="Planetary Clock API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize clock engine
clock = ClockEngine()

class TimeRequest(BaseModel):
    elapsed_seconds: int = 0

@app.get("/")
def root():
    """API root endpoint"""
    return {
        "message": "Planetary Clock API",
        "version": "1.0.0",
        "endpoints": {
            "/time/earth": "Get Earth time",
            "/time/earth/{city_id}": "Get time for specific city",
            "/time/planet/{planet_id}": "Get time for specific planet",
            "/planets": "Get all planets data",
            "/cities": "Get all cities data"
        }
    }

@app.get("/time/earth")
def get_earth_time():
    """Get current Earth time using circular doubly linked lists"""
    time_data = clock.get_earth_time()
    return {
        "planet": "earth",
        "time": time_data,
        "message": "Hora actual de la Tierra"
    }

@app.get("/time/earth/{city_id}")
def get_city_time(city_id: str):
    """Get time for a specific city"""
    cities = clock.get_all_cities()
    if city_id not in cities:
        raise HTTPException(status_code=404, detail=f"Ciudad '{city_id}' no encontrada")
    
    time_data = clock.get_earth_time(city_id)
    return {
        "city": city_id,
        "city_name": cities[city_id]["name"],
        "time": time_data,
        "utc_offset": cities[city_id]["utc_offset"]
    }

@app.post("/time/planet/{planet_id}")
def get_planet_time(planet_id: str, request: TimeRequest):
    """Get time for a specific planet based on elapsed seconds"""
    planets = clock.get_all_planets()
    if planet_id not in planets:
        raise HTTPException(status_code=404, detail=f"Planeta '{planet_id}' no encontrado")
    
    time_data = clock.get_planet_time(planet_id, request.elapsed_seconds)
    return {
        "planet": planet_id,
        "planet_name": planets[planet_id]["name"],
        "time": time_data,
        "rotation_hours": planets[planet_id]["rotation_hours"]
    }

@app.get("/planets")
def get_planets():
    """Get all available planets"""
    return {
        "planets": clock.get_all_planets()
    }

@app.get("/cities")
def get_cities():
    """Get all available cities"""
    return {
        "cities": clock.get_all_cities()
    }

if __name__ == "__main__":
    print("🚀 Starting Planetary Clock API Server...")
    print("📡 API will be available at: http://localhost:8000")
    print("📚 API Documentation at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
