export type DiaryEntry = {
  id: string
  date: string
  title: string
  mood?: string
  content: string
}

export default function DiaryCard({ entry, onDelete }: { entry: DiaryEntry; onDelete?: (id: string) => void }) {
  return (
    <article className="card glass overflow-hidden">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="card-title text-rose-500">{entry.title}</h3>
          <div className="text-sm opacity-70">{new Date(entry.date).toLocaleString()}</div>
        </div>
        {entry.mood && (
          <div className="badge badge-secondary badge-outline">{entry.mood}</div>
        )}
        <p className="leading-relaxed whitespace-pre-wrap">{entry.content}</p>
        <div className="card-actions justify-end">
          {onDelete && (
            <button className="btn btn-error btn-sm rounded-full" onClick={() => onDelete(entry.id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

