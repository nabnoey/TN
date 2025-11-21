import React, { useEffect, useState } from 'react'

const KEY = 'noeytop:photosV2'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function PhotoBoard() {
  const [photos, setPhotos] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(photos))
    } catch {}
  }, [photos])

  async function onFiles(e) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    const items = []
    for (const f of files) {
      if (!f.type.startsWith('image/')) continue
      // eslint-disable-next-line no-await-in-loop
      const url = await fileToDataUrl(f)
      items.push({
        id: `ph_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`,
        url,
        caption: '',
        date: Date.now(),
        name: f.name,
      })
    }
    setPhotos((prev) => [...items, ...prev])
    e.target.value = ''
  }

  function updateCaption(id, caption) {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, caption } : p)))
  }

  function remove(id) {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <section className="space-y-6">
      <header className="text-center">
        <h2 className="section-title">Dreamy Photo Board 📷</h2>
        <p className="opacity-80">อัปโหลดรูปสวยๆ ของเรา เติมคำบรรยายหวานๆ กันนะ</p>
      </header>

      <div className="glass p-5 flex flex-col md:flex-row gap-3 items-center justify-between">
        <label className="btn btn-primary rounded-full shadow-soft cursor-pointer">
          <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
          Upload Photos
        </label>
        <div className="text-sm opacity-70">เก็บไว้ในเบราว์เซอร์ของเรา (localStorage)</div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {photos.length === 0 && (
          <div className="opacity-70">ยังไม่มีรูปเลย — ลองอัปโหลดสักหน่อยน้า 💞</div>
        )}
        {photos.map((p) => (
          <figure key={p.id} className="glass overflow-hidden rounded-2xl">
            <img
              src={p.url}
              alt={p.caption || p.name || 'photo'}
              className="h-64 w-full object-cover"
              loading="lazy"
            />
            <figcaption className="p-3 space-y-2">
              <input
                className="input input-bordered w-full rounded-full"
                placeholder="Add a sweet caption…"
                value={p.caption}
                onChange={(e) => updateCaption(p.id, e.target.value)}
              />
              <div className="flex items-center justify-between text-xs opacity-60">
                <span>{new Date(p.date).toLocaleString()}</span>
                <button className="btn btn-ghost btn-xs rounded-full" onClick={() => remove(p.id)}>
                  remove
                </button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

