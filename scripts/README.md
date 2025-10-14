# Planetary Clock Backend - Python API

Este es el backend en Python para el sistema de relojes planetarios, utilizando **listas dobles circulares** para manejar las horas, minutos y segundos.

## Estructura del Proyecto

- `circular_list.py`: Implementación de la lista doble circular
- `clock_engine.py`: Motor del reloj que usa las listas circulares
- `api_server.py`: API REST con FastAPI
- `requirements.txt`: Dependencias de Python

## Instalación

1. Instalar dependencias:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Ejecutar el Servidor

\`\`\`bash
python api_server.py
\`\`\`

El servidor estará disponible en: `http://localhost:8000`

Documentación interactiva: `http://localhost:8000/docs`

## Endpoints Disponibles

- `GET /time/earth` - Obtener hora actual de la Tierra
- `GET /time/earth/{city_id}` - Obtener hora de una ciudad específica
- `POST /time/planet/{planet_id}` - Obtener hora de un planeta (requiere elapsed_seconds)
- `GET /planets` - Listar todos los planetas
- `GET /cities` - Listar todas las ciudades

## Listas Dobles Circulares

El sistema utiliza tres listas dobles circulares:
- **Horas**: 0-23 (24 nodos)
- **Minutos**: 0-59 (60 nodos)
- **Segundos**: 0-59 (60 nodos)

Cada lista es circular, por lo que después del último valor vuelve al primero automáticamente.
