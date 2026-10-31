import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useManagedPhotos } from '../../lib/useManagedPhotos.js';
import FilterTabs from '../ui/FilterTabs.jsx';
import PhotoCard from '../ui/PhotoCard.jsx';
import Lightbox from '../ui/Lightbox.jsx';

export default function Gallery() {
  const { photos, loading } = useManagedPhotos();
  const [category, setCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);
  const filtered = useMemo(() => (category === 'All' ? photos : photos.filter((p) => p.category === category)), [photos, category]);
  const navigate = (dir) => {
    if (!activePhoto || !filtered.length) return;
    const idx = filtered.findIndex((p) => p.id === activePhoto.id);
    setActivePhoto(filtered[(idx + dir + filtered.length) % filtered.length]);
  };
  return <section id="galeria" className="editorial-section work-section">
    <div className="section-heading"><div><span className="eyebrow">01 / Seleção de trabalhos</span><h2>Selected <i>work</i></h2></div><p>Imagens que guardam um instante,<br/>uma atmosfera, uma história.</p></div>
    <div className="gallery-toolbar"><span>{String(filtered.length).padStart(2, '0')} imagens</span><FilterTabs active={category} onChange={setCategory}/></div>
    {loading ? <div className="editorial-loading">Carregando arquivo...</div> : filtered.length ? <motion.div layout className="editorial-gallery">
      {filtered.map((photo, i) => <PhotoCard key={photo.id} photo={photo} index={i} onOpen={setActivePhoto}/>) }
    </motion.div> : <p className="empty-archive">As imagens publicadas no Sanity aparecerão aqui.</p>}
    <Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} onPrev={() => navigate(-1)} onNext={() => navigate(1)}/>
  </section>;
}
