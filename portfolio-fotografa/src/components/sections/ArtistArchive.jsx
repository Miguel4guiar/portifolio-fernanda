import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, ArrowUpRight } from 'lucide-react';
import { useManagedPhotos } from '../../lib/useManagedPhotos.js';
import Lightbox from '../ui/Lightbox.jsx';

export default function ArtistArchive() {
  const { photos, loading } = useManagedPhotos();
  const [activePhoto, setActivePhoto] = useState(null);
  const items = useMemo(() => photos.filter((p) => p.showInArchive !== false && (p.image || p.videoUrl)), [photos]);
  const films = items.filter((p) => p.mediaType === 'video' || p.videoUrl);
  const navigate = (dir) => { const i = films.findIndex((p) => p.id === activePhoto?.id); if (i >= 0) setActivePhoto(films[(i + dir + films.length) % films.length]); };
  return <section id="archive" className="editorial-section archive-section">
    <div className="section-heading"><div><span className="eyebrow">02 / Imagem em movimento</span><h2>The <i>archive</i></h2></div><p>Filmes, registros e projetos<br/>em movimento.</p></div>
    <div className="archive-intro"><span>{String(films.length).padStart(2, '0')} FILMES</span><span>Motion pictures / Visual stories</span></div>
    {loading ? <div className="editorial-loading">Carregando filmes...</div> : films.length ? <div className="films-grid">{films.map((item, index) => <motion.button key={item.id} className="film-card" onClick={() => setActivePhoto(item)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
      <span className="film-image">{(item.image || item.thumbnail || item.videoThumbnail) ? <img src={item.image || item.thumbnail || item.videoThumbnail} alt={item.title || 'Filme'} loading="lazy"/> : <span className="film-placeholder"><Film size={30}/></span>}<span className="film-play"><Play size={17} fill="currentColor"/></span></span>
      <span className="film-meta"><span>{item.title || item.artist || 'Untitled film'}</span><small>{item.year || 'FESHOOTS'} <ArrowUpRight size={13}/></small></span>
    </motion.button>)}</div> : <p className="empty-archive">Os filmes publicados pelo Sanity serão exibidos nesta seção.</p>}
    <Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} onPrev={() => navigate(-1)} onNext={() => navigate(1)}/>
  </section>;
}
