import { useEffect, useRef, useState } from 'react'
import { Play, Volume2, VolumeX } from 'lucide-react'

const base = import.meta.env.BASE_URL

// Our little clip. Plays muted on a loop while on screen; tap for sound.
export default function VideoMoment({ title = 'Our little clip', caption = 'Three seconds I keep replaying.', autoplay = true }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  const safePlay = () => {
    const p = ref.current?.play?.()
    if (p && typeof p.catch === 'function') p.catch(() => setPlaying(false))
  }

  useEffect(() => {
    const el = ref.current
    if (!el || !autoplay || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) safePlay()
        else el.pause?.()
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [autoplay])

  function toggleSound(e) {
    e.stopPropagation()
    const el = ref.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
    if (el.paused) safePlay()
  }

  function togglePlay() {
    const el = ref.current
    if (!el) return
    if (el.paused) safePlay()
    else el.pause()
  }

  return (
    <section className="glass overflow-hidden p-3">
      <div className="mb-3 flex items-baseline justify-between px-2 pt-1">
        <p className="eyebrow">{title}</p>
        <p className="text-xs text-mute">{caption}</p>
      </div>

      <div className="relative mx-auto max-w-[19rem] overflow-hidden rounded-[1.6rem] bg-ink/10">
        <video
          ref={ref}
          src={`${base}video/us.mp4`}
          poster={`${base}video/us-poster.jpg`}
          className="aspect-[9/16] w-full cursor-pointer object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={togglePlay}
        />
        {!playing && (
          <button
            onClick={togglePlay}
            aria-label="Play clip"
            className="absolute inset-0 grid place-items-center bg-ink/15"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/85 text-wine shadow-soft backdrop-blur">
              <Play size={26} fill="currentColor" className="ml-1" />
            </span>
          </button>
        )}
        <button
          onClick={toggleSound}
          aria-label={muted ? 'Turn sound on' : 'Mute'}
          className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-ink/55 text-white backdrop-blur"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </section>
  )
}
