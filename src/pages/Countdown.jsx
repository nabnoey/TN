import React, { useEffect, useMemo, useState } from 'react'

const KEY = 'noeytop:nextMeetingDate'
const MS_PER_DAY = 24 * 60 * 60 * 1000

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function daysUntil(dateStr) {
  if (!dateStr) return null
  // Ensure local-time parsing for YYYY-MM-DD
  const target = new Date(`${dateStr}T00:00:00`)
  const diffMs = target.getTime() - startOfToday().getTime()
  return Math.ceil(diffMs / MS_PER_DAY)
}

export default function Countdown() {
  const [dateStr, setDateStr] = useState(() => {
    try {
      return localStorage.getItem(KEY) || ''
    } catch {
      return ''
    }
  })

  const left = useMemo(() => daysUntil(dateStr), [dateStr])

  useEffect(() => {
    try {
      if (dateStr) localStorage.setItem(KEY, dateStr)
    } catch {}
  }, [dateStr])

  return (
    <section className="space-y-8">
      <header className="text-center">
        <h2 className="section-title">Countdown to Our Next Hug</h2>
        <p className="opacity-80">เลือกวันที่จะได้พบกันอีกครั้ง 💞</p>
      </header>

      <div className="glass p-5 flex items-center gap-4 justify-center">
        <input
          type="date"
          className="input input-bordered rounded-full max-w-xs"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
        />
        <span className="badge badge-secondary badge-outline">บันทึกอัตโนมัติ</span>
      </div>

      <div className="text-center">
        {left == null || dateStr === '' ? (
          <p className="opacity-70">กรุณาเลือกวันนัดเจอกันนะ 🗓️</p>
        ) : left > 0 ? (
          <h3 className="text-4xl md:text-6xl font-extrabold text-rose-500 drop-shadow-[0_10px_30px_rgba(244,114,182,0.35)]">
            เหลืออีก <span className="text-primary">{left}</span> วันจะได้กอดอ้วน💗
          </h3>
        ) : (
          <h3 className="text-4xl md:text-6xl font-extrabold text-rose-500 drop-shadow-[0_10px_30px_rgba(244,114,182,0.35)]">
            วันนี้ได้กอดอ้วนแล้วนะะะ 💗
          </h3>
        )}

        {dateStr && (
          <div className="mt-3 text-sm opacity-70">
            วันที่เลือก: {new Date(`${dateStr}T00:00:00`).toLocaleDateString()}
          </div>
        )}
      </div>
    </section>
  )
}

