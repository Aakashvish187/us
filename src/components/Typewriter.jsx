import { useEffect, useState } from 'react'

// Types text out character by character. Tap/click to finish instantly.
export default function Typewriter({ text, speed = 26, className = '', as: Tag = 'p', caret = true }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    setN(0)
    const id = setInterval(() => {
      setN((c) => {
        if (c >= text.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  const done = n >= text.length

  return (
    <Tag
      className={className}
      style={{ whiteSpace: 'pre-line' }}
      onClick={() => setN(text.length)}
      aria-label={text}
    >
      {text.slice(0, n)}
      {caret && !done && <span className="caret" />}
    </Tag>
  )
}
