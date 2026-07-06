# ⚽ World Cup 2026 - Top Scorers Player Cards

Aplicación web que muestra el ranking actualizado de goleadores del Mundial 2026 con **Player Cards estilo FIFA Ultimate Team** generadas por inteligencia artificial.

## 🎯 Descripción

Este proyecto combina datos oficiales de fútbol con generación de contenido por IA para crear tarjetas de jugador profesionales. Cada goleador tiene:

- ✅ **Datos oficiales** de football-data.org (goles, asistencias, partidos)
- 🤖 **Descripción épica** generada por Groq AI en español latinoamericano
- 📊 **Ratings estilo videojuego** (PAC, ATT, FIN, DRI, FOR) calculados por IA
- 🎨 **Diseño moderno** con animaciones y tema oscuro

## 🚀 Características

- **Tiempo real**: Datos actualizados cada 5 minutos desde football-data.org
- **Inteligencia Artificial**: Descripciones y ratings generados por Groq (Llama 3.3 70B)
- **Caché inteligente**: Optimización de performance con caché en memoria
- **Responsive**: Funciona perfectamente en móvil, tablet y desktop
- **Manejo de errores**: Fallbacks automáticos si las APIs fallan
- **TypeScript**: Código tipado para mayor seguridad y mantenibilidad

## 🛠️ Tecnologías

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **API Routes** (Next.js)
- **Node Cache** (caché en memoria)
- **ISR** (Incremental Static Regeneration)

### APIs Externas
- **football-data.org**: Datos oficiales del Mundial 2026
- **Groq**: Generación de contenido con Llama 3.3 70B

## 📦 Instalación

### Requisitos previos

- Node.js 18+ instalado
- API key de [football-data.org](https://www.football-data.org/client/register)
- API key de [Groq](https://console.groq.com/keys)

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/ecc97/world-cup-top-scores-2026.git
cd world-cup-top-scores-2026
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# API key de football-data.org
FOOTBALL_DATA_API_KEY=tu_api_key_aqui

# API key de Groq
GROQ_API_KEY=tu_groq_api_key_aqui
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Header     │  │ ScorersList  │  │ PlayerModal  │      │
│  │  (Server)    │  │  (Client)    │  │  (Client)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Routes (Backend)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────┐      ┌────────────────────┐         │
│  │  /api/scorers      │      │  /api/player?id=X  │         │
│  │  ISR (5 min)       │      │  Caché (1 hora)    │         │
│  └────────────────────┘      └────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      APIs Externas                           │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────┐      ┌────────────────────┐         │
│  │ football-data.org  │      │    Groq API        │         │
│  │ Datos oficiales    │      │  Llama 3.3 70B     │         │
│  └────────────────────┘      └────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de datos

1. **Usuario abre la app** → `page.tsx` (Server Component) renderiza la estructura
2. **ScorersList** (Client Component) hace fetch a `/api/scorers`
3. **API Route** consulta football-data.org con ISR de 5 minutos
4. **Usuario hace clic en un jugador** → Modal abre y llama a `/api/player?id=X`
5. **API Route** verifica caché:
   - Si existe análisis IA → devuelve de caché
   - Si no existe → llama a Groq, guarda en caché y devuelve
6. **PlayerCard** renderiza la tarjeta con datos + análisis IA

## 📁 Estructura del proyecto

```
world-cup-top-scorers/
├── app/
│   ├── api/
│   │   ├── scorers/
│   │   │   └── route.ts          # GET lista de goleadores
│   │   └── player/
│   │       └── route.ts          # GET análisis de jugador
│   ├── layout.tsx                # Root layout con fuentes
│   ├── page.tsx                  # Página principal
│   └── globals.css               # Estilos globales
├── components/
│   ├── Header.tsx            # Server Component
│   ├── ScorersList.tsx       # Client Component
│   ├── ScorerCard.tsx        # Client Component
│   ├── PlayerCard.tsx        # Client Component
│   └── PlayerModal.tsx       # Client Component
├── hooks/
│   └── usePlayer.ts          # Hook para fetch de jugador
├── lib/
│   ├── football-data.ts          # Cliente football-data.org
│   ├── groq.ts                   # Cliente Groq con SDK
│   ├── cache.ts                  # Wrapper node-cache
│   └── countries.ts              # Mapa de países (colores, banderas)
├── types/
│   ├── football-data.ts      # Tipos API externa
│   ├── domain.ts             # Tipos del dominio
│   ├── groq.ts               # Tipos respuesta Groq
│   ├── api.ts                # Tipos API routes
│   └── index.ts              # Re-exportaciones
├── public/                       # Assets estáticos
├── .env.local                    # Variables de entorno (no subir)
├── .env.example                  # Ejemplo de variables (subir)
├── next.config.ts                # Configuración Next.js
├── tsconfig.json                 # Configuración TypeScript
└── package.json                  # Dependencias y scripts
```

## 🎮 Uso

### Lista de goleadores

Al abrir la app, verás:
- Ranking de goleadores ordenados por número de goles
- Estadísticas resumidas (máx. goles, total jugadores, etc.)
- Barras de progreso relativas al máximo goleador
- Click en cualquier jugador para ver su Player Card

### Player Card (Modal)

Al hacer clic en un jugador:
- Se abre un modal con la Player Card estilo FIFA
- Se genera automáticamente una descripción épica
- Se muestran ratings (PAC, ATT, FIN, DRI, FOR, FORM)
- Se visualizan estadísticas detalladas

**Navegación:**
- Cerrar modal: Click en ✕, tecla `Escape`, o click fuera del modal
- Scroll del body bloqueado mientras el modal está abierto

## 🔧 Configuración

### Optimización de imágenes

El proyecto está configurado para optimizar imágenes de `crests.football-data.org` automáticamente. Si necesitas añadir más dominios, edita `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'crests.football-data.org',
      pathname: '/**',
    },
    // Añadir más dominios aquí
  ],
}
```

### Tiempos de caché

Puedes ajustar los tiempos de caché según tus necesidades:

- **football-data.org**: 5 minutos (configurado en `lib/football-data.ts`)
- **Groq**: 1 hora (configurado en `lib/cache.ts`)


## 🐛 Troubleshooting

### Error: "FOOTBALL_DATA_API_KEY no está configurada"

**Solución:** Verifica que tu archivo `.env.local` existe y tiene la variable correcta.

### Error: "Timeout al conectar con Groq"

**Solución:** 
- Verifica tu conexión a internet
- Revisa que tu API key de Groq sea válida
- Si el problema persiste, el fallback generará ratings basados en estadísticas

### Las imágenes de los escudos no cargan

**Solución:**
- Verifica que `next.config.ts` tiene la configuración de `remotePatterns`
- El fallback automático mostrará las iniciales del jugador

### El análisis IA tarda mucho en generarse

**Solución:** 
- La primera generación puede tardar 1-3 segundos
- Las siguientes visitas usarán caché (respuesta instantánea)
- Si Groq está lento, el fallback se activa automáticamente

## 📊 Rate Limits

### football-data.org
- **Plan Free**: 10 requests/minute
- **Mitigación**: ISR de 5 minutos reduce llamadas drásticamente

### Groq
- **Plan Free**: Rate limits variables
- **Mitigación**: Caché de 1 hora por jugador

## 🔄 Posibles mejoras futuras

- [ ] Añadir fotos de jugadores (API-Football)
- [ ] Compartir Player Cards en redes sociales
- [ ] Descargar Player Cards como PNG
- [ ] Comparar jugadores (side-by-side)
- [ ] Filtrar por selección o posición
- [ ] Historial de goleadores por jornada
- [ ] Notificaciones cuando cambia el ranking
- [ ] Dark/Light mode toggle

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

[ecc97] - [Edwin]

## 🙏 Agradecimientos

- **football-data.org** por proporcionar datos oficiales del Mundial 2026
- **Groq** por el acceso a modelos de IA de alta velocidad
- **Next.js** por el excelente framework
- **Tailwind CSS** por el sistema de diseño

---

**Nota:** Este proyecto es con fines educativos y de demostración. Los datos de goles y partidos son oficiales, pero las descripciones y ratings son generados por IA con fines recreativos.

---