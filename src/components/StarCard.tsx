export type Star = {
  id: string
  text: string
  date: string
}

export default function StarCard({ star, onRemove }: { star: Star; onRemove?: (id: string) => void }) {
  return (
    <div className="glass p-4 relative">
      <div className="absolute -top-3 -left-3 text-3xl">✨</div>
      <p className="min-h-[3rem] leading-relaxed">{star.text}</p>
      <div className="mt-2 text-xs opacity-60">{new Date(star.date).toLocaleString()}</div>
      {onRemove && (
        <div className="mt-2 text-right">
          <button className="btn btn-ghost btn-xs rounded-full" onClick={() => onRemove(star.id)}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

