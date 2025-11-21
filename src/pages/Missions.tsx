import { useEffect, useState } from 'react'
import { load, save, uid } from '../lib/storage'

type Mission = { id: string; title: string; done: boolean }

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>(() => load('missions', [] as Mission[]))
  const [title, setTitle] = useState('')

  useEffect(() => save('missions', missions), [missions])

  function addMission(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setMissions([...missions, { id: uid('ms'), title: title.trim(), done: false }])
    setTitle('')
  }
  function toggle(id: string) {
    setMissions(missions.map((m) => (m.id === id ? { ...m, done: !m.done } : m)))
  }
  function remove(id: string) {
    setMissions(missions.filter((m) => m.id !== id))
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="section-title">Missions</h2>
        <p className="opacity-80">Cute goals for us to do together 🎯</p>
      </header>

      <form onSubmit={addMission} className="glass p-4 flex flex-col sm:flex-row gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered flex-1 w-full rounded-full" placeholder="Add a mission..." />
        <button className="cute-btn w-full sm:w-auto" disabled={!title.trim()} type="submit">
          Add
        </button>
      </form>

      <ul className="space-y-3">
        {missions.length === 0 && <div className="opacity-70">No missions yet — let’s dream up some 💭</div>}
        {missions.map((m) => (
          <li key={m.id} className="glass p-3 flex items-center gap-3">
            <input type="checkbox" className="checkbox checkbox-secondary" checked={m.done} onChange={() => toggle(m.id)} />
            <span className={`flex-1 ${m.done ? 'line-through opacity-60' : ''}`}>{m.title}</span>
            <button className="btn btn-ghost btn-xs rounded-full" onClick={() => remove(m.id)}>
              remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
