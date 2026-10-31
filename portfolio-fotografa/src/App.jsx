import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Instagram, Mail, Arrow, X } from 'lucide-react';
import { useManagedPhotos } from './lib/useManagedPhotos.js';
import Lightbox from './components/ui/Lightbox.jsx';

const CATEGORIES = [
  { value: 'All', label: 'TODOS' },
  { value: 'TRAP / RAP', label: 'TRAP / RAP' },
  { value: 'POP', label: 'POP' },
  { value: 'BACKSTAGE', label: 'BACKSTAGE' },
  { value: 'EDITORIAL', label: 'EDITORIAL' },
];

export default function App() {
  const { photos, loading, error } = useManagedPhotos();
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('work');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const railRef = useRef(null);
  const dragRef = useRef({ x: 0, scrollLeft: 0 });
  const [dragging, setDragging] = useState(false);

  const visiblePhotos = useMemo(() => photos.filter((p) =>
    p.showInGallery !== false && (p.image || p.videoUrl) &&
    (category === 'All' || (p.category || '').toUpperCase() === category)
  ), [photos, category]);

  const navigate = (direction) => {
    if (!activePhoto || !visiblePhotos.length) return;
    const index = visiblePhotos.findIndex((p) => p.id === activePhoto.id);
    setActivePhoto(visiblePhotos[(index + direction + visiblePhotos.length) % visiblePhotos.length]);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const horizontalWheel = (event) => {
      if (window.innerWidth <= 900 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    };
    rail.addEventListener('wheel', horizontalWheel, { passive: false });
    return () => rail.removeEventListener('wheel', horizontalWheel);
  }, [view]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') { setActivePhoto(null); setMenuOpen(false); }
      if (activePhoto && event.key === 'ArrowRight') navigate(1);
      if (activePhoto && event.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePhoto, visiblePhotos]);

  const chooseCategory = (value) => {
    setCategory(value);
    setView('work');
    setMenuOpen(false);
    requestAnimationFrame(() => railRef.current?.scrollTo({ left: 0, behavior: 'smooth' }));
  };
  const chooseView = (value) => { setView(value); setMenuOpen(false); };
  const startDrag = (event) => {
    if (window.innerWidth <= 900 || !railRef.current || event.button !== 0) return;
    setDragging(true);
    dragRef.current = { x: event.pageX, scrollLeft: railRef.current.scrollLeft };
  };
  const moveDrag = (event) => {
    if (!dragging || !railRef.current) return;
    event.preventDefault();
    railRef.current.scrollLeft = dragRef.current.scrollLeft - (event.pageX - dragRef.current.x);
  };
  const stopDrag = () => setDragging(false);

  return (
    <main>
      <header className="sidebar">
        <button className="brand" type="button" onClick={() => chooseCategory('All')}>
          FESHOOTS
          <span>Fotografia &amp; direção criativa</span>
        </button>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
          {menuOpen ? 'Fechar ×' : 'Menu +'}
        </button>
        <div className={`sidebar-content ${menuOpen ? 'open' : ''}`}>
          <nav className="category-nav" aria-label="Categorias da galeria">
            {CATEGORIES.map((item) => (
              <button type="button" key={item.value} className={category === item.value && view === 'work' ? 'active' : ''} onClick={() => chooseCategory(item.value)}>{item.label}</button>
            ))}
          </nav>
          <nav className="page-nav" aria-label="Navegação">
            <button type="button" className={view === 'about' ? 'active' : ''} onClick={() => chooseView('about')}>Sobre</button>
            <button type="button" className={view === 'contact' ? 'active' : ''} onClick={() => chooseView('contact')}>Contato</button>
            <a href="mailto:fernandaopitacio@gmail.com">E-mail <ArrowUpRight size={12} /></a>
          </nav>
          <a className="instagram" href="https://www.instagram.com/feshoots" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a>
        </div>
        <div className="sidebar-footer">
          <span className="short-rule" />
          <p>Imagem, música e cultura contemporânea.</p>
          <p>© {new Date().getFullYear()} Feshoots<br />São Paulo, Brasil</p>
        </div>
      </header>

      {view === 'work' && (
        <div ref={railRef} className={`photo-rail ${dragging ? 'dragging' : ''}`}
          onMouseDown={startDrag} onMouseMove={moveDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
          <section className="intro-panel">
            <div className="intro-copy">
              <span>Portfólio selecionado · fotografia &amp; audiovisual</span>
              <h1>Feshoots<br /><em>Visual archive.</em></h1>
              <p>Registro de palco, bastidor e cultura. Um arquivo visual em constante movimento.</p>
            </div>
            <span className="scroll-cue">Arraste / role para o lado <b>→</b></span>
          </section>

          {loading && <div className="loading-panel">Carregando arquivo...</div>}
          {!loading && error && <div className="loading-panel">Não foi possível carregar as imagens. Verifique a conexão com o Sanity.</div>}
          {!loading && !error && visiblePhotos.map((photo, index) => {
            const isVideo = photo.mediaType === 'video' || Boolean(photo.videoUrl);
            const image = photo.image || photo.thumbnail || photo.videoThumbnail;
            return (
              <figure className={`photo-frame frame-${index % 3}`} key={photo.id}>
                <button type="button" onClick={() => setActivePhoto(photo)} aria-label={`Abrir ${photo.title || photo.artist || 'projeto'}`}>
                  {image ? <img src={image} alt={photo.title || photo.artist || 'Fotografia do portfólio'} draggable="false" loading={index > 2 ? 'lazy' : 'eager'} /> : <span className="no-image">{isVideo ? 'FILME' : 'IMAGEM'}</span>}
                  <span className="album-count">{isVideo ? 'FILME' : 'FOTOGRAFIA'}</span>
                  <span className="view-photo">Ver projeto ↗</span>
                </button>
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')} / {String(visiblePhotos.length).padStart(2, '0')}</span>
                  <strong>{photo.title || photo.artist || 'Projeto visual'}</strong>
                  <span>{photo.category || (isVideo ? 'Audiovisual' : 'Fotografia')} {photo.year ? `· ${photo.year}` : ''}</span>
                </figcaption>
              </figure>
            );
          })}
          {!loading && !error && visiblePhotos.length === 0 && (
            <div className="loading-panel">Nenhum projeto nesta categoria ainda.</div>
          )}
        </div>
      )}

      {view === 'about' && (
        <div className="section-view">
          <section className="text-panel about-panel" id="sobre">
            <span className="panel-index">01 / Sobre</span>
            <h2>Câmera na<br />primeira fila.</h2>
            <div className="panel-columns">
              <p>Fernanda Opitacio é diretora criativa atuando entre cultura, comunicação e imagem. Com base em São Paulo, desenvolve conceitos, campanhas e projetos que conectam narrativa, posicionamento e direção visual.</p>
              <p>Seu trabalho investiga como ideias e narrativas ganham forma em imagem, linguagem e presença cultural, articulando estratégia criativa e construção estética em diferentes territórios da comunicação contemporânea.</p>
            </div>
            <div className="clients">
              <span>Áreas de atuação</span>
              <p>Shows · Retratos · Editorial<br />Campanhas · Backstage · Filmes</p>
            </div>
          </section>
        </div>
      )}

      {view === 'contact' && (
        <div className="section-view">
          <section className="text-panel contact-panel" id="contato">
            <span className="panel-index">02 / Contato</span>
            <h2>Vamos criar<br />uma imagem<br />juntos?</h2>
            <a className="email-link" href="mailto:fernandaopitacio@gmail.com">fernandaopitacio@gmail.com <ArrowUpRight size={14} /></a>
            <div className="contact-social"><a href="https://www.instagram.com/feshoots" target="_blank" rel="noreferrer"><Instagram size={15} /> @feshoots</a></div>
            <p className="contact-note">Para projetos, campanhas, shows e trabalhos editoriais, entre em contato por e-mail.</p>
          </section>
        </div>
      )}

      <Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} onPrev={() => navigate(-1)} onNext={() => navigate(1)} />
    </main>
  );
}
