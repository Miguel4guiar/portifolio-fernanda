import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PhotoCard({ photo, index, onOpen, onDelete }) {
  return <motion.article className={`editorial-photo-card photo-position-${index % 6}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: (index % 3) * .06 }}>
    <button className="editorial-photo-button" onClick={() => onOpen(photo)} data-cursor="view" aria-label={`Abrir ${photo.title || photo.artist}`}>
      <img src={photo.image} alt={`${photo.title || photo.artist || 'Fotografia'}${photo.event ? ` — ${photo.event}` : ''}`} loading="lazy" decoding="async"/>
      <span className="photo-open-icon"><ArrowUpRight size={18}/></span>
    </button>
    <div className="photo-caption"><span>{photo.title || photo.artist || 'Untitled'}</span><small>{photo.category || 'Fotografia'}{photo.year ? ` · ${photo.year}` : ''}</small></div>
    {onDelete && <button onClick={() => onDelete(photo.id)} className="photo-delete" aria-label="Excluir fotografia">Excluir</button>}
  </motion.article>;
}
