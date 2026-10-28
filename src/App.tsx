'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Award,
  Camera,
  Check,
  CheckCircle2,
  GlassWater,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  PartyPopper,
  Phone,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Utensils,
  Wine,
  X,
  Zap,
} from 'lucide-react'
import VideoTestimonials from '@/components/VideoTestimonials'

const OWNER_PHONE = '56948886391'

const packs = [
  {
    id: 'classic',
    name: 'Clásico',
    price: 49990,
    description: 'Cena de 3 tiempos servida a la mesa, cóctel de bienvenida y barra libre.',
    badge: '',
    limits: {
      bocados: 3,
      entrada: 1,
      proteina: 1,
      guarnicion: 1,
      postre: 1,
      coctelBienvenida: 2,
      destilados: 1,
      coctelesBarra: 2,
    },
    drinksSummary: 'Coctelería de bienvenida (2 variedades ilimitadas) + 1 botella de vino por mesa + Barra libre (2 cócteles + 1 destilado)',
    features: [
      'Cena de 3 tiempos servida a la mesa (Entrada, Plato principal y Postre dirigido)',
      'Cóctel de bienvenida: 3 variedades de bocados de inicio',
      'Coctelería de bienvenida ilimitada (2 variedades)',
      'Hidratación ilimitada durante todo el evento',
      'Vino durante la cena: 1 botella por mesa',
      'Barra libre: 2 cócteles + 1 destilado',
      'DJ en vivo, amplificación profesional e iluminación',
      'Animador profesional durante toda la jornada',
      'Garzones profesionales y equipo de cocina completo',
      'Mobiliario, vajilla, mantelería, maquinaria y local o parcela incluida',
      '8 horas de servicio completo',
    ],
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 59990,
    description: 'Incorpora cóctel de trasnoche con consomé, mayor variedad gastronómica, postre buffet, cafetería y vino ilimitado durante la cena.',
    badge: 'Más elegido',
    limits: {
      bocados: 5,
      entrada: 1,
      proteina: 1,
      guarnicion: 1,
      postre: 3,
      coctelBienvenida: 2,
      destilados: 2,
      coctelesBarra: 2,
    },
    drinksSummary: 'Coctelería de bienvenida (2 variedades ilimitadas) + Vino con relleno de copas a la mesa + Barra libre (2 cócteles + 2 destilados)',
    features: [
      'Cena de 3 tiempos + Buffet de postres (3 variedades)',
      'Total 5 variedades de bocados (3 de bienvenida + 2 de trasnoche)',
      'Consomé de regalo para todos los invitados',
      'Coctelería de bienvenida ilimitada (2 variedades)',
      'Hidratación ilimitada: Bebidas, jugos naturales (2 sabores) y aguas saborizadas',
      'Vino durante la cena: 1 botella por mesa + relleno de copas a la mesa',
      'Cafetería incluida (café y té)',
      'Barra libre: 2 cócteles + 2 destilados (Ron, Pisco, Whisky, Vodka)',
      'DJ en vivo, amplificación profesional e iluminación',
      'Animador profesional durante toda la jornada (concursos, dinámicas e interacción)',
      'Garzones profesionales, bartender especializado y equipo de cocina completo',
      'Mobiliario, vajilla, mantelería, maquinaria y local o parcela incluida',
      '8 horas de servicio completo',
    ],
  },
  {
    id: 'golden',
    name: 'Golden / Súper VIP',
    price: 64990,
    description: 'Todo lo del VIP, con 7 variedades de bocados, 2 guarniciones, mayor variedad de barra, postres, Cámara 360° (1 hora) y cotillón.',
    badge: 'Experiencia top',
    limits: {
      bocados: 7,
      entrada: 1,
      proteina: 1,
      guarnicion: 2,
      postre: 5,
      coctelBienvenida: 3,
      destilados: 2,
      coctelesBarra: 3,
    },
    drinksSummary: 'Coctelería de bienvenida (3 variedades ilimitadas) + Vino ilimitado durante la cena + Barra libre (3 cócteles + 2 destilados)',
    features: [
      'Cena de 3 tiempos (Plato principal con 2 guarniciones incluidas)',
      'Total 7 variedades de bocados (4 de bienvenida + 3 de trasnoche + Chupe de mariscos y sopaipillitas)',
      'Consomé de regalo para todos los invitados',
      'Cámara 360° disponible para todos los invitados (1 hora, durante el cóctel de bienvenida)',
      'Experiencia festiva: Entrega de cotillón para los festejados',
      'Coctelería de bienvenida ilimitada (3 variedades)',
      'Hidratación ilimitada: Bebidas, jugos naturales (3 sabores) y aguas saborizadas',
      'Vino tinto ilimitado durante la cena',
      'Buffet de postres (5 variedades) + Cafetería e infusiones ilimitadas todo el evento',
      'Barra libre: 3 cócteles + 2 destilados (incluye Gin y Vodka Black)',
      'DJ en vivo, amplificación profesional e iluminación',
      'Animador profesional durante toda la jornada',
      'Garzones profesionales, bartender especializado y equipo de cocina completo',
      'Mobiliario, vajilla, mantelería, maquinaria y local o parcela incluida',
      '8 horas de servicio completo',
    ],
  },
  {
    id: 'silver',
    name: 'Silver Plus',
    price: 69990,
    description: 'El servicio más completo: incluye todo lo del Golden/Súper VIP y agrega Cámara 360° (2 horas), Cabina Fotográfica (2 horas), Robot LED Show y cotillón premium.',
    badge: 'Producción total',
    limits: {
      bocados: 7,
      entrada: 1,
      proteina: 1,
      guarnicion: 2,
      postre: 6,
      coctelBienvenida: 4,
      destilados: 2,
      coctelesBarra: 3,
    },
    drinksSummary: 'Coctelería de bienvenida (4 variedades ilimitadas) + Vino ilimitado durante la cena + Barra libre (3 cócteles + 2 destilados)',
    features: [
      'El servicio más completo con máximo nivel de producción y entretenimiento',
      'Cámara 360° (2 horas)',
      'Cabina Fotográfica (2 horas)',
      'Robot LED Show en pista de baile',
      'Cotillón / Experiencia festiva premium para todos los invitados',
      'Total 7 variedades de bocados (5 de bienvenida + 3 de trasnoche) + Consomé de regalo',
      'Coctelería de bienvenida ilimitada (4 variedades)',
      'Plato principal con 2 guarniciones incluidas',
      'Buffet de postres (6 variedades) + Cafetería e infusiones ilimitadas',
      'Vino tinto ilimitado durante la cena',
      'Barra libre: 3 cócteles + 2 destilados',
      'DJ en vivo, amplificación profesional e iluminación',
      'Animador profesional durante toda la jornada',
      'Garzones profesionales, bartender especializado y equipo de cocina completo',
      'Producción y coordinación integral con supervisión permanente',
      'Mobiliario, vajilla, mantelería, maquinaria y local o parcela incluida',
      '8 horas de servicio completo',
    ],
  },
]

const venues = [
  {
    id: 0,
    name: 'Espacio Rústico',
    place: 'Padre Hurtado',
    detail: 'Parcela rústica, salón elegante y pérgola para ceremonias rodeada de áreas verdes.',
    icon: '✦',
    image: '/images/venue_espacio_rustico.jpg',
  },
  {
    id: 1,
    name: 'Mi Campo Rinconada',
    place: 'Maipú',
    detail: 'Amplias áreas verdes, piscina, salón techado y mobiliario de banquetería de primer nivel.',
    icon: '◒',
    image: '/images/venue_mi_campo_rinconada.jpg',
  },
  {
    id: 2,
    name: 'Club 59',
    place: 'Quinta Normal',
    detail: 'Nuestro nuevo salón de eventos exclusivo con pista iluminada y ambientación premium.',
    icon: '✧',
    image: '/images/venue_club_59.jpg',
  },
  {
    id: 3,
    name: 'Tu propio lugar',
    place: 'Donde tú quieras',
    detail: 'Llevamos la producción y banquetería completa a tu domicilio, parcela o terreno particular.',
    icon: '⌂',
    image: '/images/venue_tu_propio_lugar.jpg',
  },
]

const themes = [
  { id: 'Tradicional', name: 'Tradicional', desc: 'Clásica, sobria y elegante con iluminación cálida', tag: 'Atemporal' },
  { id: 'Flúor', name: 'Flúor & Neón', desc: 'Luces UV, accesorios glow y ambientación de fiesta total', tag: 'Más popular' },
  { id: 'Oriental', name: 'Oriental', desc: 'Faroles, tonos cálidos y ambientación temática especial', tag: 'Exclusiva' },
  { id: 'Hawaiana', name: 'Hawaiana Tropical', desc: 'Vibra fresca, guirnaldas florales y coctelería frutal', tag: 'Verano & Frescura' },
]

const officialBocados = [
  'Empanaditas de queso',
  'Tapaditos en variedades',
  'Canapés en variedades',
  'Crostini en variedades',
  'Pinchos de ave con salsa del chef',
  'Tabla mixta (frutos secos, frutas, snacks, quesos y jamones)',
  'Brochetas de fruta de la estación',
  'Cocadas de manjar',
  'Variedad de dulces chilenos',
  'Chupe de mariscos en galletas snack',
  'Mini sopaipillas con pebre',
]

const officialEntradas = [
  'Tartar de tomate',
  'Tartar de atún',
  'Ensalada estacional con pollo en tiras',
  'Crema de calabaza con finas especias',
  'Ensalada Waldorf',
  'Ceviche de champiñones',
  'Ensalada Nicoise',
]

const officialProteinas = [
  'Pollo al jugo',
  'Pollo a la plancha',
  'Carne mechada (vacuno)',
  'Medallón de carne al jugo (vacuno)',
  'Chapsui de ave',
  'Chapsui de vacuno',
  'Pulpa de cerdo al horno',
]

const officialGuarniciones = [
  'Papas rústicas',
  'Papas doradas',
  'Arroz a la jardinera',
  'Arroz al curry',
  'Arroz chaufa',
  'Puré a la mostaza (frío)',
  'Puré picante (frío)',
  'Verduras salteadas',
  'Mix de ensaladas de la estación',
  'Pastelera de choclo con toque de albahaca',
]

const officialPostres = [
  'Crème brûlée',
  'Panacota',
  'Leche asada',
  'Flan de caramelo',
  'Macedonia de frutas de la estación',
  'Pie de limón',
  'Suspiro limeño',
  'Durazno a la crema',
  'Tarta del chef',
]

const welcomeCocktailsList = [
  'Pisco Sour tradicional',
  'Mango Sour',
  'Berry Sour',
  'Daiquiri tradicional',
  'Daiquiri Berry',
  'Mojito tradicional cubano',
  'Mojito Berry',
  'Aperol Spritz',
  'Ramazzotti Violetto / Rosato',
]

const barSpiritsList = [
  'Ron añejo reserva',
  'Pisco chileno 35°/40°',
  'Whisky',
  'Vodka clásico',
  'Vodka Black',
  'Gin premium',
]

const barCocktailsList = [
  'Pisco Sour tradicional',
  'Mango Sour',
  'Berry Sour',
  'Mojito tradicional cubano',
  'Mojito polaco',
  'Mojito Berry',
  'Daiquiri tradicional',
  'Daiquiri Berry',
  'Daiquiri mix de frutas estacionales',
  'Frambuesa Colada',
  'Piña Colada',
  'Aperol Spritz',
  'Ramazzotti Spritz',
]

interface ExtraService {
  id: string
  name: string
  price: number
  hours: string
  description: string
}

const extras: ExtraService[] = [
  { id: 'camara-360', name: 'Cámara 360° (Plataforma giratoria HD)', price: 145000, hours: '1 hora', description: 'Videos 360° en alta definición con efectos, plataforma giratoria y operador dedicado' },
  { id: 'cabina-foto', name: 'Cabina Fotográfica', price: 150000, hours: '2 horas', description: 'Tiras impresas personalizadas ilimitadas con cotillón para fotos y operador' },
  { id: 'espejo-magico', name: 'Espejo Mágico Interactivo', price: 160000, hours: '2 horas', description: 'Espejo táctil de cuerpo completo con fotos impresas al instante' },
  { id: 'robot-led', name: 'Robot LED Show & Pistola CO2', price: 195000, hours: 'En pista de baile', description: 'Show de robot gigante con luces LED, pistola de CO2 y animación interactiva en pista' },
  { id: 'cotillon', name: 'Cotillón Festivo', price: 180000, hours: 'Momento fiesta', description: 'Cotillón festivo completo, antifaces, sombreros y animación' },
  { id: 'cantante', name: 'Cantante en Vivo', price: 130000, hours: 'En vivo', description: 'Interpretación en directo para cóctel de bienvenida o cena' },
  { id: 'magia', name: 'Show de Magia & Ilusionismo', price: 180000, hours: 'Show interactivo', description: 'Magia de cerca en mesas y presentación interactiva de salón' },
  { id: 'fotografo', name: 'Fotógrafo Profesional Dedicado', price: 185000, hours: '8 horas (evento completo)', description: 'Cobertura fotográfica completa y entrega de galería digital en alta definición' },
  { id: 'chispas', name: 'Efecto Chispas Frías (4 unidades)', price: 120000, hours: 'Momento vals / brindis', description: 'Pirotecnia fría 100% segura para vals, brindis o momentos cumbre' },
  { id: 'laser', name: 'Túnel Láser Sincronizado', price: 120000, hours: 'Bloque de fiesta', description: 'Láseres volumétricos sincronizados al ritmo de la música' },
  { id: 'burbujas', name: 'Burbujas & Humo Dual', price: 65000, hours: 'Bloque de fiesta', description: 'Efecto de burbujas rellenas de humo para la pista de baile' },
  { id: 'humo-nube', name: 'Humo Bajo Efecto Nube (Vals)', price: 130000, hours: 'Momento vals', description: 'Nube densa a ras de suelo para un vals o baile soñado' },
  { id: 'bolas-disco', name: 'Cielo de Bolas Disco Espejadas', price: 295000, hours: '8 horas (evento completo)', description: 'Instalación aérea de esferas espejadas vintage con focos cenitales' },
]

// Mapeo oficial de servicios adicionales ya INCLUIDOS en cada pack (costo $0 y bloqueados como incluidos)
const packIncludedExtras: Record<string, string[]> = {
  classic: [],
  vip: [],
  golden: ['camara-360', 'cotillon'],
  silver: ['camara-360', 'cabina-foto', 'robot-led', 'cotillon'],
}

// Obtener duración exacta oficial según el pack seleccionado (sin inventar tiempos)
const getServiceOfficialDuration = (serviceId: string, currentPackId: string) => {
  if (serviceId === 'camara-360') {
    if (currentPackId === 'golden') return '1 hora (durante el cóctel de bienvenida)'
    if (currentPackId === 'silver') return '2 horas'
    return '1 hora'
  }
  if (serviceId === 'cabina-foto') {
    return '2 horas'
  }
  if (serviceId === 'robot-led') {
    return 'En pista de baile'
  }
  if (serviceId === 'fotografo' || serviceId === 'bolas-disco') {
    return '8 horas (evento completo)'
  }
  const found = extras.find((e) => e.id === serviceId)
  return found?.hours || 'Durante el evento'
}

const guestPresets = [50, 80, 100, 150, 200, 250, 300]

const format = (n: number) => `$${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

const formatEventDate = (dateStr: string, long = false) => {
  if (!dateStr || typeof dateStr !== 'string') return 'Por coordinar'
  const parts = dateStr.trim().split('-')
  if (parts.length !== 3) return 'Por coordinar'
  const [year, month, day] = parts
  const monthsLong = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]
  const monthsShort = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sept', 'oct', 'nov', 'dic'
  ]
  const mIndex = parseInt(month, 10) - 1
  const mName = long ? (monthsLong[mIndex] || month) : (monthsShort[mIndex] || month)
  return `${parseInt(day, 10)} de ${mName} de ${year}`
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Desbloqueo y reproducción garantizada del video de fondo en celulares (iOS Safari y Android)
  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    video.defaultMuted = true
    video.muted = true
    video.playsInline = true

    const tryPlay = () => {
      if (!video) return
      video.muted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch(() => {
            // Si el navegador móvil restringe autoplay por modo ahorro de batería,
            // se desbloqueará en el primer toque de pantalla
            setIsVideoPlaying(false)
          })
      }
    }

    tryPlay()

    // Listener para iniciar video al primer toque o scroll en celulares
    const handleMobileUnlock = () => {
      tryPlay()
      window.removeEventListener('touchstart', handleMobileUnlock)
      window.removeEventListener('touchend', handleMobileUnlock)
      window.removeEventListener('scroll', handleMobileUnlock)
      window.removeEventListener('click', handleMobileUnlock)
    }

    window.addEventListener('touchstart', handleMobileUnlock, { passive: true })
    window.addEventListener('touchend', handleMobileUnlock, { passive: true })
    window.addEventListener('scroll', handleMobileUnlock, { passive: true })
    window.addEventListener('click', handleMobileUnlock, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleMobileUnlock)
      window.removeEventListener('touchend', handleMobileUnlock)
      window.removeEventListener('scroll', handleMobileUnlock)
      window.removeEventListener('click', handleMobileUnlock)
    }
  }, [])

  const [packId, setPackId] = useState('golden')
  const [guests, setGuests] = useState(100)
  const [event, setEvent] = useState('Graduación')
  const [eventDate, setEventDate] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [comments, setComments] = useState('')
  const [theme, setTheme] = useState('Flúor')
  const [venue, setVenue] = useState(0)

  // Menu Selections
  const [selectedBocados, setSelectedBocados] = useState<string[]>([
    'Empanaditas de queso',
    'Tapaditos en variedades',
    'Pinchos de ave con salsa del chef',
  ])
  const [selectedEntrada, setSelectedEntrada] = useState<string>('Tartar de atún')
  const [selectedProteina, setSelectedProteina] = useState<string>('Carne mechada (vacuno)')
  const [selectedGuarnicion, setSelectedGuarnicion] = useState<string[]>([
    'Papas rústicas',
    'Pastelera de choclo con toque de albahaca',
  ])
  const [selectedPostres, setSelectedPostres] = useState<string[]>([
    'Crème brûlée',
    'Suspiro limeño',
    'Pie de limón',
  ])

  // Drink Selections
  const [selectedWelcomeDrinks, setSelectedWelcomeDrinks] = useState<string[]>([
    'Mango Sour',
    'Aperol Spritz',
  ])
  const [selectedBarSpirits, setSelectedBarSpirits] = useState<string[]>([
    'Pisco chileno 35°/40°',
    'Ron añejo reserva',
  ])
  const [selectedBarCocktails, setSelectedBarCocktails] = useState<string[]>([
    'Mojito tradicional cubano',
    'Aperol Spritz',
    'Piña Colada',
  ])

  // Servicios opcionales contratados por el usuario de forma manual
  const [selectedOptionalExtras, setSelectedOptionalExtras] = useState<string[]>([])

  const pack = packs.find((p) => p.id === packId) ?? packs[0]

  // Servicios incluidos automáticamente en el pack actual (bloqueados con costo $0)
  const includedServiceIds = useMemo(() => {
    return packIncludedExtras[packId] ?? []
  }, [packId])

  // Cálculo de extras adicionales (solo cobra los NO incluidos en el pack)
  const extrasTotal = useMemo(() => {
    return selectedOptionalExtras.reduce((sum, id) => {
      if (includedServiceIds.includes(id)) return sum
      const extra = extras.find((e) => e.id === id)
      return sum + (extra ? extra.price : 0)
    }, 0)
  }, [selectedOptionalExtras, includedServiceIds])

  const total = guests * pack.price + extrasTotal

  const toggleTheme = (themeId: string) => {
    setTheme((current) => (current === themeId ? '' : themeId))
  }

  const toggleArraySelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    max: number
  ) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value))
    } else {
      if (max === 1) {
        setList([value])
      } else if (list.length < max) {
        setList([...list, value])
      } else {
        setList([...list.slice(0, max - 1), value])
      }
    }
  }

  // Menú efectivo seleccionado con garantía de completitud total en visualización y cotización
  const effectiveBocados = useMemo(() => {
    if (selectedBocados.length > 0) return selectedBocados.slice(0, pack.limits.bocados)
    return officialBocados.slice(0, pack.limits.bocados)
  }, [selectedBocados, pack.limits.bocados])

  const effectiveEntrada = selectedEntrada || officialEntradas[1]
  const effectiveProteina = selectedProteina || officialProteinas[2]

  const effectiveGuarniciones = useMemo(() => {
    if (selectedGuarnicion.length > 0) return selectedGuarnicion.slice(0, pack.limits.guarnicion)
    return officialGuarniciones.slice(0, pack.limits.guarnicion)
  }, [selectedGuarnicion, pack.limits.guarnicion])

  const effectivePostres = useMemo(() => {
    if (selectedPostres.length > 0) return selectedPostres.slice(0, pack.limits.postre)
    return officialPostres.slice(0, pack.limits.postre)
  }, [selectedPostres, pack.limits.postre])

  const effectiveWelcomeDrinks = useMemo(() => {
    if (pack.limits.coctelBienvenida <= 0) return []
    if (selectedWelcomeDrinks.length > 0) return selectedWelcomeDrinks.slice(0, pack.limits.coctelBienvenida)
    return welcomeCocktailsList.slice(0, pack.limits.coctelBienvenida)
  }, [pack.limits.coctelBienvenida, selectedWelcomeDrinks])

  const effectiveBarSpirits = useMemo(() => {
    if (pack.limits.destilados <= 0) return []
    if (selectedBarSpirits.length > 0) return selectedBarSpirits.slice(0, pack.limits.destilados)
    return barSpiritsList.slice(0, pack.limits.destilados)
  }, [pack.limits.destilados, selectedBarSpirits])

  const effectiveBarCocktails = useMemo(() => {
    if (pack.limits.coctelesBarra <= 0) return []
    if (selectedBarCocktails.length > 0) return selectedBarCocktails.slice(0, pack.limits.coctelesBarra)
    return barCocktailsList.slice(0, pack.limits.coctelesBarra)
  }, [pack.limits.coctelesBarra, selectedBarCocktails])

  // Cotización ultra-profesional, limpia, espaciosa, sin emojis (evita caracteres corruptos) y con diseño ejecutivo
  const whatsapp = useMemo(() => {
    const lines: string[] = []

    lines.push('COTIZACION OFICIAL | MR BOMBASTIK EVENTOS')
    lines.push('Alta Banqueteria, Cocteleria Profesional & Produccion Integral')
    lines.push('==========================================')
    lines.push('Hola equipo de MR Bombastik, solicito formalmente la cotizacion y disponibilidad para la siguiente celebracion:')
    lines.push('')

    // 1. Datos del cliente
    lines.push('1. DATOS DEL CLIENTE Y CONTACTO:')
    lines.push(`Cliente: ${clientName.trim() || 'Por indicar'}`)
    lines.push(`Telefono / WhatsApp: ${clientPhone.trim() || 'Por indicar'}`)
    lines.push(`Correo: ${clientEmail.trim() || 'Por indicar'}`)
    lines.push('')

    // 2. Información del evento
    lines.push('2. DETALLES DEL EVENTO:')
    lines.push(`Celebracion: ${event}`)
    lines.push(`Fecha estimada: ${eventDate.trim() ? formatEventDate(eventDate, true) : 'Por coordinar'}`)
    lines.push(`Lugar / Recinto: ${venues[venue].name} (${venues[venue].place})`)
    lines.push(`Cantidad de invitados: ${guests} personas`)
    lines.push(`Pack contratado: Pack ${pack.name} (${format(pack.price)} p/p)`)
    lines.push('Duracion del servicio: 8 horas continuas')
    lines.push(`Tematica del evento: ${theme || 'Estandar elegante'}`)
    lines.push('')

    // 3. Menú gastronómico completo
    lines.push('3. MENU GASTRONOMICO COMPLETO:')
    lines.push(`Bocados de Coctel (${effectiveBocados.length} variedades):`)
    lines.push(effectiveBocados.join(', '))
    lines.push('')
    lines.push(`Entrada: ${effectiveEntrada}`)
    lines.push(`Plato Principal: ${effectiveProteina}`)
    lines.push(`Guarnicion: ${effectiveGuarniciones.join(' + ')}`)
    lines.push('')
    lines.push(`Mesa Buffet de Postres (${effectivePostres.length} variedades):`)
    lines.push(effectivePostres.join(', '))
    lines.push('')
    lines.push('Cafeteria & Trasnoche:')
    if (pack.id !== 'classic') {
      lines.push('Consome de trasnoche de regalo para todos los invitados')
    }
    lines.push('Estacion de cafe de grano, te e infusiones ilimitadas')
    lines.push('')

    // 4. Barra libre y coctelería
    lines.push('4. BEBIDAS, COCTELERIA & BARRA LIBRE:')
    if (pack.limits.coctelBienvenida > 0) {
      lines.push(`Tragos de Bienvenida (${effectiveWelcomeDrinks.length} variedades): ${effectiveWelcomeDrinks.join(', ')}`)
      lines.push(`Vino en cena: ${pack.id === 'classic' ? '1 botella de vino por mesa' : 'Vino tinto ilimitado durante el servicio'}`)
      if (effectiveBarSpirits.length > 0) {
        lines.push(`Destilados en barra: ${effectiveBarSpirits.join(', ')}`)
      }
      if (effectiveBarCocktails.length > 0) {
        lines.push(`Cocteles de autor en barra: ${effectiveBarCocktails.join(', ')}`)
      }
    } else {
      lines.push('Vino en cena: 1 botella de vino por mesa')
    }
    lines.push('Hidratacion continua: Bebidas, jugos naturales y aguas saborizadas (8 horas)')
    lines.push('')

    // 5. Servicios incluidos en el pack
    lines.push(`5. SERVICIOS YA INCLUIDOS EN PACK ${pack.name.toUpperCase()} ($0 EXTRA):`)
    if (pack.id === 'golden') {
      lines.push('[OK] Camara 360 (Plataforma Giratoria HD): 1 hora (durante el coctel de bienvenida)')
      lines.push('[OK] Cotillon Festivo: Para los festejados')
      lines.push('[OK] DJ en vivo, amplificacion profesional, iluminacion y animador: 8 horas continuas')
      lines.push('[OK] Banqueteria, garzones, bartender y cocina completa: 8 horas de servicio')
    } else if (pack.id === 'silver') {
      lines.push('[OK] Camara 360 (Plataforma Giratoria HD): 2 horas')
      lines.push('[OK] Cabina Fotografica con fotos impresas ilimitadas: 2 horas')
      lines.push('[OK] Robot LED Show: En pista de baile')
      lines.push('[OK] Cotillon Festivo Premium: Para todos los invitados')
      lines.push('[OK] DJ en vivo, amplificacion profesional, iluminacion y animador: 8 horas continuas')
      lines.push('[OK] Coordinacion integral, banqueteria, garzones y cocina completa: 8 horas de servicio')
    } else if (pack.id === 'vip') {
      lines.push('[OK] DJ en vivo, amplificacion profesional, iluminacion y animador: 8 horas continuas')
      lines.push('[OK] Cocteleria de bienvenida y Barra libre durante la fiesta: Servicio continuo')
      lines.push('[OK] Consome de trasnoche de regalo para todos los invitados')
      lines.push('[OK] Banqueteria, garzones, bartender y cocina completa: 8 horas de servicio')
    } else {
      lines.push('[OK] DJ en vivo, amplificacion profesional, iluminacion y animador: 8 horas continuas')
      lines.push('[OK] Banqueteria, garzones y personal de cocina: 8 horas de servicio')
      lines.push('[OK] Hidratacion ilimitada de bebidas y jugos durante las 8 horas')
    }
    lines.push('')

    // 6. Servicios adicionales extras contratados
    const activeOptionalExtras = selectedOptionalExtras.filter((id) => !includedServiceIds.includes(id))
    if (activeOptionalExtras.length > 0) {
      lines.push('6. SERVICIOS ADICIONALES EXTRAS CONTRATADOS:')
      activeOptionalExtras.forEach((id) => {
        const item = extras.find((e) => e.id === id)
        if (item) {
          lines.push(`[+] ${item.name} (${item.hours}) (${format(item.price)})`)
        }
      })
      lines.push('')
    }

    // 7. Detalles o peticiones especiales (IMPORTANTE para el dueño)
    lines.push('7. DETALLES O PETICIONES ESPECIALES (IMPORTANTE):')
    if (comments.trim()) {
      lines.push(comments.trim())
    } else {
      lines.push('Ninguno indicado por el cliente (todo según propuesta estándar)')
    }
    lines.push('')

    // 8. Desglose financiero
    lines.push('==========================================')
    lines.push('8. RESUMEN DE INVERSION TOTAL:')
    lines.push(`Banqueteria: ${guests} invitados x ${format(pack.price)} = ${format(guests * pack.price)}`)
    if (extrasTotal > 0) {
      lines.push(`Servicios adicionales extras: ${format(extrasTotal)}`)
    }
    lines.push(`TOTAL ESTIMADO: ${format(total)} CLP`)
    lines.push('==========================================')
    lines.push('')
    lines.push('Instagram Oficial: @mr_bombastik_eventos')
    lines.push('https://www.instagram.com/mr_bombastik_eventos/')
    lines.push('')
    lines.push('Quedo a la espera de su confirmacion para coordinar fecha, disponibilidad y degustacion de menu. Muchas gracias!')

    return `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [
    clientName,
    clientPhone,
    clientEmail,
    event,
    eventDate,
    venue,
    guests,
    pack,
    theme,
    includedServiceIds,
    selectedOptionalExtras,
    effectiveBocados,
    effectiveEntrada,
    effectiveProteina,
    effectiveGuarniciones,
    effectivePostres,
    effectiveWelcomeDrinks,
    effectiveBarSpirits,
    effectiveBarCocktails,
    comments,
    total,
    extrasTotal,
  ])

  return (
    <main className="min-h-screen bg-[#090909] text-[#f8f4eb] selection:bg-[#d4af37] selection:text-black overflow-x-hidden pb-24 lg:pb-0">
      {/* HEADER: RESPONSIVE CORNER LOGO & CLEAN NAVIGATION (NO OVERFLOW ON TABLET/MOBILE) */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#090909]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <a href="#inicio" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 min-w-0">
            {/* LOGO OFICIAL MR BOMBASTIK - SIEMPRE VISIBLE EN TABLET, CELULAR Y COMPUTADOR */}
            <div className="relative flex shrink-0 items-center justify-center transition duration-300 group-hover:scale-105">
              <img
                src="/images/logo_mrbombastik.png"
                alt="MR Bombastik - Coctelería Profesional y Alta Banquetería"
                width={56}
                height={56}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)]"
              />
            </div>
            <div className="flex flex-col shrink-0 min-w-0">
              <span className="font-serif text-base sm:text-xl lg:text-2xl tracking-[.15em] leading-tight text-white font-bold truncate">
                MR <b className="text-[#d4af37]">BOMBASTIK</b>
              </span>
              <span className="hidden sm:block text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[.18em] text-[#d4af37] font-semibold mt-0.5 truncate">
                Coctelería Profesional & Alta Banquetería
              </span>
            </div>
          </a>

          {/* NAVEGACIÓN DESPEJADA Y SIN BOTÓN AMARILLO QUE ESTORBE O TAPE EL COTIZADOR */}
          <nav className="hidden items-center gap-5 lg:gap-8 text-xs uppercase tracking-[.18em] text-white/70 lg:flex">
            <a href="#experiencia" className="transition hover:text-[#d4af37]">Estándar</a>
            <a href="#recomendaciones" className="transition hover:text-[#d4af37] text-[#d4af37]">Recomendaciones</a>
            <a href="#packs" className="transition hover:text-[#d4af37]">Packs</a>
            <a href="#recintos" className="transition hover:text-[#d4af37]">Recintos</a>
            <a href="#cotizador" className="rounded-full border border-[#d4af37]/40 bg-white/5 px-4 py-1.5 font-bold text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black">
              Cotizador
            </a>
          </nav>

          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white lg:hidden rounded-lg hover:bg-white/5 focus:outline-none"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="flex flex-col gap-4 border-t border-white/10 bg-[#111] px-5 py-6 text-xs uppercase tracking-widest lg:hidden shadow-2xl animate-in slide-in-from-top-2">
            <a href="#experiencia" onClick={() => setMobileOpen(false)}>Estándar</a>
            <a href="#recomendaciones" onClick={() => setMobileOpen(false)} className="text-[#d4af37]">Recomendaciones & Saludos</a>
            <a href="#packs" onClick={() => setMobileOpen(false)}>Packs</a>
            <a href="#recintos" onClick={() => setMobileOpen(false)}>Recintos</a>
            <a href="#cotizador" onClick={() => setMobileOpen(false)}>Cotizador</a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#d4af37] py-3 text-xs font-bold text-black"
            >
              <MessageCircle size={16} /> Enviar cotización
            </a>
          </nav>
        )}
      </header>

      {/* HERO SECTION: VIDEO DE FONDO CINEMATOGRÁFICO FLUIDO */}
      <section id="inicio" className="relative flex min-h-[90vh] items-center justify-center px-5 pt-32 pb-20 lg:min-h-screen lg:px-8">
        {/* Background video moving smoothly without freezing/stuttering */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            // @ts-expect-error webkit-playsinline for iOS Safari
            webkit-playsinline="true"
            preload="auto"
            poster="/images/hero_poster.jpg"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            className="h-full w-full object-cover object-center"
          >
            <source src="/videos/hero_video_mobile.mp4" type="video/mp4" />
            <source src="/videos/hero_video_desktop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/55 to-[#090909]/70" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {!isVideoPlaying && (
          <button
            type="button"
            onClick={() => {
              if (heroVideoRef.current) {
                heroVideoRef.current.muted = true
                heroVideoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {})
              }
            }}
            className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-black/85 px-3.5 py-1.5 text-[11px] font-semibold text-[#d4af37] backdrop-blur-md shadow-lg transition hover:bg-[#d4af37] hover:text-black active:scale-95"
          >
            <Play size={12} className="fill-current" /> Reproducir video
          </button>
        )}

        <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.12] sm:leading-[1.08] tracking-tight text-white max-w-4xl mx-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            No hacemos fiestas, <br className="hidden sm:inline" />
            <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-[#e7cb76] via-[#fff3b8] to-[#d4af37] bg-clip-text text-transparent italic font-light drop-shadow-[0_4px_28px_rgba(212,175,55,0.4)]">
              creamos grandes historias
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Producción completa de matrimonios, graduaciones y eventos en Santiago. Banquetería de primer nivel, barra libre, amplificación, iluminación y DJ en vivo en recintos seleccionados o en tu propio espacio.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#cotizador"
              className="flex items-center gap-3 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-bold text-black transition hover:bg-[#f1d36b] shadow-xl shadow-[#d4af37]/30"
            >
              Cotizar mi evento <ArrowRight size={17} />
            </a>
            <a
              href="#packs"
              className="flex items-center gap-3 rounded-full border border-white/25 bg-black/60 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Ver Packs Disponibles
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/80">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#d4af37]" /> Cocina de autor y 8 horas de servicio
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#d4af37]" /> Recintos y parcelas exclusivas
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#d4af37]" /> Asesoría y coordinación directa
            </span>
          </div>
        </div>
      </section>

      {/* SERVICIO & PRODUCCIÓN INTEGRAL */}
      <section id="experiencia" className="border-y border-white/10 bg-[#0d0d0d] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.28em] text-[#d4af37]">PRODUCCIÓN Y SERVICIO</p>
              <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl text-white">
                Todo resuelto para tu evento, <br />
                <i className="text-[#d4af37]">de principio a fin</i>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/80">
              En MR Bombastik nos encargamos de todo: gastronomía completa, barra libre sin límites, sonido e iluminación profesional y coordinación en terreno durante 8 horas continuas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-[#121212] p-8 transition duration-300 hover:border-[#d4af37]/60 hover:bg-[#18150f]">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#d4af37]/15 text-[#d4af37]">
                  <Utensils size={24} />
                </span>
                <span className="font-serif text-4xl text-[#d4af37]/40">01</span>
              </div>
              <h3 className="mt-8 font-serif text-2xl leading-tight text-white">Banquetería y Coctelería Completa</h3>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Menús de 3 tiempos a elección, cóctel de bienvenida, variedad de bocados fríos y calientes, buffet de postres y barra libre atendida por bartenders profesionales.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-[#121212] p-8 transition duration-300 hover:border-[#d4af37]/60 hover:bg-[#18150f]">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#d4af37]/15 text-[#d4af37]">
                  <Sparkles size={24} />
                </span>
                <span className="font-serif text-4xl text-[#d4af37]/40">02</span>
              </div>
              <h3 className="mt-8 font-serif text-2xl leading-tight text-white">Técnica, Audio y Entretenimiento</h3>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Montaje de audio profesional, iluminación perimetral e inteligente, DJ en vivo durante todo el evento, Cámara 360°, cabinas de fotos, show de Robot LED y efectos especiales.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-[#121212] p-8 transition duration-300 hover:border-[#d4af37]/60 hover:bg-[#18150f]">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#d4af37]/15 text-[#d4af37]">
                  <ShieldCheck size={24} />
                </span>
                <span className="font-serif text-4xl text-[#d4af37]/40">03</span>
              </div>
              <h3 className="mt-8 font-serif text-2xl leading-tight text-white">Coordinación en Terreno (8 Horas)</h3>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Servicio continuo de garzones de etiqueta, personal de cocina, montaje, vajilla, mantelería y un coordinador a cargo de que todo funcione a tiempo de inicio a fin.
              </p>
            </article>
          </div>

          {/* 5 OFFICIAL PILLARS */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-5 text-center">
            <div className="p-3">
              <p className="font-serif text-sm font-bold text-[#d4af37]">Calidad Premium</p>
              <p className="text-[11px] text-white/50 mt-1">Ingredientes selectos y vajilla fina</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-sm font-bold text-[#d4af37]">Gastronomía de Alto Nivel</p>
              <p className="text-[11px] text-white/50 mt-1">Recetas exclusivas del chef</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-sm font-bold text-[#d4af37]">Atención Personalizada</p>
              <p className="text-[11px] text-white/50 mt-1">Acompañamiento en cada detalle</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-sm font-bold text-[#d4af37]">Experiencias Memorables</p>
              <p className="text-[11px] text-white/50 mt-1">Impacto visual y emocional</p>
            </div>
            <div className="p-3 col-span-2 sm:col-span-1">
              <p className="font-serif text-sm font-bold text-[#d4af37]">Confianza & Trayectoria</p>
              <p className="text-[11px] text-white/50 mt-1">Eventos ejecutados con éxito</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMENDACIONES & SALUDOS VIP (Pablito Pesadilla, Otakin, Testimonios Reales, Equipo) */}
      <VideoTestimonials />

      {/* PACKS: CLEANED FROM "PACKS 2026" TO "PACKS" */}
      <section id="packs" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[.28em] text-[#d4af37]">PROPUESTAS GASTRONÓMICAS</p>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="font-serif text-5xl sm:text-6xl">
                Nuestros Packs,<br />
                <i className="text-[#d4af37]">a tu medida.</i>
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Selecciona tu pack para activar sus opciones específicas en el cotizador y menú gastronómico.
              </p>
            </div>

            {/* LIVE ACTIVE PACK BADGE */}
            <div className="flex items-center gap-3 rounded-2xl border-2 border-[#d4af37] bg-[#221c0e] px-5 py-3 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#d4af37] text-black font-bold text-sm">
                ✓
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Pack seleccionado actualmente:</p>
                <p className="font-serif text-lg font-bold text-white">
                  {pack.name} — <span className="text-[#d4af37]">{format(pack.price)}</span> <small className="text-xs font-sans text-white/60">/ invitado</small>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packs.map((p, idx) => {
              const isSelected = packId === p.id
              return (
                <div
                  key={p.id}
                  onClick={() => setPackId(p.id)}
                  className={`relative flex flex-col justify-between rounded-3xl border-2 p-6 transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? 'border-[#d4af37] bg-[#221c0e] shadow-[0_0_40px_rgba(212,175,55,0.35)] ring-2 ring-[#d4af37] scale-[1.02]'
                      : 'border-white/10 bg-[#121212] hover:border-[#d4af37]/60 hover:bg-[#17150f]'
                  }`}
                >
                  {isSelected ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#d4af37] px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-black shadow-lg">
                      ✓ PACK SELECCIONADO
                    </span>
                  ) : p.badge ? (
                    <span className="absolute -top-3 right-5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.badge}
                    </span>
                  ) : null}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-white/40">0{idx + 1}</span>
                      <div
                        className={`flex size-6 items-center justify-center rounded-full border transition ${
                          isSelected ? 'border-[#d4af37] bg-[#d4af37] text-black font-bold' : 'border-white/20 text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                    </div>

                    <h3 className="mt-5 font-serif text-3xl text-white">{p.name}</h3>
                    <p className="mt-2 min-h-[44px] text-xs leading-relaxed text-white/65">{p.description}</p>
                    <p className="mt-5 font-serif text-3xl text-[#d4af37] font-bold">
                      {format(p.price)}
                      <small className="font-sans text-xs text-white/50"> / invitado</small>
                    </p>

                    <div className="my-5 h-px bg-white/10" />

                    <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold mb-2">Incluye:</p>
                    <ul className="flex flex-col gap-2.5 text-xs text-white/75">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <Check size={14} className="shrink-0 text-[#d4af37]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-2xl border border-[#d4af37]/25 bg-black/50 p-4">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[.18em] text-[#d4af37] font-bold">
                        <Wine size={13} />
                        <span>Barra & Bebidas</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/80">{p.drinksSummary}</p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPackId(p.id)
                      }}
                      className={`w-full rounded-full py-3.5 text-center text-xs font-bold uppercase tracking-wider transition ${
                        isSelected
                          ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/30 font-extrabold'
                          : 'border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37] hover:text-black'
                      }`}
                    >
                      {isSelected ? '✓ Pack Seleccionado' : `Elegir Pack ${p.name}`}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RECINTOS: ENCUENTRA TU LUGAR */}
      <section id="recintos" className="border-t border-white/10 bg-[#0d0d0d] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.28em] text-[#d4af37]">El escenario importa</p>
              <h2 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
                Encuentra<br />
                <i className="text-[#d4af37]">tu lugar.</i>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                Selecciona la parcela o salón donde celebrarás. Haz clic en la tarjeta o utiliza el selector:
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border-2 border-[#d4af37] bg-[#221c0e] px-5 py-3 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#d4af37] text-black font-bold text-sm">
                ✓
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">Lugar elegido para la cotización:</p>
                <p className="font-serif text-lg font-bold text-white">
                  {venues[venue].name} — <span className="text-[#d4af37]">{venues[venue].place}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {venues.map((v, i) => {
              const isSelected = venue === i
              return (
                <div
                  key={v.name}
                  onClick={() => setVenue(i)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? 'border-[#d4af37] bg-[#221c0e] shadow-[0_0_40px_rgba(212,175,55,0.35)] ring-2 ring-[#d4af37] scale-[1.02]'
                      : 'border-white/10 bg-[#121212] hover:border-[#d4af37]/60 hover:bg-[#17150f]'
                  }`}
                >
                  <div>
                    {v.image ? (
                      <div className="relative h-56 w-full overflow-hidden bg-black">
                        <img
                          src={v.image}
                          alt={`Eventos en ${v.name}, ${v.place}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#16130d] via-transparent to-transparent opacity-85" />
                        {isSelected && (
                          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#d4af37] px-3 py-1 text-[11px] font-extrabold text-black shadow-lg">
                            ✓ LUGAR SELECCIONADO
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-[#2b2414] to-[#111]">
                        <span className="font-serif text-6xl text-[#d4af37]/50">{v.icon}</span>
                        {isSelected && (
                          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#d4af37] px-3 py-1 text-[11px] font-extrabold text-black shadow-lg">
                            ✓ LUGAR SELECCIONADO
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-[#d4af37]/20 font-serif text-lg text-[#d4af37]">
                          {v.icon}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">{v.place}</span>
                      </div>
                      <h3 className="mt-4 font-serif text-2xl text-white">{v.name}</h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-white/60">{v.detail}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setVenue(i)
                      }}
                      className={`w-full rounded-full py-3 text-xs font-bold uppercase tracking-wider transition ${
                        isSelected
                          ? 'bg-[#d4af37] text-black shadow-md font-extrabold'
                          : 'border border-white/20 text-white/80 hover:border-[#d4af37] hover:text-[#d4af37]'
                      }`}
                    >
                      {isSelected ? '✓ Lugar Seleccionado' : 'Elegir este lugar'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* COTIZADOR INTELIGENTE - REFINED & PROPORTIONED FOR DESKTOP & TABLET */}
      <section id="cotizador" className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:text-left">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[.25em] text-[#d4af37]">Cotizador Inteligente & Menú Personalizado</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-4xl text-white">
              Hazlo <i className="text-[#d4af37]">a tu medida.</i>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/65 max-w-2xl leading-relaxed">
              Personaliza tus invitados, menú de tiempos, bocados, barra libre y temática en tiempo real para recibir tu presupuesto oficial por WhatsApp.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start w-full min-w-0">
            {/* LEFT COLUMN: FORM & SELECTIONS */}
            <div className="w-full lg:col-span-7 xl:col-span-8 min-w-0 rounded-3xl border border-[#d4af37]/25 bg-gradient-to-br from-[#16140e] via-[#111111] to-[#0c0c0c] p-4 sm:p-6 lg:p-7 shadow-xl">
              
              {/* DATOS DEL CLIENTE */}
              <div className="mb-6 rounded-2xl border border-[#d4af37]/30 bg-[#14120a] p-4 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Tus datos para el presupuesto</p>
                <h3 className="mt-1 font-serif text-base sm:text-lg">¿A quién dirigimos la cotización?</h3>
                <p className="mt-0.5 text-xs text-white/50">Estos datos se adjuntarán automáticamente al WhatsApp del dueño.</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="client-name" className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <User size={13} className="text-[#d4af37]" /> Nombre y Apellido:
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="Ej. Camila Rojas"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/20 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label htmlFor="client-phone" className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <Phone size={13} className="text-[#d4af37]" /> Teléfono / WhatsApp:
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      placeholder="Ej. +56 9 1234 5678"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/20 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="client-email" className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <Mail size={13} className="text-[#d4af37]" /> Correo Electrónico (opcional):
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      placeholder="Ej. contacto@ejemplo.cl"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/20 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* EVENT SPECS */}
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="event-type" className="text-xs text-white/80 font-medium">
                    Tipo de celebración:
                  </label>
                  <select
                    id="event-type"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#d4af37]"
                  >
                    {['Graduación', '15 Años', 'Matrimonio', 'Cumpleaños', 'Fiesta Privada', 'Evento de Empresa'].map((x) => (
                      <option key={x} value={x} className="bg-[#18150d] text-white">{x}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="event-date" className="text-xs text-white/80 font-medium">
                    Fecha tentativa del evento:
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label htmlFor="event-pack" className="text-xs text-white/80 font-medium">
                    Pack contratado:
                  </label>
                  <select
                    id="event-pack"
                    value={packId}
                    onChange={(e) => setPackId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#d4af37]/50 bg-[#16130d] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#d4af37]"
                  >
                    {packs.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#18150d] text-white">
                        Pack {p.name} · {format(p.price)} / pers.
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="event-venue" className="text-xs text-white/80 font-medium">
                    Recinto / Parcela:
                  </label>
                  <select
                    id="event-venue"
                    value={venue}
                    onChange={(e) => setVenue(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-[#d4af37]/50 bg-[#16130d] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-[#d4af37]"
                  >
                    {venues.map((v, i) => (
                      <option key={v.name} value={i} className="bg-[#18150d] text-white">
                        {v.name} · {v.place}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* INVITADOS */}
              <div className="mt-6 rounded-2xl border border-[#d4af37]/35 bg-[#13110b] p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Users size={15} className="text-[#d4af37]" />
                      <p className="text-xs uppercase tracking-wider text-[#d4af37] font-bold">Número de Invitados</p>
                    </div>
                    <p className="mt-0.5 text-xs text-white/60">Ajusta con los botones, presets o escribe directamente el número:</p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      type="button"
                      aria-label="Restar 5 invitados"
                      onClick={() => setGuests((g) => Math.max(10, g - 5))}
                      className="flex size-9 items-center justify-center rounded-lg border border-white/20 bg-black/70 text-white transition hover:border-[#d4af37] hover:text-[#d4af37] active:scale-95"
                    >
                      <Minus size={16} />
                    </button>

                    <div className="flex items-center rounded-lg border border-[#d4af37] bg-black px-2.5 py-1">
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        value={guests}
                        onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 0))}
                        className="w-14 bg-transparent text-center font-serif text-xl font-bold text-[#d4af37]"
                      />
                      <span className="text-[11px] text-white/60 pr-0.5">pax</span>
                    </div>

                    <button
                      type="button"
                      aria-label="Sumar 5 invitados"
                      onClick={() => setGuests((g) => Math.min(1000, g + 5))}
                      className="flex size-9 items-center justify-center rounded-lg border border-white/20 bg-black/70 text-white transition hover:border-[#d4af37] hover:text-[#d4af37] active:scale-95"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-white/40 mr-1">Rápido:</span>
                  {guestPresets.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setGuests(preset)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        guests === preset
                          ? 'bg-[#d4af37] text-black font-bold shadow-sm'
                          : 'border border-white/15 bg-black/40 text-white/70 hover:border-[#d4af37]/50 hover:text-white'
                      }`}
                    >
                      {preset} pax
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="5"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-[#d4af37]"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-white/40">
                    <span>Mín. 20</span>
                    <span>100</span>
                    <span>250</span>
                    <span>Máx. 500 pax</span>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 1 DE MENÚ: BOCADOS DE CÓCTEL */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Paso 1 · Experiencia de Cóctel</p>
                    <h3 className="mt-0.5 font-serif text-lg text-white">Bocados Fríos y Calientes</h3>
                    <p className="text-[11px] text-white/60">
                      Pack {pack.name} incluye <b className="text-[#d4af37]">{pack.limits.bocados} variedades</b> a elección.
                    </p>
                  </div>
                  <span className="self-start sm:self-auto rounded-full bg-[#d4af37]/15 px-2.5 py-0.5 text-xs font-bold text-[#d4af37]">
                    {selectedBocados.length} / {pack.limits.bocados} seleccionados
                  </span>
                </div>

                <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
                  {officialBocados.map((bocado) => {
                    const isChecked = selectedBocados.includes(bocado)
                    return (
                      <label
                        key={bocado}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-xs transition ${
                          isChecked
                            ? 'border-[#d4af37] bg-[#d4af37]/15 font-semibold text-white'
                            : 'border-white/10 bg-black/30 hover:border-white/30 text-white/80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              toggleArraySelection(
                                selectedBocados,
                                setSelectedBocados,
                                bocado,
                                pack.limits.bocados
                              )
                            }
                            className="accent-[#d4af37] size-3.5"
                          />
                          <span className="leading-tight">{bocado}</span>
                        </div>
                      </label>
                    )
                  })}
                </div>
                <p className="mt-2 text-[10px] text-white/45">
                  * En los packs VIP, Golden y Silver Plus se incluye consomé de regalo de trasnoche para todos los invitados.
                </p>
              </div>

              {/* SECCIÓN 2 DE MENÚ: CENA PRINCIPAL */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Paso 2 · Menú de Cena</p>
                    <h3 className="mt-0.5 font-serif text-lg text-white">Plato de Entrada y Plato Principal</h3>
                    <p className="text-[11px] text-white/60">
                      Selecciona la alternativa general para tus invitados (vino tinto incluido).
                    </p>
                  </div>
                  <Utensils className="text-[#d4af37]" size={18} />
                </div>

                {/* 1. PLATO DE ENTRADA */}
                <div className="mt-4 border-t border-white/10 pt-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold">1. Entrada (Elige 1 opción):</p>
                    <span className="text-[11px] text-white/50">{selectedEntrada}</span>
                  </div>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {officialEntradas.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSelectedEntrada(item)}
                        className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition ${
                          selectedEntrada === item
                            ? 'border-[#d4af37] bg-[#d4af37]/20 font-bold text-white'
                            : 'border-white/10 bg-black/30 hover:border-white/30 text-white/70'
                        }`}
                      >
                        <span>{item}</span>
                        {selectedEntrada === item && <Check size={14} className="text-[#d4af37]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. PROTEÍNA */}
                <div className="mt-4 border-t border-white/10 pt-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold">2. Proteína Principal (Elige 1 opción):</p>
                    <span className="text-[11px] text-white/50">{selectedProteina}</span>
                  </div>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {officialProteinas.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSelectedProteina(item)}
                        className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition ${
                          selectedProteina === item
                            ? 'border-[#d4af37] bg-[#d4af37]/20 font-bold text-white'
                            : 'border-white/10 bg-black/30 hover:border-white/30 text-white/70'
                        }`}
                      >
                        <span>{item}</span>
                        {selectedProteina === item && <Check size={14} className="text-[#d4af37]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. GUARNICIONES */}
                <div className="mt-4 border-t border-white/10 pt-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold">
                      3. Guarnición ({pack.limits.guarnicion} {pack.limits.guarnicion === 1 ? 'opción' : 'opciones'}):
                    </p>
                    <span className="rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[11px] font-bold text-[#d4af37]">
                      {selectedGuarnicion.length} / {pack.limits.guarnicion}
                    </span>
                  </div>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {officialGuarniciones.map((item) => {
                      const isChecked = selectedGuarnicion.includes(item)
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() =>
                            toggleArraySelection(
                              selectedGuarnicion,
                              setSelectedGuarnicion,
                              item,
                              pack.limits.guarnicion
                            )
                          }
                          className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition ${
                            isChecked
                              ? 'border-[#d4af37] bg-[#d4af37]/20 font-bold text-white'
                              : 'border-white/10 bg-black/30 hover:border-white/30 text-white/70'
                          }`}
                        >
                          <span>{item}</span>
                          {isChecked && <Check size={14} className="text-[#d4af37]" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* SECCIÓN 3 DE MENÚ: POSTRES BUFFET */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Paso 3 · Postre Buffet & Cafetería</p>
                    <h3 className="mt-0.5 font-serif text-lg text-white">Mesa Dulce de Cierre</h3>
                    <p className="text-[11px] text-white/60">
                      Pack {pack.name} incluye <b className="text-[#d4af37]">{pack.limits.postre} variedades</b> a elección (+ Café y Té).
                    </p>
                  </div>
                  <span className="rounded-full bg-[#d4af37]/20 px-2.5 py-0.5 text-xs font-bold text-[#d4af37]">
                    {selectedPostres.length} / {pack.limits.postre}
                  </span>
                </div>

                <div className="mt-3.5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {officialPostres.map((postre) => {
                    const isChecked = selectedPostres.includes(postre)
                    return (
                      <button
                        type="button"
                        key={postre}
                        onClick={() =>
                          toggleArraySelection(
                            selectedPostres,
                            setSelectedPostres,
                            postre,
                            pack.limits.postre
                          )
                        }
                        className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition ${
                          isChecked
                            ? 'border-[#d4af37] bg-[#d4af37]/20 font-bold text-white'
                            : 'border-white/10 bg-black/30 hover:border-white/30 text-white/70'
                        }`}
                      >
                        <span>{postre}</span>
                        {isChecked && <Check size={14} className="text-[#d4af37]" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* SECCIÓN 4 DE MENÚ: TRAGOS, COCTELERÍA Y BARRA LIBRE */}
              <div className="mt-6 rounded-2xl border-2 border-[#d4af37]/40 bg-gradient-to-br from-[#1b170e] to-[#12110c] p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Wine size={16} className="text-[#d4af37]" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Paso 4 · Coctelería & Barra Libre</p>
                    </div>
                    <h3 className="mt-0.5 font-serif text-lg text-white">Selección de Tragos de tu Evento</h3>
                    <p className="text-[11px] text-white/60">
                      Personaliza los cócteles de bienvenida y la carta de barra libre para tu celebración.
                    </p>
                  </div>
                  <GlassWater className="text-[#d4af37]" size={22} />
                </div>

                {pack.limits.coctelBienvenida === 0 ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/50 p-3.5 text-xs text-white/70">
                    <p>
                      El <b>Pack Clásico</b> incluye bebidas y jugos sin alcohol ilimitados.
                    </p>
                    <p className="mt-1 text-[#d4af37]">
                      * Si deseas coctelería de recepción y barra libre con destilados, selecciona el <b>Pack VIP</b>, <b>Golden</b> o <b>Silver Plus</b> arriba.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col gap-4">
                    {/* A. CÓCTEL DE BIENVENIDA */}
                    <div className="border-t border-white/10 pt-3.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold">
                          A. Cóctel de Bienvenida ({pack.limits.coctelBienvenida} variedades):
                        </p>
                        <span className="rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-xs font-bold text-[#d4af37]">
                          {selectedWelcomeDrinks.length} / {pack.limits.coctelBienvenida}
                        </span>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                        {welcomeCocktailsList.map((drink) => {
                          const isChecked = selectedWelcomeDrinks.includes(drink)
                          return (
                            <button
                              type="button"
                              key={drink}
                              onClick={() =>
                                toggleArraySelection(
                                  selectedWelcomeDrinks,
                                  setSelectedWelcomeDrinks,
                                  drink,
                                  pack.limits.coctelBienvenida
                                )
                              }
                              className={`flex items-center justify-between rounded-xl border p-2 text-left text-xs transition ${
                                isChecked
                                  ? 'border-[#d4af37] bg-[#d4af37]/20 font-bold text-white'
                                  : 'border-white/10 bg-black/40 hover:border-white/30 text-white/70'
                              }`}
                            >
                              <span>{drink}</span>
                              {isChecked && <Check size={14} className="text-[#d4af37]" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* B. BARRA LIBRE - DESTILADOS */}
                    <div className="border-t border-white/10 pt-3.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold">
                          B. Barra Libre - Destilados ({pack.limits.destilados} opciones):
                        </p>
                        <span className="rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-xs font-bold text-[#d4af37]">
                          {selectedBarSpirits.length} / {pack.limits.destilados}
                        </span>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                        {barSpiritsList.map((spirit) => {
                          const isChecked = selectedBarSpirits.includes(spirit)
                          return (
                            <button
                              type="button"
                              key={spirit}
                              onClick={() =>
                                toggleArraySelection(
                                  selectedBarSpirits,
                                  setSelectedBarSpirits,
                                  spirit,
                                  pack.limits.destilados
                                )
                              }
                              className={`flex items-center justify-between rounded-xl border p-2 text-left text-xs transition ${
                                isChecked
                                  ? 'border-[#d4af37] bg-[#d4af37]/20 font-bold text-white'
                                  : 'border-white/10 bg-black/40 hover:border-white/30 text-white/70'
                              }`}
                            >
                              <span>{spirit}</span>
                              {isChecked && <Check size={14} className="text-[#d4af37]" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* C. BARRA LIBRE - CÓCTELES */}
                    <div className="border-t border-white/10 pt-3.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold">
                          C. Barra Libre - Cócteles ({pack.limits.coctelesBarra} opciones):
                        </p>
                        <span className="rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-xs font-bold text-[#d4af37]">
                          {selectedBarCocktails.length} / {pack.limits.coctelesBarra}
                        </span>
                      </div>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                        {barCocktailsList.map((cocktail) => {
                          const isChecked = selectedBarCocktails.includes(cocktail)
                          return (
                            <button
                              type="button"
                              key={cocktail}
                              onClick={() =>
                                toggleArraySelection(
                                  selectedBarCocktails,
                                  setSelectedBarCocktails,
                                  cocktail,
                                  pack.limits.coctelesBarra
                                )
                              }
                              className={`flex items-center justify-between rounded-xl border p-2 text-left text-xs transition ${
                                isChecked
                                  ? 'border-[#d4af37] bg-[#d4af37]/20 font-bold text-white'
                                  : 'border-white/10 bg-black/40 hover:border-white/30 text-white/70'
                              }`}
                            >
                              <span>{cocktail}</span>
                              {isChecked && <Check size={14} className="text-[#d4af37]" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TEMÁTICA DE TU EVENTO */}
              <div className="mt-6 rounded-2xl border border-[#d4af37]/35 bg-gradient-to-br from-[#16130d] to-[#0f0e0b] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <PartyPopper size={15} className="text-[#d4af37]" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Personaliza la ambientación</p>
                    </div>
                    <h3 className="mt-0.5 font-serif text-lg">Temática de tu evento</h3>
                    <p className="text-[11px] text-white/60">
                      Haz clic en la temática para seleccionarla o desmarcarla:
                    </p>
                  </div>
                  <Zap className="text-[#d4af37]" size={20} />
                </div>

                <div className="mt-3.5 grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {themes.map((t) => {
                    const isSelected = theme === t.id
                    return (
                      <div
                        key={t.id}
                        onClick={() => toggleTheme(t.id)}
                        className={`flex flex-col justify-between rounded-2xl border-2 p-3.5 text-left transition-all duration-200 cursor-pointer select-none min-w-0 ${
                          isSelected
                            ? 'border-[#d4af37] bg-[#221c0e] shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#d4af37]'
                            : 'border-white/10 bg-black/50 hover:border-white/30 hover:bg-black/70'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif text-base font-bold text-white truncate">{t.name}</span>
                            <span
                              className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-xs transition ${
                                isSelected
                                  ? 'border-[#d4af37] bg-[#d4af37] text-black font-bold'
                                  : 'border-white/30 text-transparent'
                              }`}
                            >
                              ✓
                            </span>
                          </div>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">{t.desc}</p>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 border-t border-white/5 pt-2">
                          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] text-white/60">
                            {t.tag}
                          </span>
                          <span className={`text-[10px] font-bold ${isSelected ? 'text-[#d4af37]' : 'text-white/40'}`}>
                            {isSelected ? '✓ Activa' : 'Clic para activar'}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                  <span className="text-[11px] text-white/70">
                    Temática activa: <b className="text-[#d4af37]">{theme || 'Ninguna (Estándar elegante)'}</b>
                  </span>
                  {theme && (
                    <button
                      type="button"
                      onClick={() => setTheme('')}
                      className="text-[11px] text-[#d4af37] underline hover:text-white font-medium"
                    >
                      Quitar temática
                    </button>
                  )}
                </div>
              </div>

              {/* SERVICIOS ADICIONALES */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">Servicios adicionales</p>
                      {includedServiceIds.length > 0 && (
                        <span className="rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 px-2 py-0.5 text-[9px] font-bold text-[#d4af37]">
                          {includedServiceIds.length} {includedServiceIds.length === 1 ? 'incluido' : 'incluidos'} en Pack {pack.name}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-0.5 font-serif text-lg">Hazlo inolvidable</h3>
                  </div>
                  <Sparkles className="text-[#d4af37] shrink-0" size={18} />
                </div>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {extras.map((extra) => {
                    const isIncludedInPack = includedServiceIds.includes(extra.id)
                    const isManuallySelected = selectedOptionalExtras.includes(extra.id)
                    const extraDuration = getServiceOfficialDuration(extra.id, packId)
                    const isChecked = isIncludedInPack || isManuallySelected

                    return (
                      <div
                        key={extra.id}
                        onClick={() => {
                          if (isIncludedInPack) return // Bloqueado porque ya viene de regalo en el pack
                          setSelectedOptionalExtras((prev) =>
                            prev.includes(extra.id)
                              ? prev.filter((x) => x !== extra.id)
                              : [...prev, extra.id]
                          )
                        }}
                        className={`flex flex-col justify-between rounded-2xl border p-3.5 transition min-w-0 ${
                          isIncludedInPack
                            ? 'border-[#d4af37]/70 bg-[#d4af37]/15 cursor-default shadow-sm ring-1 ring-[#d4af37]/40'
                            : isManuallySelected
                            ? 'border-[#d4af37] bg-[#d4af37]/20 cursor-pointer shadow-md'
                            : 'border-white/10 bg-black/40 hover:border-white/30 cursor-pointer text-white/80'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5 min-w-0 flex-1">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                disabled={isIncludedInPack}
                                onChange={() => {
                                  if (isIncludedInPack) return
                                  setSelectedOptionalExtras((prev) =>
                                    prev.includes(extra.id)
                                      ? prev.filter((x) => x !== extra.id)
                                      : [...prev, extra.id]
                                  )
                                }}
                                className={`mt-0.5 size-4 accent-[#d4af37] shrink-0 ${
                                  isIncludedInPack ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
                                }`}
                              />
                              <div className="min-w-0 flex-1">
                                <p
                                  className={`text-xs font-semibold leading-snug break-words ${
                                    isIncludedInPack ? 'text-[#d4af37]' : isChecked ? 'text-white' : 'text-white/90'
                                  }`}
                                >
                                  {extra.name}
                                </p>
                                <p className="mt-1 flex items-center gap-1 text-[10px] text-white/60">
                                  <span>⏱ Duración:</span>
                                  <b className="text-white/90">{extraDuration}</b>
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              {isIncludedInPack ? (
                                <span className="inline-block rounded-full border border-[#d4af37] bg-[#d4af37] px-2 py-0.5 text-[9px] font-bold text-black uppercase tracking-wider shadow-sm">
                                  ✓ Incluido
                                </span>
                              ) : (
                                <b className="font-serif text-xs text-[#d4af37]">{format(extra.price)}</b>
                              )}
                            </div>
                          </div>

                          <p className="text-[11px] leading-relaxed text-white/60 line-clamp-2">
                            {extra.description}
                          </p>
                        </div>

                        {isIncludedInPack && (
                          <div className="mt-2.5 flex items-center justify-between border-t border-[#d4af37]/25 pt-1.5 text-[10px]">
                            <span className="font-medium text-[#d4af37]">
                              ★ Beneficio oficial de tu Pack {pack.name}
                            </span>
                            <span className="font-bold text-[#d4af37]">$0 Gratis</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* DETALLES O PETICIONES ESPECIALES (IMPORTANTE PARA EL DUEÑO) */}
              <div className="mt-8 rounded-2xl border-2 border-[#d4af37]/40 bg-gradient-to-b from-[#18140c] to-[#0e0c08] p-4 sm:p-5 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-black">
                      7
                    </span>
                    <label htmlFor="comments" className="text-sm font-bold text-white flex items-center gap-2">
                      Detalles o peticiones especiales
                    </label>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 px-2.5 py-0.5 text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    ★ Llega destacado al dueño por WhatsApp
                  </span>
                </div>
                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  ¿Requieres platos especiales (vegetarianos, veganos, celíacos), horarios específicos de vals/cena, sorpresas para los anfitriones o ambientación temática particular? Escríbelo aquí y se adjuntará como <b>información prioritaria</b> para el dueño de Mr Bombastik.
                </p>
                <textarea
                  id="comments"
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Ej: Necesitamos 4 platos vegetarianos, el vals será a las 23:30 hrs y queremos coordinar la entrada de novios con chispas frías..."
                  className="mt-3 w-full rounded-xl border border-white/20 bg-black/75 p-3.5 text-xs text-white placeholder:text-white/35 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition shadow-inner"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY ASIDE SUMMARY & WHATSAPP SUBMIT */}
            <aside className="w-full lg:col-span-5 xl:col-span-4 min-w-0 h-fit lg:sticky lg:top-24 rounded-3xl border-2 border-[#d4af37]/60 bg-[#16130d] p-4 sm:p-6 shadow-2xl shadow-black/80">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Tu presupuesto en vivo</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/60">Pack contratado</span>
                <span className="font-serif text-base text-white font-bold">{pack.name}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-white/60">Tipo de celebración</span>
                <span className="text-xs font-semibold text-[#d4af37]">{event}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-white/60">Precio por invitado</span>
                <span className="font-serif text-xs text-[#d4af37] font-semibold">{format(pack.price)}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-white/60">Lugar / Recinto</span>
                <span className="text-xs font-medium text-[#d4af37] text-right truncate max-w-[160px]">{venues[venue].name}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-white/60">N° de personas</span>
                <span className="font-bold text-white text-xs">{guests} invitados</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-white/60">Subtotal banquetería</span>
                <span className="text-xs text-white">{format(guests * pack.price)}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-white/60">Servicios adicionales extras</span>
                <span className="text-xs text-white">{format(extrasTotal)}</span>
              </div>

              <div className="my-3.5 h-px bg-white/15" />

              <p className="text-[10px] uppercase tracking-widest text-white/50">Total estimado</p>
              <p className="mt-0.5 font-serif text-3xl sm:text-4xl text-[#d4af37] font-bold">{format(total)}</p>

              {/* DATOS DEL CLIENTE, CONTACTO Y TEMÁTICA (REQUERIDO) */}
              <div className="mt-4 rounded-2xl border border-[#d4af37]/35 bg-black/75 p-3.5 text-xs text-white/90 space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-1.5">
                  <User size={12} className="text-[#d4af37]" /> Datos del cliente y evento:
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                    <span className="text-white/60">Cliente:</span>
                    <span className="font-semibold text-white truncate max-w-[170px]">
                      {clientName.trim() || <i className="text-white/40">Por indicar</i>}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                    <span className="text-white/60">Tipo de celebración:</span>
                    <span className="font-semibold text-[#d4af37] truncate max-w-[170px]">
                      {event}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                    <span className="text-white/60 flex items-center gap-1">
                      <Phone size={11} className="text-[#d4af37]" /> Teléfono / WhatsApp:
                    </span>
                    <span className="font-semibold text-[#d4af37] truncate max-w-[170px]">
                      {clientPhone.trim() || <i className="text-white/40">Por indicar</i>}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                    <span className="text-white/60 flex items-center gap-1">
                      <Mail size={11} className="text-[#d4af37]" /> Correo electrónico:
                    </span>
                    <span className="font-semibold text-white truncate max-w-[170px]">
                      {clientEmail.trim() || <i className="text-white/40">Por indicar</i>}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                    <span className="text-white/60 flex items-center gap-1">
                      <PartyPopper size={11} className="text-[#d4af37]" /> Temática:
                    </span>
                    <span className="font-semibold text-[#d4af37] truncate max-w-[170px]">
                      {theme || 'Estándar elegante'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-1">
                    <span className="text-white/60">Fecha estimada:</span>
                    <span className="font-semibold text-white truncate max-w-[170px]">
                      {eventDate ? formatEventDate(eventDate, false) : 'Por coordinar'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-white/60">Peticiones especiales:</span>
                    <span className="font-semibold text-xs truncate max-w-[160px]">
                      {comments.trim() ? (
                        <span className="text-[#d4af37] flex items-center gap-1 font-bold">
                          ✓ Agregadas al mensaje
                        </span>
                      ) : (
                        <i className="text-white/40">Sin detalles extras</i>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* SERVICIOS YA INCLUIDOS EN EL PACK CON HORAS EXPLÍCITAS */}
              {includedServiceIds.length > 0 ? (
                <div className="mt-3 rounded-2xl border border-[#d4af37]/40 bg-[#14120a] p-3.5 text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#d4af37]" /> Incluido en Pack {pack.name} ($0):
                    </p>
                    <span className="text-[10px] font-bold text-[#d4af37]">$0 Gratis</span>
                  </div>

                  <div className="space-y-1.5">
                    {includedServiceIds.map((id) => {
                      const item = extras.find((x) => x.id === id)
                      if (!item) return null
                      const dur = getServiceOfficialDuration(item.id, packId)

                      return (
                        <div key={id} className="flex items-start justify-between text-white/85 text-[11px] gap-2 py-0.5 border-b border-white/5 last:border-0">
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-white block">✓ {item.name}</span>
                            <span className="text-[10px] text-[#d4af37] font-semibold">⏱ Duración: {dur}</span>
                          </div>
                          <span className="text-[#d4af37] font-bold text-[10px] shrink-0 bg-[#d4af37]/15 px-2 py-0.5 rounded border border-[#d4af37]/30">
                            Incluido $0
                          </span>
                        </div>
                      )
                    })}

                    <div className="flex items-start justify-between text-white/85 text-[11px] gap-2 py-0.5 border-b border-white/5">
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-white block">✓ DJ en vivo, amplificación e iluminación</span>
                        <span className="text-[10px] text-white/50">⏱ Duración: 8 horas continuas</span>
                      </div>
                      <span className="text-[#d4af37] font-bold text-[10px] shrink-0 bg-[#d4af37]/15 px-2 py-0.5 rounded border border-[#d4af37]/30">
                        Incluido $0
                      </span>
                    </div>

                    <div className="flex items-start justify-between text-white/85 text-[11px] gap-2 py-0.5">
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-white block">✓ Banquetería, garzones y cocina</span>
                        <span className="text-[10px] text-white/50">⏱ Duración: 8 horas de servicio</span>
                      </div>
                      <span className="text-[#d4af37] font-bold text-[10px] shrink-0 bg-[#d4af37]/15 px-2 py-0.5 rounded border border-[#d4af37]/30">
                        Incluido $0
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3 rounded-xl border border-white/10 bg-black/50 p-3 text-xs space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Incluido en Pack {pack.name}:
                  </p>
                  <p className="text-[11px] text-white/80">
                    ✓ Banquetería, garzones y cocina: <b>8 horas continuas</b>
                  </p>
                  <p className="text-[11px] text-white/80">
                    ✓ Hidratación continua: <b>8 horas continuas</b>
                  </p>
                </div>
              )}

              {/* SERVICIOS EXTRAS AGREGADOS CON HORAS */}
              {selectedOptionalExtras.filter((id) => !includedServiceIds.includes(id)).length > 0 && (
                <div className="mt-2.5 rounded-2xl border border-white/15 bg-black/70 p-3.5 text-xs space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold">
                    Adicionales extras contratados:
                  </p>
                  {selectedOptionalExtras
                    .filter((id) => !includedServiceIds.includes(id))
                    .map((id) => {
                      const item = extras.find((x) => x.id === id)
                      if (!item) return null
                      return (
                        <div key={id} className="flex items-start justify-between text-white/85 text-[11px] gap-2 py-1 border-b border-white/10 last:border-0">
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-white block">+ {item.name}</span>
                            <span className="text-[10px] text-white/50">⏱ Duración: {item.hours}</span>
                          </div>
                          <span className="text-white font-bold text-[11px] shrink-0">{format(item.price)}</span>
                        </div>
                      )
                    })}
                </div>
              )}

              {/* RESUMEN DE MENÚ GASTRONÓMICO COMPLETO */}
              <div className="mt-3.5 rounded-2xl border border-[#d4af37]/40 bg-black/80 p-3.5 text-xs text-white/90 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-2">
                  <p className="text-[10px] uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-1.5">
                    <Utensils size={13} className="text-[#d4af37]" /> Menú Gastronómico Completo:
                  </p>
                  <span className="text-[10px] font-semibold text-[#d4af37]/80">
                    Pack {pack.name}
                  </span>
                </div>

                <div className="space-y-2 text-[11px] leading-relaxed">
                  {/* Bocados de Cóctel */}
                  <div>
                    <span className="font-semibold text-[#d4af37] block text-[10px] uppercase tracking-wider">
                      🍢 Bocados de Cóctel ({effectiveBocados.length} variedades):
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {effectiveBocados.map((bocado, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 px-2 py-0.5 text-[10.5px] text-white/90 font-medium"
                        >
                          {bocado}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Entrada */}
                  <div className="border-t border-white/10 pt-1.5">
                    <span className="font-semibold text-[#d4af37] text-[10px] uppercase tracking-wider">
                      🥗 Entrada:
                    </span>
                    <p className="text-white/85 pl-2 truncate">{effectiveEntrada}</p>
                  </div>

                  {/* Plato de Fondo */}
                  <div className="border-t border-white/10 pt-1.5">
                    <span className="font-semibold text-[#d4af37] text-[10px] uppercase tracking-wider">
                      🥩 Plato de Fondo:
                    </span>
                    <p className="text-white/85 pl-2 truncate">{effectiveProteina}</p>
                  </div>

                  {/* Guarnición */}
                  <div className="border-t border-white/10 pt-1.5">
                    <span className="font-semibold text-[#d4af37] text-[10px] uppercase tracking-wider">
                      🥔 Guarnición ({effectiveGuarniciones.length}):
                    </span>
                    <p className="text-white/85 pl-2 truncate">{effectiveGuarniciones.join(' + ')}</p>
                  </div>

                  {/* Mesa Buffet de Postres */}
                  <div className="border-t border-white/10 pt-1.5">
                    <span className="font-semibold text-[#d4af37] block text-[10px] uppercase tracking-wider">
                      🍰 Mesa Buffet de Postres ({effectivePostres.length} variedades):
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {effectivePostres.map((postre, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 px-2 py-0.5 text-[10.5px] text-white/90 font-medium"
                        >
                          {postre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cafetería & Trasnoche */}
                  <div className="border-t border-white/10 pt-1.5">
                    <span className="font-semibold text-[#d4af37] text-[10px] uppercase tracking-wider">
                      ☕ Cafetería & Trasnoche:
                    </span>
                    <p className="text-white/80 pl-2">
                      {pack.id !== 'classic'
                        ? 'Consomé de trasnoche de regalo + Cafetería e infusiones'
                        : 'Estación de café e infusiones'}
                    </p>
                  </div>

                  {/* Coctelería & Barra */}
                  <div className="border-t border-white/10 pt-1.5">
                    <span className="font-semibold text-[#d4af37] block text-[10px] uppercase tracking-wider">
                      🍸 Coctelería & Barra:
                    </span>
                    {pack.limits.coctelBienvenida > 0 ? (
                      <div className="mt-0.5 space-y-0.5 pl-2 text-white/85 text-[10.5px]">
                        <p className="truncate">
                          <b className="text-white/60">Bienvenida:</b> {effectiveWelcomeDrinks.join(', ')}
                        </p>
                        <p>
                          <b className="text-white/60">Cena:</b> Vino tinto ilimitado
                        </p>
                        {effectiveBarSpirits.length > 0 && (
                          <p className="truncate">
                            <b className="text-white/60">Destilados:</b> {effectiveBarSpirits.join(', ')}
                          </p>
                        )}
                        {effectiveBarCocktails.length > 0 && (
                          <p className="truncate">
                            <b className="text-white/60">Cócteles:</b> {effectiveBarCocktails.join(', ')}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-white/85 pl-2 text-[10.5px]">
                        Bebidas, jugos sin alcohol y agua mineral ilimitados
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* PRIMARY WHATSAPP SUBMIT */}
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#d4af37] px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-black shadow-xl shadow-[#d4af37]/30 transition hover:bg-[#f1d36b] hover:scale-[1.01]"
              >
                <MessageCircle size={16} /> Enviar cotización al WhatsApp
              </a>

              {/* INSTAGRAM BUTTON EN COTIZADOR */}
              <a
                href="https://www.instagram.com/mr_bombastik_eventos/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-pink-500/40 bg-gradient-to-r from-pink-500/20 via-purple-500/15 to-[#d4af37]/15 px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:border-pink-500 hover:bg-pink-500/25 hover:scale-[1.01]"
              >
                <span className="flex size-5 items-center justify-center rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm">
                  <Camera size={12} />
                </span>
                <span>Instagram: <b className="text-[#f8f4eb]">@mr_bombastik_eventos</b></span>
              </a>

              <p className="mt-2.5 text-center text-[10px] leading-relaxed text-white/45">
                Al hacer clic se enviará todo tu presupuesto oficial, datos de contacto, temática y menú al WhatsApp directo de MR Bombastik.
              </p>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/60">
                <Phone size={12} className="text-[#d4af37]" /> +56 9 4888 6391
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-12 lg:px-8 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo_mrbombastik.png"
              alt="MR Bombastik"
              className="size-14 object-contain"
            />
            <div>
              <p className="font-serif text-xl tracking-[.15em] text-white">
                MR <span className="text-[#d4af37]">BOMBASTIK</span>
              </p>
              <p className="mt-0.5 text-xs text-white/50">Coctelería Profesional, Alta Banquetería & Producción Exclusiva de Eventos.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white/70 text-xs">
            <a
              href="https://www.instagram.com/mr_bombastik_eventos/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-pink-500/40 bg-white/5 px-4 py-2 text-white transition hover:border-pink-500 hover:bg-pink-500/10"
            >
              <span className="flex size-5 items-center justify-center rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm">
                <Camera size={12} />
              </span>
              <span className="font-semibold text-white/90">@mr_bombastik_eventos</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Santiago, Chile</span>
          </div>
        </div>
      </footer>

      {/* BARRA FLOTANTE FIJA PARA CELULARES (HACE EL COTIZADOR 100% FUNCIONAL EN MÓVIL) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#d4af37]/40 bg-[#12100b]/95 px-4 py-3 backdrop-blur-xl lg:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.85)]">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-white/60 truncate">
              Pack {pack.name} • {guests} pers.
            </p>
            <p className="font-serif text-lg font-bold text-[#d4af37] leading-tight truncate">
              {format(total)} <span className="text-[10px] font-normal text-white/50">CLP</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#cotizador"
              className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-[11px] font-semibold text-white/80 transition hover:border-[#d4af37]"
            >
              Ver menú
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#d4af37] px-4 py-2 text-xs font-bold text-black shadow-lg shadow-[#d4af37]/30 transition active:scale-95"
            >
              <MessageCircle size={15} />
              <span>Cotizar</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
