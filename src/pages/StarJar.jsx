import React, { useEffect, useMemo, useState } from 'react'

const KEY = 'noeytop:starsV2'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function StarJar() {
  const [message, setMessage] = useState('')
  const [stars, setStars] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(stars))
    } catch {}
  }, [stars])

  const disabled = useMemo(() => !message.trim(), [message])

  function addStar(e) {
    e.preventDefault()
    if (disabled) return

    const star = {
      id: `star_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`,
      text: message.trim(),
      x: Math.floor(randomBetween(5, 90)), // percent
      y: Math.floor(randomBetween(10, 80)), // percent
      size: randomBetween(18, 36), // px
      rotate: randomBetween(-12, 12),
      dur: randomBetween(6, 12),
      delay: randomBetween(0, 6),
      created: Date.now(),
    }
    setStars([star, ...stars])
    setMessage('')
  }

  return (
    <section className="space-y-6">
      <header className="text-center">
        <h2 className="section-title">Star Jar ⭐</h2>
        <p className="opacity-80">Drop a tiny love star for Top</p>
      </header>

      <form onSubmit={addStar} className="glass p-4 grid gap-3 md:grid-cols-[1fr,140px]">
        <input
          className="input input-bordered rounded-full"
          placeholder="Write a small love message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary rounded-full shadow-soft normal-case" disabled={disabled}>
          เพมดาว
        </button>
      </form>

      <div className="glass relative overflow-hidden rounded-2xl" style={{ height: '60vh' }}>
        <BackgroundGradient />
        {stars.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-rose-400/80">
            Our sky is empty — add our first star ✨
          </div>
        )}
        {stars.map((s) => (
          <Star key={s.id} star={s} />
        ))}
      </div>
    </section>
  )
}

function Star({ star }) {
  const style = {
    left: `${star.x}%`,
    top: `${star.y}%`,
    fontSize: `${star.size}px`,
    transform: `rotate(${star.rotate}deg)`,
    ['--dur']: `${star.dur}s`,
    ['--delay']: `${star.delay}s`,
  }
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
      style={style}
      title={new Date(star.created).toLocaleString()}
    >
      <div
        className="select-none leading-none drop-shadow-[0_6px_12px_rgba(250,204,21,0.35)] animate-float"
        style={{
          color: '#fde68a', // pastel yellow
          textShadow: '0 2px 8px rgba(236, 72, 153, 0.25)', // soft pink glow
        }}
      >
        ★
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
        <div className="px-3 py-1 rounded-full bg-rose-100/90 text-rose-600 text-xs whitespace-nowrap shadow-soft">
          {star.text}
        </div>
      </div>
    </div>
  )
}

function BackgroundGradient() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute -top-10 -left-10 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(251, 207, 232, 0.6), transparent)' }}
      />
      <div
        className="absolute bottom-0 right-0 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(253, 230, 138, 0.5), transparent)' }}
      />
    </div>
  )
}

