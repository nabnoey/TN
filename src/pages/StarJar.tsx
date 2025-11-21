import { useEffect, useState } from 'react'
import StarCard, { type Star } from '../components/StarCard'
import { load, save, uid } from '../lib/storage'

export default function StarJar() {
  const [stars, setStars] = useState<Star[]>(() => load('stars', [] as Star[]))
  const [text, setText] = useState('')

  useEffect(() => {
    save('stars', stars)
  }, [stars])

  function addStar(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setStars([{ id: uid('star'), text: text.trim(), date: new Date().toISOString() }, ...stars])
    setText('')
  }

  function remove(id: string) {
    setStars(stars.filter((s) => s.id !== id))
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="section-title">Star Jar</h2>
        <p className="opacity-80">Little sparkles of gratitude and love ⭐</p>
      </header>

      <form onSubmit={addStar} className="glass p-4 flex flex-col sm:flex-row gap-3">
        <input value={text} onChange={(e) => setText(e.target.value)} className="input input-bordered flex-1 w-full rounded-full" placeholder="Add a little star message..." />
        <button className="cute-btn w-full sm:w-auto" type="submit" disabled={!text.trim()}>
          Add Star
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stars.length === 0 && <div className="opacity-70">Our jar is empty — let’s fill it ✨</div>}
        {stars.map((star) => (
          <StarCard key={star.id} star={star} onRemove={remove} />
        ))}
      </div>
    </section>
  )
}
