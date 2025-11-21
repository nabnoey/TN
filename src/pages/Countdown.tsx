import { useEffect, useMemo, useState } from 'react'
import { load, save, uid } from '../lib/storage'

type EventItem = { id: string; title: string; date: string }

function useTicker() {
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])
}

function timeLeft(targetISO: string) {
  const diff = new Date(targetISO).getTime() - Date.now()
  const past = diff <= 0
  const d = Math.abs(diff)
  const days = Math.floor(d / (1000 * 60 * 60 * 24))
  const hours = Math.floor((d / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((d / (1000 * 60)) % 60)
  const seconds = Math.floor((d / 1000) % 60)
  return { past, days, hours, minutes, seconds }
}

export default function Countdown() {
  const [events, setEvents] = useState<EventItem[]>(() => load('events', [] as EventItem[]))
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  useTicker()

  useEffect(() => save('events', events), [events])

  function addEvent(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) return
    setEvents([...events, { id: uid('ev'), title: title.trim(), date }])
    setTitle('')
    setDate('')
  }
  function remove(id: string) {
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="section-title">Countdowns</h2>
        <p className="opacity-80">Counting down to sweet moments ⏳</p>
      </header>

      <form onSubmit={addEvent} className="glass p-4 grid gap-3 md:grid-cols-[1fr,280px,160px]">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered rounded-full" placeholder="Event title (e.g., Anniversary trip)" />
        <input value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered rounded-full" type="datetime-local" />
        <button className="cute-btn" disabled={!title.trim() || !date} type="submit">
          Add
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.length === 0 && <div className="opacity-70">No countdowns yet — set a date 💞</div>}
        {events.map((ev) => (
          <EventCard key={ev.id} ev={ev} onRemove={remove} />
        ))}
      </div>
    </section>
  )
}

function EventCard({ ev, onRemove }: { ev: EventItem; onRemove: (id: string) => void }) {
  const tl = useMemo(() => timeLeft(ev.date), [ev.date])
  return (
    <div className="glass p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-rose-500 text-lg">{ev.title}</h3>
        <button className="btn btn-ghost btn-xs rounded-full" onClick={() => onRemove(ev.id)}>
          remove
        </button>
      </div>
      <div className="mt-2 text-sm opacity-70">{new Date(ev.date).toLocaleString()}</div>
      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
        <TimeBox label="Days" value={tl.days} />
        <TimeBox label="Hours" value={tl.hours} />
        <TimeBox label="Mins" value={tl.minutes} />
        <TimeBox label="Secs" value={tl.seconds} />
      </div>
      {tl.past && <div className="mt-3 badge badge-secondary badge-outline">It happened! 🎉</div>}
    </div>
  )
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white/70 p-3">
      <div className="text-2xl font-extrabold text-primary">{value}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  )
}
