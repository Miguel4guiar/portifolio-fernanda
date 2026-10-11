import { CATEGORIES } from '../../data/photos.js';

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoria">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest2 transition-all duration-300 ${
              isActive
                ? 'border-acid bg-acid text-void'
                : 'border-smoke/30 text-smoke hover:border-bone hover:text-bone'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
