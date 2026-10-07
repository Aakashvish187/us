import { useRef, useState } from 'react'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { fileToDataUrl } from '../utils/image'

// Tap to choose, or drag & drop. Returns a compressed data URL via onChange.
export default function PhotoDrop({ value, onChange, aspect = 'aspect-[4/3]' }) {
  const inputRef = useRef(null)
  const [drag, setDrag] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file) {
    if (!file) return
    setError('')
    setBusy(true)
    try {
      onChange(await fileToDataUrl(file))
    } catch {
      setError('That file could not be used. Try a JPG or PNG photo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          handleFile(e.dataTransfer.files?.[0])
        }}
        className={`relative grid ${aspect} w-full cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed transition ${
          drag ? 'border-rose bg-rose/10' : 'border-rose/30 bg-white/50 hover:bg-white/80'
        }`}
      >
        {value ? (
          <img src={value} alt="Selected" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center text-mute">
            {busy ? <Loader2 className="animate-spin" /> : <ImagePlus size={28} className="text-rose" />}
            <span className="text-sm">{busy ? 'Getting it ready…' : 'Tap to add a photo, or drop it here'}</span>
          </div>
        )}
        {value && (
          <button
            type="button"
            aria-label="Remove photo"
            onClick={(e) => {
              e.stopPropagation()
              onChange('')
            }}
            className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-white backdrop-blur"
          >
            <X size={18} />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0])
            e.target.value = ''
          }}
        />
      </div>
      {error && <p className="mt-2 text-sm text-wine">{error}</p>}
    </div>
  )
}
