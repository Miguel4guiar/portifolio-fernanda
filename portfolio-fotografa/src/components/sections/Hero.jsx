import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useManagedPhotos } from '../../lib/useManagedPhotos.js';

export default function Hero() {
  const { photos } = useManagedPhotos();
  const [index, setIndex] = useState(0);

  // Prioriza fotos marcadas como "destaque na home"; completa com as demais
  // até formar um reel de até 5 imagens.
  const reel = useMemo(() => {
    if (photos.length === 0) return [];
    const featured = photos.filter((p) => p.featured);
    const rest = photos.filter((p) => !p.featured);
    return [...featured, ...rest].slice(0, 5);
  }, [photos]);

  useEffect(() => {
    if (reel.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % reel.length), 3200);
    return () => clearInterval(t);
  }, [reel.length]);

  if (reel.length === 0) return null;
  const current = reel[index % reel.length];

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-void">
      {/* Reel de fundo em loop */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={current.id}
            src={current.image}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/20" />
      </div>

      {/* Contador de frame no estilo folha de contato analógica */}
      <div className="absolute right-6 top-24 z-10 hidden font-mono text-xs text-smoke md:right-10 md:block">
        FRAME {String((index % reel.length) + 1).padStart(2, '0')} / {String(reel.length).padStart(2, '0')}
      </div>

      <div className="relative z-10 w-full px-4 pb-12 sm:px-6 sm:pb-16 md:px-10 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4 font-mono text-xs uppercase tracking-widest2 text-acid"
        >
          Fotografia Audiovisual — Rap · Trap · Pop
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-xl font-extrabold uppercase text-bone"
        >
          Cena <span className="text-stroke">Crua.</span>
          <br />
          Luz <span className="text-blood">Real.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-smoke/25 pt-6 md:flex-row md:items-end"
        >
          <p className="max-w-md font-body text-sm text-smoke">
            Registro de palco, bastidor e audiovisual — construindo o arquivo visual do rap, trap e
            do pop brasileiro
          </p>

          <button
            data-cursor="drag"
            onClick={() => {
              const el = document.querySelector('#galeria');
              if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -60 });
              else el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest2 text-bone"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-smoke/40 transition-colors group-hover:border-acid group-hover:text-acid">
              <ArrowDown size={18} />
            </span>
            Ver galeria
          </button>
        </motion.div>
      </div>
    </section>
  );
}
