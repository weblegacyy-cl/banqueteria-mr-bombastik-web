'use client'

import React, { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Star, CheckCircle2, Sparkles, Film } from 'lucide-react'

interface VideoItem {
  id: string
  category: 'artistas' | 'clientes'
  title: string
  person: string
  badge: string
  role: string
  quote: string
  src: string
  poster?: string
  duration: string
}

const VIDEOS: VideoItem[] = [
  {
    id: 'pablito',
    category: 'artistas',
    person: 'Pablito Pesadilla',
    title: 'Saludo Oficial de Artista',
    badge: 'Artista VIP',
    role: 'DJ & Productor Internacional',
    quote: 'En una actividad junto a la comunidad, Pablito Pesadilla envía un saludo destacando la energía, puesta en escena y profesionalismo de MR Bombastik.',
    src: '/videos/saludo_pablito.mp4',
    poster: '/images/thumb_pablito.jpg',
    duration: '0:09'
  },
  {
    id: 'otakin',
    category: 'artistas',
    person: 'Otakin',
    title: 'Evaluación de Coctelería en Vivo',
    badge: 'Figura Pública',
    role: 'Creador de Contenido & Crítico',
    quote: 'Presente en el gran evento social en Maipú, evaluando en directo el sabor, la mixología de autor y la puesta en escena de nuestras barras.',
    src: '/videos/saludo_otakin.mp4',
    poster: '/images/thumb_otakin.jpg',
    duration: '0:11'
  },
  {
    id: 'testimonio-15anos',
    category: 'clientes',
    person: 'Anfitriones Felices',
    title: 'Celebración 15 Años Renata',
    badge: 'Experiencia Real',
    role: 'Padres & Familia Anfitriona',
    quote: 'Agradecemos profundamente el compromiso y la excelencia de MR Bombastik: hicieron realidad el sueño de los 15 años de Renata con un banquete y servicio inolvidable.',
    src: '/videos/testimonio_15anos.mp4',
    poster: '/images/thumb_15anos.jpg',
    duration: '0:38'
  },
  {
    id: 'testimonio-matrimonio',
    category: 'clientes',
    person: 'Anfitriones Felices',
    title: 'Matrimonio & Gran Celebración',
    badge: 'Experiencia Real',
    role: 'Novios & Familias Satisfechas',
    quote: 'La emoción de comprobar que todo salió perfecto: banquetería de primer nivel, tiempos coordinados al segundo y un equipo con vocación de servicio.',
    src: '/videos/testimonio_matrimonio.mp4',
    poster: '/images/thumb_testimonio.jpg',
    duration: '0:49'
  },
  {
    id: 'somos',
    category: 'clientes',
    person: 'Anfitriones Felices',
    title: 'Puesta en Escena & Coctelería',
    badge: 'Experiencia Real',
    role: 'Experiencia Real de Clientes',
    quote: 'Barras móviles iluminadas, show de coctelería y una banquetería impecable que hizo disfrutar a todos nuestros invitados al máximo.',
    src: '/videos/somos_mrbombastik.mp4',
    poster: '/images/thumb_somos.jpg',
    duration: '0:15'
  }
]

export default function VideoTestimonials() {
  const [filter, setFilter] = useState<'all' | 'artistas' | 'clientes'>('all')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>({
    pablito: false,
    otakin: false,
    'testimonio-15anos': false,
    'testimonio-matrimonio': false,
    somos: false
  })
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)

  const filteredVideos = VIDEOS.filter((item) => {
    if (filter === 'all') return true
    return item.category === filter
  })

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id]
    if (!video) return

    if (playingId === id) {
      video.pause()
      setPlayingId(null)
    } else {
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause()
      }
      video.muted = mutedMap[id] ?? false
      video.play().catch(() => {})
      setPlayingId(id)
    }
  }

  const toggleMute = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const video = videoRefs.current[id]
    const nextMuted = !(mutedMap[id] ?? false)
    if (video) video.muted = nextMuted
    setMutedMap((prev) => ({ ...prev, [id]: nextMuted }))
  }

  const openModal = (item: VideoItem) => {
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId]?.pause()
      setPlayingId(null)
    }
    setActiveModalVideo(item)
  }

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
    }
    setActiveModalVideo(null)
  }

  return (
    <section id="recomendaciones" className="border-b border-white/10 bg-[#090909] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#16130d] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
            <Sparkles size={13} /> RESPALDO & REPUTACIÓN COMPROBADA
          </div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-white">
            Recomendaciones & Saludos Exclusivos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-white/70">
            Artistas, figuras públicas y anfitriones que vivieron una experiencia real e inolvidable con la banquetería y coctelería de Mr Bombastik.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'border border-white/15 bg-black/40 text-white/70 hover:border-[#d4af37]/50 hover:text-white'
              }`}
            >
              Todos los Videos ({VIDEOS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('clientes')}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === 'clientes'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'border border-white/15 bg-black/40 text-white/70 hover:border-[#d4af37]/50 hover:text-white'
              }`}
            >
              <CheckCircle2 size={13} className={filter === 'clientes' ? 'text-black' : 'text-[#d4af37]'} /> Anfitriones Felices · Experiencia Real (3)
            </button>
            <button
              type="button"
              onClick={() => setFilter('artistas')}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === 'artistas'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'border border-white/15 bg-black/40 text-white/70 hover:border-[#d4af37]/50 hover:text-white'
              }`}
            >
              <Star size={13} className={filter === 'artistas' ? 'fill-black' : 'fill-[#d4af37] text-[#d4af37]'} /> Artistas & Famosos (2)
            </button>
          </div>
        </div>

        {/* Video Cards Grid: Perfectly responsive on Mobile (1), Tablet (2-3), Desktop (3-5) */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filteredVideos.map((item) => {
            const isPlaying = playingId === item.id
            const isMuted = mutedMap[item.id] ?? false

            return (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-xl hover:shadow-[#d4af37]/10"
              >
                {/* Video Player Container */}
                <div
                  className="relative aspect-[9/15] w-full cursor-pointer overflow-hidden bg-black"
                  onClick={() => togglePlay(item.id)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el
                    }}
                    src={item.src}
                    poster={item.poster}
                    playsInline
                    preload="metadata"
                    onEnded={() => setPlayingId(null)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#d4af37]/60 bg-black/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d4af37] backdrop-blur-md">
                      <Star size={9} className="fill-[#d4af37]" /> {item.badge}
                    </span>
                    <span className="rounded-full bg-black/75 px-1.5 py-0.5 text-[9px] text-white/80 backdrop-blur-md font-mono">
                      {item.duration}
                    </span>
                  </div>

                  {/* Center Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#d4af37] ${
                        isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-90 shadow-lg shadow-black/50'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause size={20} className="text-[#d4af37]" />
                      ) : (
                        <Play size={20} className="translate-x-0.5 text-[#d4af37]" />
                      )}
                    </div>
                  </div>

                  {/* Bottom Video Controls */}
                  <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between z-10">
                    <button
                      type="button"
                      aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                      onClick={(e) => toggleMute(e, item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/75 text-white/90 backdrop-blur-md transition hover:bg-[#d4af37] hover:text-black"
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                    <button
                      type="button"
                      aria-label="Ver en pantalla completa"
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal(item)
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/75 text-white/90 backdrop-blur-md transition hover:bg-[#d4af37] hover:text-black"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Card Information */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#d4af37] shrink-0" />
                    <h3 className="font-serif text-sm font-bold text-white tracking-wide truncate">
                      {item.person}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#d4af37] truncate">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-white/50 truncate">
                    {item.role}
                  </p>
                  <p className="mt-2.5 text-[11px] leading-relaxed text-white/70 line-clamp-3">
                    {item.quote}
                  </p>
                  <div className="mt-auto pt-3">
                    <button
                      type="button"
                      onClick={() => openModal(item)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-1.5 text-center text-[11px] font-semibold text-white/90 transition hover:border-[#d4af37] hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                    >
                      <Film size={12} /> Ver con audio
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal for Full View with Sound */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#121212] shadow-2xl shadow-[#d4af37]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-5 py-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                  {activeModalVideo.badge}
                </span>
                <h4 className="font-serif text-base font-bold text-white">
                  {activeModalVideo.person} · {activeModalVideo.title}
                </h4>
              </div>
              <button
                type="button"
                aria-label="Cerrar reproductor"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Video Player */}
            <div className="relative aspect-[9/15] w-full bg-black">
              <video
                ref={modalVideoRef}
                src={activeModalVideo.src}
                poster={activeModalVideo.poster}
                autoPlay
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            </div>

            {/* Modal Description */}
            <div className="border-t border-white/10 bg-[#141414] p-4 text-xs">
              <p className="font-semibold text-[#d4af37]">{activeModalVideo.role}</p>
              <p className="mt-1 text-white/75 leading-relaxed">{activeModalVideo.quote}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
