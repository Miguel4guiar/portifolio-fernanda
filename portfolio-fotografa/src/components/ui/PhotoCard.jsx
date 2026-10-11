import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

/**
 * Item da grid masonry. Lazy loading nativo (loading="lazy") já que o hero
 * cobre o LCP. Hover em desktop: preto e branco -> colorido + zoom.
 * Em touch, as informações ficam sempre visíveis (sem depender de hover).
 */
export default function PhotoCard({ photo, index, onOpen, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-3 break-inside-avoid sm:mb-4"
    >
      <button
        onClick={() => onOpen(photo)}
        data-cursor="view"
        className="relative block w-full overflow-hidden bg-asphalt text-left"
      >
        <img
          src={photo.image}
          alt={`${photo.title} — ${photo.artist}, ${photo.event}`}
          loading="lazy"
          decoding="async"
          className="w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-active:scale-105"
        />
        {/* Marcação estilo folha de contato 35mm */}
        <div className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-widest2 text-bone/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-3 sm:top-3 sm:text-[10px]">
          {photo.id.replace('ph-', 'F.').replace('up-', 'F.')}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-void/95 via-void/10 to-void/0 opacity-90 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-3 transition-all duration-400 sm:translate-y-3 sm:p-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <p className="font-display text-base font-bold uppercase text-bone sm:text-lg">{photo.artist}</p>
          <p className="font-mono text-[9px] uppercase tracking-widest2 text-acid sm:text-[10px]">
            {photo.category} · {photo.year}
          </p>
        </div>
      </button>

      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(photo.id); }}
          aria-label={`Remover foto ${photo.title}`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-bone opacity-100 backdrop-blur transition-colors hover:bg-blood hover:text-bone sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      )}
    </motion.div>
  );
}
