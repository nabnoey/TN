import { useEffect, useMemo, useState } from 'react'
import DiaryCard, { type DiaryEntry } from '../components/DiaryCard'
import { load, save, uid } from '../lib/storage'

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => load('diary', [] as DiaryEntry[]))
  const [title, setTitle] = useState('')
  const [mood, setMood] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    save('diary', entries)
  }, [entries])

  const canSave = useMemo(() => title.trim() && content.trim(), [title, content])

  function addEntry(e: React.FormEvent) {
    e.preventDefault()
    if (!canSave) return
    const entry: DiaryEntry = {
      id: uid('note'),
      date: new Date().toISOString(),
      title: title.trim(),
      mood: mood.trim() || undefined,
      content: content.trim(),
    }
    setEntries([entry, ...entries])
    setTitle('')
    setMood('')
    setContent('')
  }

  function remove(id: string) {
    setEntries(entries.filter((e) => e.id !== id))
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="section-title">Diary</h2>
        <p className="opacity-80">Write little love notes and memories 💌</p>
      </header>

      <form onSubmit={addEntry} className="glass p-4 space-y-3">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered rounded-full"
            placeholder="Title"
          />
          <input value={mood} onChange={(e) => setMood(e.target.value)} className="input input-bordered rounded-full" placeholder="Mood (e.g., happy, cozy)" />
          <button className="cute-btn" disabled={!canSave} type="submit">
            Save Entry
          </button>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full rounded-2xl"
          rows={5}
          placeholder="Dear us..."
        />
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries.length === 0 && <div className="opacity-70">No entries yet — start our story ✨</div>}
        {entries.map((entry) => (
          <DiaryCard key={entry.id} entry={entry} onDelete={remove} />
        ))}
      </div>
    </section>
  )
}
