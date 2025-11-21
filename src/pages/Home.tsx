import { Link } from 'react-router-dom'
import { load } from '../lib/storage'

export default function Home() {
  const diaryCount = (load<any[]>('diary', [])).length
  const starsCount = (load<any[]>('stars', [])).length
  const photosCount = (load<any[]>('photos', [])).length
  const missions = load<any[]>('missions', [])
  const missionsDone = missions.filter((m) => m.done).length

  return (
    <section>
      <header className="text-center mb-8">
        <h1 className="section-title">Noey & Top Private Space</h1>
        <p className="mt-2 text-rose-400/90">A soft, romantic place for our memories 💗</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Diary" to="/diary" subtitle={`${diaryCount} entries`} emoji="📔" />
        <Card title="Star Jar" to="/star-jar" subtitle={`${starsCount} stars`} emoji="⭐" />
        <Card title="Countdowns" to="/countdown" subtitle="Moments we’re waiting for" emoji="⏳" />
        <Card title="Photo Board" to="/photo-board" subtitle={`${photosCount} photos`} emoji="📷" />
        <Card title="Missions" to="/missions" subtitle={`${missionsDone}/${missions.length} done`} emoji="🎯" />
      </div>
    </section>
  )
}

function Card({ title, to, subtitle, emoji }: { title: string; to: string; subtitle?: string; emoji?: string }) {
  return (
    <Link to={to} className="glass block p-5 transition hover:shadow-xl">
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-xl font-bold text-rose-500">{title}</div>
      {subtitle && <div className="opacity-70">{subtitle}</div>}
    </Link>
  )
}
