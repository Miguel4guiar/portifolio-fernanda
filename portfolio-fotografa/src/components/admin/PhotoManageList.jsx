import { Trash2 } from 'lucide-react';

export default function PhotoManageList({ photos, onDelete }) {
  const uploaded = photos.filter((p) => p.uploadedByUser);

  if (uploaded.length === 0) {
    return (
      <p className="rounded border border-dashed border-smoke/30 px-4 py-8 text-center font-mono text-xs uppercase tracking-widest2 text-smoke">
        Você ainda não adicionou nenhuma foto por aqui.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {uploaded.map((photo) => (
        <li
          key={photo.id}
          className="flex items-center gap-4 border border-smoke/20 bg-void p-3"
        >
          <img
            src={photo.image}
            alt={photo.title}
            className="h-16 w-14 shrink-0 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-body text-sm text-bone">{photo.artist}</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-widest2 text-acid">
              {photo.category} · {photo.year}
              {photo.featured && ' · destaque'}
            </p>
          </div>
          <button
            onClick={() => onDelete(photo.id)}
            aria-label={`Remover foto de ${photo.artist}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-smoke transition-colors hover:text-blood"
          >
            <Trash2 size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
}
