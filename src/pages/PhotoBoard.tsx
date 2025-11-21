import { useEffect, useState } from 'react'
import PhotoItem, { type Photo } from '../components/PhotoItem'
import { load, save, uid } from '../lib/storage'

export default function PhotoBoard() {
  const [photos, setPhotos] = useState<Photo[]>(() => load('photos', [] as Photo[]))
  const [url, setUrl] = useState('')
  const [caption, setCaption] = useState('')

  useEffect(() => save('photos', photos), [photos])

  function addPhoto(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setPhotos([{ id: uid('ph'), url: url.trim(), caption: caption.trim() || undefined }, ...photos])
    setUrl('')
    setCaption('')
  }
  function remove(id: string) {
    setPhotos(photos.filter((p) => p.id !== id))
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="section-title">Photo Board</h2>
        <p className="opacity-80">Our moments, pinned with love 📷</p>
      </header>

      <form onSubmit={addPhoto} className="glass p-4 grid gap-3 md:grid-cols-[1fr,1fr,140px]">
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="input input-bordered rounded-full" placeholder="Image URL" />
        <input value={caption} onChange={(e) => setCaption(e.target.value)} className="input input-bordered rounded-full" placeholder="Caption (optional)" />
        <button className="cute-btn" disabled={!url.trim()} type="submit">
          Add Photo
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.length === 0 && <div className="opacity-70">No photos yet — add our smiles 😊</div>}
        {photos.map((p) => (
          <PhotoItem key={p.id} photo={p} onRemove={remove} />
        ))}
      </div>
    </section>
  )
}
