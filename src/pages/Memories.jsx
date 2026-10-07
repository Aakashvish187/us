import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Camera, MapPin, Pencil, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import PhotoDrop from '../components/PhotoDrop'
import VideoMoment from '../components/VideoMoment'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getSeedMemories } from '../data/seedMemories'
import { formatDate, todayKey } from '../utils/time'

const FEELINGS = ['Happy 🥰', 'Butterflies 🦋', 'Peaceful 😌', 'Laughing 😂', 'Missing it 🥺']

function MemoryForm({ initial, onSave, onCancel }) {
  const [photo, setPhoto] = useState(initial?.photo ?? '')
  const [caption, setCaption] = useState(initial?.caption ?? '')
  const [date, setDate] = useState(initial?.date ?? todayKey())
  const [location, setLocation] = useState(initial?.location ?? '')
  const [feeling, setFeeling] = useState(initial?.feeling ?? '')

  function submit(e) {
    e.preventDefault()
    if (!photo) return
    onSave({
      id: initial?.id ?? `m-${Date.now()}`,
      photo,
      caption: caption.trim(),
      date,
      location: location.trim(),
      feeling: feeling.trim(),
    })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <PhotoDrop value={photo} onChange={setPhoto} />

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-mute">Caption</label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What was this moment?"
          className="field"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-widest text-mute">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-widest text-mute">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where were we?" className="field" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest text-mute">How I felt</label>
        <div className="mb-2 flex flex-wrap gap-2">
          {FEELINGS.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFeeling(f)}
              className={`chip min-h-[40px] text-[13px] ${feeling === f ? 'chip-on' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>
        <input value={feeling} onChange={(e) => setFeeling(e.target.value)} placeholder="Or write it your way…" className="field" />
      </div>

      <div className="flex gap-3 pt-1">
        <button type="button" className="btn-ghost flex-1" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1" disabled={!photo}>
          {initial ? 'Save changes' : 'Add memory'}
        </button>
      </div>
      {!photo && <p className="text-center text-xs text-mute">Add a photo to save this memory.</p>}
    </form>
  )
}

export default function Memories() {
  const [memories, setMemories] = useLocalStorage('memories', getSeedMemories)
  const [form, setForm] = useState(null) // null | 'new' | memory being edited
  const [view, setView] = useState(null) // memory shown large
  const [confirmDelete, setConfirmDelete] = useState(false)

  const sorted = [...memories].sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  function saveMemory(m) {
    setMemories((prev) => (prev.some((x) => x.id === m.id) ? prev.map((x) => (x.id === m.id ? m : x)) : [m, ...prev]))
    setForm(null)
    setView(null)
  }

  function removeMemory(id) {
    setMemories((prev) => prev.filter((m) => m.id !== id))
    setView(null)
    setConfirmDelete(false)
  }

  return (
    <div>
      <PageHeader eyebrow="Memory wall" title="Little moments, kept" sub="Photos, places and how it felt. Saved only on this device." />

      <div className="mb-6 flex justify-center">
        <button className="btn-primary" onClick={() => setForm('new')}>
          <Plus size={18} /> Add a memory
        </button>
      </div>

      <div className="mx-auto mb-6 max-w-sm">
        <VideoMoment title="Moving memory" caption="Tap to play" autoplay={false} />
      </div>

      {sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto flex max-w-md flex-col items-center gap-3 px-6 py-14 text-center"
        >
          <Camera size={34} className="text-rose" />
          <p className="font-serif text-2xl italic">Our first memories are waiting here...</p>
          <button className="btn-ghost mt-2" onClick={() => setForm('new')}>
            Add the first one
          </button>
        </motion.div>
      ) : (
        <div className="columns-2 gap-3 md:columns-3 md:gap-4">
          {sorted.map((m, i) => (
            <motion.button
              key={m.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 6) * 0.06 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                setView(m)
                setConfirmDelete(false)
              }}
              className="glass mb-3 block w-full break-inside-avoid overflow-hidden rounded-3xl p-2 text-left md:mb-4"
            >
              <img src={m.photo} alt={m.caption || 'Memory'} loading="lazy" className="w-full rounded-2xl object-cover" />
              <div className="px-1.5 pb-1.5 pt-2.5">
                {m.caption && <p className="font-serif text-[15px] leading-snug text-ink">{m.caption}</p>}
                <p className="mt-1.5 text-[11px] text-mute">{m.date ? formatDate(m.date) : ''}</p>
                {m.feeling && <p className="mt-1 font-hand text-lg leading-none text-rose">{m.feeling}</p>}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* add / edit */}
      <Modal open={!!form} onClose={() => setForm(null)} title={form && form !== 'new' ? 'Edit memory' : 'New memory'}>
        {form && <MemoryForm initial={form === 'new' ? null : form} onSave={saveMemory} onCancel={() => setForm(null)} />}
      </Modal>

      {/* large view */}
      <AnimatePresence>
        {view && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={() => setView(null)} />
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative flex max-h-[94dvh] w-full max-w-md flex-col overflow-hidden rounded-[2rem] bg-cream shadow-glass"
            >
              <img src={view.photo} alt={view.caption || 'Memory'} className="max-h-[58dvh] w-full object-cover" />
              <div className="space-y-2 overflow-y-auto p-5">
                {view.caption && <p className="font-serif text-xl leading-snug">{view.caption}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-mute">
                  {view.date && (
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} /> {formatDate(view.date)}
                    </span>
                  )}
                  {view.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {view.location}
                    </span>
                  )}
                </div>
                {view.feeling && <p className="font-hand text-2xl text-rose">{view.feeling}</p>}

                <div className="flex gap-3 pt-2">
                  <button className="btn-ghost flex-1" onClick={() => setView(null)}>
                    Close
                  </button>
                  <button
                    className="btn-ghost"
                    aria-label="Edit"
                    onClick={() => {
                      setForm(view)
                      setView(null)
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  {confirmDelete ? (
                    <button className="btn-primary" onClick={() => removeMemory(view.id)}>
                      Delete?
                    </button>
                  ) : (
                    <button className="btn-ghost" aria-label="Delete" onClick={() => setConfirmDelete(true)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
