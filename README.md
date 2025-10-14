# Sistema de Relojes Planetarios Interactivos

Sistema de relojes que muestra la hora en diferentes planetas y ciudades del mundo, implementado con **listas dobles circulares** en Python para el backend y React/Next.js para el frontend.

## Características

- **Backend en Python**: Usa listas dobles circulares para manejar horas (0-23), minutos (0-59) y segundos (0-59)
- **Relojes Planetarios**: Visualiza cómo pasa el tiempo en los 8 planetas del sistema solar
- **Zonas Horarias**: Consulta la hora local de 12 ciudades importantes del mundo
- **Interfaz Espacial**: Diseño futurista con animaciones y efectos visuales

## Estructura del Proyecto

\`\`\`
├── scripts/                    # Backend Python
│   ├── circular_list.py       # Implementación de lista doble circular
│   ├── clock_engine.py        # Motor de cálculo de tiempo planetario
│   ├── api_server.py          # API REST con FastAPI
│   └── requirements.txt       # Dependencias de Python
├── app/                       # Frontend Next.js
├── components/                # Componentes React
└── lib/                       # Utilidades del frontend
\`\`\`

## Instalación y Ejecución

### 1. Backend (Python)

**Requisitos**: Python 3.8 o superior

\`\`\`bash
# Navegar a la carpeta de scripts
cd scripts

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servidor
python api_server.py
\`\`\`

El servidor estará disponible en `http://localhost:8000`

Puedes verificar que funciona visitando:
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### 2. Frontend (Next.js)
**En local:**
\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
\`\`\`

Visita `http://localhost:3000`

## Endpoints de la API

### Planetas
- `GET /api/planets` - Lista todos los planetas
- `GET /api/planets/{planet_id}` - Obtiene un planeta específico
- `GET /api/planets/{planet_id}/time` - Calcula el tiempo actual en ese planeta

### Ciudades
- `GET /api/cities` - Lista todas las ciudades
- `GET /api/cities/{city_id}` - Obtiene una ciudad específica
- `GET /api/cities/{city_id}/time` - Calcula la hora local en esa ciudad

### Sistema
- `GET /health` - Verifica el estado del servidor
- `GET /docs` - Documentación interactiva de la API

## Listas Dobles Circulares

El sistema usa listas dobles circulares para representar el ciclo de tiempo:

- **Horas**: 0 → 1 → 2 → ... → 23 → 0 (circular)
- **Minutos**: 0 → 1 → 2 → ... → 59 → 0 (circular)
- **Segundos**: 0 → 1 → 2 → ... → 59 → 0 (circular)

Cada nodo contiene:
- `value`: El valor numérico (hora, minuto o segundo)
- `next`: Referencia al siguiente nodo
- `prev`: Referencia al nodo anterior

Cuando llegas al último nodo (23, 59, o 59), el siguiente es el primero (0), creando un ciclo infinito.

## Cómo Funcionan los Relojes Planetarios

Cada planeta tiene un período de rotación diferente:

- **Tierra**: 24 horas (referencia)
- **Mercurio**: 1,408 horas (59 días terrestres) - reloj muy lento
- **Venus**: 5,832 horas (243 días terrestres) - reloj extremadamente lento
- **Marte**: 24.6 horas - similar a la Tierra
- **Júpiter**: 9.9 horas - reloj rápido
- **Saturno**: 10.7 horas - reloj rápido
- **Urano**: 17.2 horas - reloj moderado
- **Neptuno**: 16.1 horas - reloj moderado

El backend calcula cuánto tiempo ha pasado en cada planeta desde el inicio del día terrestre actual, usando las listas circulares para avanzar las manecillas correctamente.

## Tecnologías

**Backend:**
- Python 3.8+
- FastAPI (API REST)
- Uvicorn (servidor ASGI)
- Listas dobles circulares (estructura de datos personalizada)

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide Icons

## Funcionalidad Adicional

Además del reloj básico, el sistema incluye:
- Visualización de 8 planetas con sus características únicas
- 12 ciudades con diferentes zonas horarias
- Controles de pausa/reanudación
- Navegación circular entre planetas
- Información educativa sobre cada planeta
- Diseño espacial con estrellas animadas
- Manecillas de horas, minutos y segundos

## Autor

Proyecto desarrollado como taller de Python con estructuras de datos (listas dobles circulares).
