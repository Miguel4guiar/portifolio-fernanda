import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Image as ImageIcon, Play, ArrowUpRight } from 'lucide-react';
import { useManagedPhotos } from '../../lib/useManagedPhotos.js';
import Lightbox from '../ui/Lightbox.jsx';

const FILTERS = [
  { id: 'all', label: 'Tudo' },
  { id: 'photo', label: 'Fotografia' },
  { id: 'video', label: 'Filmes & vídeos' },
];

export default function ArtistArchive() {
  const { photos, loading, error } = useManagedPhotos();
  const [filter, setFilter] = useState('all');
  const [activePhoto, setActivePhoto] = useState(null);

  const items = useMemo(() => photos.filter((photo) =>
    photo.showInArchive !== false && (photo.image || photo.videoUrl)
  ), [photos]);
  const filtered = useMemo(() => items.filter((photo) => {
    const isVideo = photo.mediaType === 'video' || Boolean(photo.videoUrl);
    if (filter === 'video') return isVideo;
    if (filter === 'photo') return !isVideo && Boolean(photo.image);
    return true;
  }), [items, filter]);

  const navigate = (direction) => {
    if (!activePhoto || filtered.length < 1) return;
    const index = filtered.findIndex((photo) => photo.id === activePhoto.id);
    setActivePhoto(filtered[(index + direction + filtered.length) % filtered.length]);
  };

  const videoCount = items.filter((photo) => photo.mediaType === 'video' || photo.videoUrl).length;
  const photoCount = items.length - videoCount;

  return (
    <section id="archive" className="relative overflow-hidden border-y border-smoke/20 bg-asphalt px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 grid gap-8 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.25em] text-acid">
              <span className="h-px w-8 bg-acid" /> Arquivo visual / 001
            </div>
            <h2 className="font-display text-display-lg font-extrabold uppercase leading-[.82] tracking-tight text-bone sm:text-[clamp(4rem,10vw,9rem)]">
              The <span className="text-stroke">Archive</span>
            </h2>
            <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-smoke sm:text-base">
              Frames, encontros e narrativas em movimento. Um acervo vivo entre fotografia, direção visual e imagem em movimento.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 border-t border-smoke/20 pt-4 md:min-w-[250px] md:border-l md:border-t-0 md:pl-6">
            <div><p className="font-mono text-[10px] uppercase tracking-widest2 text-smoke">Fotografias</p><p className="mt-1 font-display text-3xl text-bone">{String(photoCount).padStart(2, '0')}</p></div>
            <div><p className="font-mono text-[10px] uppercase tracking-widest2 text-smoke">Filmes</p><p className="mt-1 font-display text-3xl text-bone">{String(videoCount).padStart(2, '0')}</p></div>
          </div>
        </div>

        <div className="mb-7 flex flex-col justify-between gap-4 border-y border-smoke/20 py-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar acervo">
            {FILTERS.map((item) => (
              <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} onClick={() => setFilter(item.id)}
                className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-widest2 transition-all ${filter === item.id ? 'border-acid bg-acid text-void' : 'border-smoke/30 text-smoke hover:border-bone hover:text-bone'}`}>
                {item.label}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-smoke">{String(filtered.length).padStart(2, '0')} peças selecionadas</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4" aria-label="Carregando acervo">
            {Array.from({ length: 8 }, (_, index) => <div key={index} className="aspect-[3/4] animate-pulse bg-void/70" />)}
          </div>
        ) : error ? (
          <div role="status" className="border border-blood/30 px-6 py-12 text-center">
            <p className="font-display text-xl uppercase text-bone">Não foi possível carregar o Archive</p>
            <p className="mt-2 font-body text-sm text-smoke">Confira o Project ID, o dataset e os erros do Console do navegador.</p>
          </div>
        ) : filtered.length ? (
          <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item, index) => {
              const isVideo = item.mediaType === 'video' || Boolean(item.videoUrl);
              const visual = item.image || item.thumbnail || item.videoThumbnail;
              return (
                <motion.button type="button" layout key={item.id} onClick={() => setActivePhoto(item)}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: .45, delay: (index % 4) * .04 }}
                  data-cursor="view"
                  className={`group relative block aspect-[3/4] w-full overflow-hidden bg-void text-left ${index % 7 === 1 ? 'sm:aspect-[4/5]' : ''}`}>
                  {visual ? <img src={visual} alt={item.title || item.artist || 'Projeto visual'} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none'; }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /> : <div className="absolute inset-0 flex items-center justify-center bg-[#191919] text-smoke">{isVideo ? <Film size={36} strokeWidth={1} /> : <ImageIcon size={36} strokeWidth={1} />}</div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-void/95 via-void/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 z-10 flex items-center gap-2 border border-white/25 bg-void/45 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest2 text-white backdrop-blur-sm">
                    {isVideo ? <Play size={10} fill="currentColor" /> : <ImageIcon size={10} />} {isVideo ? 'Motion' : 'Still'} / {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-all group-hover:border-acid group-hover:bg-acid group-hover:text-void"><ArrowUpRight size={15} /></span>
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                    <p className="font-mono text-[9px] uppercase tracking-widest2 text-acid">{item.category || (isVideo ? 'Filme' : 'Fotografia')}{item.year ? ` · ${item.year}` : ''}</p>
                    <h3 className="mt-1 font-display text-xl font-bold uppercase leading-tight text-bone sm:text-2xl">{item.title || item.artist || 'Untitled project'}</h3>
                    {item.event && <p className="mt-1 font-body text-xs text-white/65">{item.event}</p>}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <div className="border border-dashed border-smoke/30 px-6 py-16 text-center">
            <p className="font-display text-2xl uppercase text-bone">O arquivo está em construção</p>
            <p className="mt-2 font-body text-sm text-smoke">Publique fotografias e filmes pelo Sanity Studio para construir seu acervo visual.</p>
          </div>
        )}
      </div>
      <Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} onPrev={() => navigate(-1)} onNext={() => navigate(1)} />
    </section>
  );
}
