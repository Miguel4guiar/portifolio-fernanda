import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useManagedPhotos } from '../../lib/useManagedPhotos.js';

export default function Hero() {
  const { photos } = useManagedPhotos();
  const featured = useMemo(() => {
    const available = photos.filter((p) => p.image && p.mediaType !== 'video');
    return available.find((p) => p.featured) || available[0];
  }, [photos]);
  return <section id="top" className="editorial-hero">
    <div className="hero-topline"><span>Fotografia · Direção visual · Cinema</span><span>São Paulo, Brasil&nbsp;&nbsp; — &nbsp;&nbsp;2026</span></div>
    <div className="hero-title-wrap">
      <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="hero-kicker">Um arquivo de imagens e sensações</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [.2, .8, .2, 1] }}>FESHOOTS<span>®</span></motion.h1>
      <motion.div className="hero-caption" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45, duration: .8 }}>
        <p>Fotografias, histórias e fragmentos de momentos. Um olhar sobre música, pessoas e cultura.</p>
        <a href="#galeria" onClick={(e) => { e.preventDefault(); document.querySelector('#galeria')?.scrollIntoView({ behavior: 'smooth' }); }}>Explorar trabalhos <ArrowDownRight size={17}/></a>
      </motion.div>
    </div>
    <motion.div className="hero-image-frame" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: 1 }}>
      {featured?.image ? <img src={featured.image} alt={featured.title || 'Fotografia em destaque'} fetchPriority="high"/> : <div className="hero-image-placeholder"><span>FESHOOTS</span><small>IMAGEM EM DESTAQUE</small></div>}
      <span className="hero-image-note">{featured?.title || 'Selected image'}{featured?.year ? ` / ${featured.year}` : ''}</span>
    </motion.div>
    <div className="hero-bottomline"><span>01 — PORTFÓLIO</span><span>Scroll para descobrir ↓</span><span>FESHOOTS ©</span></div>
  </section>;
}
