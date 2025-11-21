export type Photo = {
  id: string
  url: string
  caption?: string
}

export default function PhotoItem({ photo, onRemove }: { photo: Photo; onRemove?: (id: string) => void }) {
  return (
    <div className="glass overflow-hidden">
      <figure className="aspect-square overflow-hidden">
        <img src={photo.url} alt={photo.caption || 'Photo'} className="h-full w-full object-cover" />
      </figure>
      <div className="p-3 flex items-center justify-between">
        <div className="opacity-80 text-sm truncate pr-2">{photo.caption || '—'}</div>
        {onRemove && (
          <button className="btn btn-ghost btn-xs rounded-full" onClick={() => onRemove(photo.id)}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

