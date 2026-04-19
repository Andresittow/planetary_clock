from datetime import datetime, timezone, timedelta
try:
    from .circular_list import CircularDoublyLinkedList
except ImportError:
    from circular_list import CircularDoublyLinkedList

class ClockEngine:
    """Clock engine using circular doubly linked lists for time management"""
    
    def __init__(self):
        # Create circular lists for hours (0-23), minutes (0-59), seconds (0-59)
        self.hours_list = CircularDoublyLinkedList(24)
        self.minutes_list = CircularDoublyLinkedList(60)
        self.seconds_list = CircularDoublyLinkedList(60)
        
        # Planet data with rotation periods in Earth hours
        self.planets = {
            "earth": {"name": "Tierra", "rotation_hours": 24, "color": "#4a90ff"},
            "mercury": {"name": "Mercurio", "rotation_hours": 1408.8, "color": "#a0a0a0"},
            "venus": {"name": "Venus", "rotation_hours": 5832.5, "color": "#ffd700"},
            "mars": {"name": "Marte", "rotation_hours": 24.6, "color": "#ff6b4a"},
            "jupiter": {"name": "Júpiter", "rotation_hours": 9.9, "color": "#ff9d5c"},
            "saturn": {"name": "Saturno", "rotation_hours": 10.7, "color": "#ffd89c"},
            "uranus": {"name": "Urano", "rotation_hours": 17.2, "color": "#00d9ff"},
            "neptune": {"name": "Neptuno", "rotation_hours": 16.1, "color": "#4a6fff"}
        }
        
        # City timezones (UTC offset in hours)
        self.cities = {
            "new_york": {"name": "Nueva York", "utc_offset": -5},
            "london": {"name": "Londres", "utc_offset": 0},
            "paris": {"name": "París", "utc_offset": 1},
            "tokyo": {"name": "Tokio", "utc_offset": 9},
            "sydney": {"name": "Sídney", "utc_offset": 11},
            "dubai": {"name": "Dubái", "utc_offset": 4},
            "moscow": {"name": "Moscú", "utc_offset": 3},
            "beijing": {"name": "Pekín", "utc_offset": 8},
            "los_angeles": {"name": "Los Ángeles", "utc_offset": -8},
            "mexico_city": {"name": "Ciudad de México", "utc_offset": -6},
            "sao_paulo": {"name": "São Paulo", "utc_offset": -3},
            "mumbai": {"name": "Bombay", "utc_offset": 5.5}
        }
    
    def get_earth_time(self, city_id=None):
        """Get current Earth time using circular lists"""
        if city_id and city_id in self.cities:
            # Get time for specific city
            utc_now = datetime.now(timezone.utc)
            offset = self.cities[city_id]["utc_offset"]
            city_time = utc_now + timedelta(hours=offset)
            hours = city_time.hour
            minutes = city_time.minute
            seconds = city_time.second
        else:
            # Get local system time
            now = datetime.now()
            hours = now.hour
            minutes = now.minute
            seconds = now.second
        
        # Set circular lists to current time
        self.hours_list.set_value(hours)
        self.minutes_list.set_value(minutes)
        self.seconds_list.set_value(seconds)
        
        return {
            "hours": self.hours_list.get_current(),
            "minutes": self.minutes_list.get_current(),
            "seconds": self.seconds_list.get_current()
        }
    
    def get_planet_time(self, planet_id, elapsed_seconds=0):
        """Calculate planet time based on rotation period using circular lists"""
        if planet_id not in self.planets:
            return self.get_earth_time()
        
        planet = self.planets[planet_id]
        rotation_hours = planet["rotation_hours"]
        
        if planet_id == "earth":
            return self.get_earth_time()
        
        # Calculate how fast time passes on this planet relative to Earth
        # For example, Jupiter rotates in 9.9 hours, so its "day" is faster
        time_multiplier = 24 / rotation_hours
        
        # Calculate planet time based on elapsed seconds
        planet_seconds = elapsed_seconds * time_multiplier
        
        # Convert to hours, minutes, seconds using circular lists
        total_seconds = int(planet_seconds)
        
        seconds = total_seconds % 60
        total_minutes = total_seconds // 60
        minutes = total_minutes % 60
        hours = (total_minutes // 60) % 24
        
        # Set circular lists
        self.hours_list.set_value(hours)
        self.minutes_list.set_value(minutes)
        self.seconds_list.set_value(seconds)
        
        return {
            "hours": self.hours_list.get_current(),
            "minutes": self.minutes_list.get_current(),
            "seconds": self.seconds_list.get_current()
        }
    
    def increment_second(self):
        """Increment one second using circular list (wraps around automatically)"""
        new_second = self.seconds_list.move_forward()
        
        # If we wrapped around to 0, increment minute
        if new_second == 0:
            new_minute = self.minutes_list.move_forward()
            
            # If minute wrapped around to 0, increment hour
            if new_minute == 0:
                self.hours_list.move_forward()
        
        return {
            "hours": self.hours_list.get_current(),
            "minutes": self.minutes_list.get_current(),
            "seconds": self.seconds_list.get_current()
        }
    
    def get_all_planets(self):
        """Get list of all planets"""
        return self.planets
    
    def get_all_cities(self):
        """Get list of all cities"""
        return self.cities
