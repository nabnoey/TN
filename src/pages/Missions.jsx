import React, { useEffect, useMemo, useState } from 'react'

const KEY = 'noeytop:missionsV2'

export default function Missions() {
  const [text, setText] = useState('')
  const [missions, setMissions] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(missions))
    } catch {}
  }, [missions])

  const canAdd = useMemo(() => text.trim().length > 0, [text])

  function addMission(e) {
    e.preventDefault()
    if (!canAdd) return
    setMissions((prev) => [
      { id: `ms_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`, text: text.trim(), done: false },
      ...prev,
    ])
    setText('')
  }

  function toggleMission(id) {
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)))
  }

  function removeMission(id) {
    setMissions((prev) => prev.filter((m) => m.id !== id))
  }

  const doneCount = missions.filter((m) => m.done).length

  return (
    <section className="space-y-6">
      <header className="text-center">
        <h2 className="section-title">Couple Missions 💖</h2>
        <p className="opacity-80">ภารกิจน่ารัก ๆ ของ Noey & Top</p>
        <div className="mt-2 text-sm"><span className="badge badge-secondary badge-outline">{doneCount}</span> / {missions.length} สำเร็จแล้ว</div>
      </header>

      <form onSubmit={addMission} className="glass p-4 flex gap-3 items-center">
        <span className="text-2xl" aria-hidden>💗</span>
        <input
          className="input input-bordered flex-1 rounded-full"
          placeholder="เพิ่มภารกิจสำหรับเรา เช่น ปิกนิกตอนเย็น"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary rounded-full shadow-soft normal-case" disabled={!canAdd}>
          Add
        </button>
      </form>

      <ul className="space-y-3">
        {missions.length === 0 && (
          <div className="opacity-70">ยังไม่มีภารกิจเลย — ชวนกันทำอะไรน่ารัก ๆ กันเถอะ ✨</div>
        )}
        {missions.map((m) => (
          <li key={m.id} className="glass p-3 rounded-2xl flex items-center gap-3">
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              checked={m.done}
              onChange={() => toggleMission(m.id)}
            />
            <span className={`flex-1 text-rose-600 ${m.done ? 'line-through opacity-60' : ''}`}>{m.text}</span>
            <span className="text-xl" aria-hidden>{m.done ? '💞' : '💗'}</span>
            <button className="btn btn-ghost btn-xs rounded-full" onClick={() => removeMission(m.id)}>
              remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

