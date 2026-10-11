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

  const filtered = useMemo(
    () => (category === 'All' ? photos : photos.filter((p) => p.category === category)),
    [photos, category]
  );

  const navigate = (dir) => {
    const idx = filtered.findIndex((p) => p.id === activePhoto.id);
    const next = (idx + dir + filtered.length) % filtered.length;
    setActivePhoto(filtered[next]);
  };

  return (
    <section id="galeria" className="bg-void px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest2 text-acid">Arquivo 01</span>
            <h2 className="mt-3 break-words font-display text-display-lg font-extrabold uppercase text-bone">
              Galeria
            </h2>
          </div>
          <FilterTabs active={category} onChange={setCategory} />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse bg-asphalt" />
            ))}
          </div>
        ) : (
          <motion.div layout className="columns-1 gap-3 xs:columns-2 sm:gap-4 md:columns-3 lg:columns-4">
            {filtered.map((photo, i) => (
              <PhotoCard key={photo.id} photo={photo} index={i} onOpen={setActivePhoto} />
            ))}
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="py-20 text-center font-mono text-sm text-smoke">
            Nenhum registro nesta categoria ainda.
          </p>
        )}
      </div>

      <Lightbox
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
      />
    </section>
  );
}
