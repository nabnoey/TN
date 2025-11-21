import React, { useEffect, useState } from 'react'

const KEY = 'noeytop:diaryMessages'

export default function Diary() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(messages))
    } catch {
      // ignore
    }
  }, [messages])

  function onSave(e) {
    e.preventDefault()
    if (!text.trim()) return
    const entry = {
      id: `note_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`,
      date: new Date().toISOString(),
      text: text.trim(),
    }
    setMessages([entry, ...messages])
    setText('')
  }

  return (
    <section className="space-y-6">
      <header className="text-center">
        <h2 className="section-title">Dear Top 💗</h2>
        <p className="opacity-80">Write a sweet note to keep in our diary.</p>
      </header>

      <form onSubmit={onSave} className="glass p-4 space-y-3">
        <textarea
          className="textarea textarea-bordered w-full rounded-2xl"
          rows={6}
          placeholder="Dear Top,\nToday I want to tell you..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="text-right">
          <button className="btn btn-primary rounded-full shadow-soft normal-case" disabled={!text.trim()}>
            Save
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {messages.length === 0 && (
          <div className="opacity-70">No letters yet — write your first love note ✨</div>
        )}
        {messages.map((m) => (
          <article key={m.id} className="card glass overflow-hidden">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h3 className="card-title text-rose-500">A little love note</h3>
                <span className="text-xs opacity-60">{new Date(m.date).toLocaleString()}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
              <div className="text-right text-xl">💞</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

