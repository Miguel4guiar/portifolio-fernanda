import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Instagram } from 'lucide-react';
import image from '../src/data/_P3_1145.jpg';
import { useManagedPhotos } from './lib/useManagedPhotos.js';
import Lightbox from './components/ui/Lightbox.jsx';
import logoFeshoots from '../src/data/logo-feshoots.png';

const CATEGORIES = [
  { value: 'All', label: 'TODOS' },
  { value: 'EDITORIAL', label: 'EDITORIAL' },
  { value: 'COMERCIAL', label: 'COMERCIAL' },
  { value: 'ENTRELINHAS', label: 'ENTRELINHAS' },
  { value: 'PROJETOS', label: 'PROJETOS' },
];

function getYouTubeThumb(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

export default function App() {
  const { photos, albums, projects, loading, error } = useManagedPhotos();

  // Controla a exibição da carta de introdução ao abrir o site
  const [introOpen, setIntroOpen] = useState(true);

  const [category, setCategory] = useState('All');
  const [view, setView] = useState('work');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeAlbum, setActiveAlbum] = useState(null);

  const railRef = useRef(null);
  const dragRef = useRef({ x: 0, scrollLeft: 0 });
  const [dragging, setDragging] = useState(false);

  const normalizeCategory = (value) =>
    (value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

  const categoryMatches = (value) =>
    category === 'All' ||
    normalizeCategory(value) === normalizeCategory(category);

  const visibleAlbums = useMemo(
    () =>
      category === 'PROJETOS'
        ? []
        : albums.filter((album) => categoryMatches(album.category)),
    [albums, category]
  );

  const visiblePhotos = useMemo(
    () =>
      category === 'PROJETOS'
        ? []
        : photos.filter((p) => {
            const videoLink = p.videoUrl || p.youtubeUrl || p.url || p.video;
            return (
              p.showInGallery !== false &&
              (p.image || videoLink) &&
              categoryMatches(p.category)
            );
          }),
    [photos, category]
  );

  const visibleProjects = useMemo(
    () => (category === 'All' || category === 'PROJETOS' ? projects : []),
    [projects, category]
  );

  const albumPhotos = activeAlbum?.photos || [];
  const lightboxPhotos = activeAlbum ? albumPhotos : visiblePhotos;

  const openAlbum = (album) => {
    setActiveAlbum(album);
    setActivePhoto(null);

    requestAnimationFrame(() => {
      railRef.current?.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    });
  };

  const navigate = (direction) => {
    if (!activePhoto || !lightboxPhotos.length) return;

    const index = lightboxPhotos.findIndex(
      (p) => p.id === activePhoto.id
    );

    setActivePhoto(
      lightboxPhotos[
        (index + direction + lightboxPhotos.length) %
          lightboxPhotos.length
      ]
    );
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const horizontalWheel = (event) => {
      if (
        introOpen ||
        window.innerWidth <= 900 ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    };

    rail.addEventListener('wheel', horizontalWheel, {
      passive: false,
    });

    return () => rail.removeEventListener('wheel', horizontalWheel);
  }, [view, introOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        if (introOpen) {
          setIntroOpen(false);
          return;
        }
        setActivePhoto(null);
        setActiveAlbum(null);
        setMenuOpen(false);
      }

      if (introOpen && (event.key === 'Enter' || event.key === ' ')) {
        setIntroOpen(false);
      }

      if (activePhoto && event.key === 'ArrowRight') {
        navigate(1);
      }

      if (activePhoto && event.key === 'ArrowLeft') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePhoto, lightboxPhotos, introOpen]);

  const chooseCategory = (value) => {
    setCategory(value);
    setView('work');
    setActiveAlbum(null);
    setActivePhoto(null);
    setMenuOpen(false);

    requestAnimationFrame(() => {
      railRef.current?.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    });
  };

  const chooseView = (value) => {
    setView(value);
    setActiveAlbum(null);
    setActivePhoto(null);
    setMenuOpen(false);
  };

  const startDrag = (event) => {
    if (
      introOpen ||
      window.innerWidth <= 900 ||
      !railRef.current ||
      event.button !== 0
    ) {
      return;
    }

    setDragging(true);
    dragRef.current = {
      x: event.pageX,
      scrollLeft: railRef.current.scrollLeft,
    };
  };

  const moveDrag = (event) => {
    if (!dragging || !railRef.current) return;
    event.preventDefault();
    railRef.current.scrollLeft =
      dragRef.current.scrollLeft - (event.pageX - dragRef.current.x);
  };

  const stopDrag = () => setDragging(false);

  return (
    <main>
      {/* CARTA DE INTRODUÇÃO AO ENTRAR NO SITE */}
      <AnimatePresence>
        {introOpen && (
          <motion.div
            key="intro-letter"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="intro-letter-overlay"
            onClick={() => setIntroOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Carta de apresentação"
          >
            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="intro-letter-card"
              onClick={(e) => {
                e.stopPropagation();
                setIntroOpen(false);
              }}
            >
              <div className="intro-letter-header">
                <img
                  src={logoFeshoots}
                  alt="Feshoots"
                  className="intro-letter-logo"
                />
                <span className="intro-letter-date">
                  SÃO PAULO · {new Date().getFullYear()}
                </span>
              </div>

              <span className="intro-letter-tag">CARTA ABERTA · ACERVO</span>

              <h1 className="intro-letter-title">
                Imagem, música e presença cultural.
              </h1>

              <div className="intro-letter-body">
                <p>
                  Este espaço reúne fragmentos de palco, retratos, campanhas e
                  narrativas visuais construídas entre a música e a cultura
                  contemporânea.
                </p>
                <p>
                  Cada registro nasce do olhar próximo — da primeira fila, dos
                  bastidores e das histórias que ganham forma através da direção
                  criativa e da fotografia.
                </p>
              </div>

              <div className="intro-letter-footer">
                <div className="intro-letter-signature">
                  <strong>Fernanda Opitacio</strong>
                  <span>Fotografia &amp; Direção Criativa</span>
                </div>

                <button
                  type="button"
                  className="intro-letter-enter"
                  onClick={() => setIntroOpen(false)}
                >
                  Abrir portfólio <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENU LATERAL */}
      <header className="sidebar">
        <button className="brand" onClick={() => chooseCategory('All')}>
          <img src={logoFeshoots} alt="Feshoots — Fotografia e direção criativa" />
          <span>Fotografia &amp; direção criativa</span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Fechar ×' : 'Menu +'}
        </button>

        <div className={`sidebar-content ${menuOpen ? 'open' : ''}`}>
          {/* CATEGORIAS EM CIMA (INCLUINDO PROJETOS) */}
          <nav className="category-nav" aria-label="Categorias da galeria">
            {CATEGORIES.map((item) => (
              <button
                type="button"
                key={item.value}
                className={
                  category === item.value && view === 'work' ? 'active' : ''
                }
                onClick={() => chooseCategory(item.value)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* PÁGINAS INSTITUCIONAIS EMBAIXO */}
          <nav className="page-nav" aria-label="Navegação">
            <button
              type="button"
              className={view === 'about' ? 'active' : ''}
              onClick={() => chooseView('about')}
            >
              Sobre
            </button>

            <button
              type="button"
              className={view === 'contact' ? 'active' : ''}
              onClick={() => chooseView('contact')}
            >
              Contato
            </button>
          </nav>
        </div>

        <div className="sidebar-footer">
          <span className="short-rule" />
          <p>Imagem, música e cultura contemporânea.</p>
          <p>
            © {new Date().getFullYear()} Feshoots
            <br />
            São Paulo, Brasil
          </p>
        </div>
      </header>

      {/* TRILHO HORIZONTAL (ÁLBUNS, FOTOS, VÍDEOS E PROJETOS) */}
      {view === 'work' && (
        <div
          ref={railRef}
          className={`photo-rail ${dragging ? 'dragging' : ''}`}
          onMouseDown={startDrag}
          onMouseMove={moveDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {loading && (
            <div className="loading-panel">Carregando arquivo...</div>
          )}

          {!loading && error && (
            <div className="loading-panel">
              Não foi possível carregar as imagens. Verifique a conexão com o Sanity.
            </div>
          )}

          {/* CAPAS DOS ÁLBUNS */}
          {!loading &&
            !error &&
            !activeAlbum &&
            visibleAlbums.length > 0 &&
            visibleAlbums.map((album, index) => (
              <figure
                className={`photo-frame frame-${index % 3} album-cover-frame`}
                key={album.id}
              >
                <button
                  type="button"
                  onClick={() => openAlbum(album)}
                  aria-label={`Abrir álbum ${album.title}`}
                >
                  <img
                    src={album.cover}
                    alt={`Capa do álbum ${album.title}`}
                    draggable="false"
                    loading={index > 2 ? 'lazy' : 'eager'}
                  />

                  <span className="album-count">
                    {album.photos.length}{' '}
                    {album.photos.length === 1 ? 'ITEM' : 'ITENS'}
                  </span>

                  <span className="view-photo">Abrir álbum ↗</span>
                </button>

                <figcaption>
                  <span>
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(visibleAlbums.length).padStart(2, '0')}
                  </span>
                  <strong>{album.title}</strong>
                  <span>
                    {album.category}
                    {album.year ? ` · ${album.year}` : ''}
                  </span>
                </figcaption>
              </figure>
            ))}

          {/* FOTOS E VÍDEOS DENTRO DO ÁLBUM */}
          {!loading &&
            !error &&
            activeAlbum &&
            albumPhotos.map((photo, index) => {
              const videoLink =
                photo.videoUrl || photo.youtubeUrl || photo.url || photo.video;
              const isVideo = photo.mediaType === 'video' || Boolean(videoLink);
              const photoImage =
                photo.image ||
                photo.thumbnail ||
                photo.videoThumbnail ||
                getYouTubeThumb(videoLink);

              return (
                <figure
                  className={`photo-frame frame-${index % 3}`}
                  key={photo.id}
                >
                  <button
                    type="button"
                    onClick={() => setActivePhoto(photo)}
                    aria-label={`Ampliar ${photo.title || activeAlbum.title}`}
                  >
                    {photoImage ? (
                      <img
                        src={photoImage}
                        alt={photo.title || activeAlbum.title}
                        draggable="false"
                        loading={index > 2 ? 'lazy' : 'eager'}
                      />
                    ) : (
                      <span className="no-image">VÍDEO</span>
                    )}

                    {isVideo && <span className="album-count">VÍDEO ▶</span>}

                    <span className="view-photo">
                      {isVideo ? 'Assistir ↗' : 'Ampliar ↗'}
                    </span>
                  </button>

                  <figcaption>
                    <span>
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {String(albumPhotos.length).padStart(2, '0')}
                    </span>
                    <strong>{photo.title || activeAlbum.title}</strong>
                    <span>{photo.year || activeAlbum.year || ''}</span>
                  </figcaption>
                </figure>
              );
            })}

          {/* FOTOS E VÍDEOS AVULSOS */}
          {!loading &&
            !error &&
            !activeAlbum &&
            visiblePhotos.length > 0 &&
            visiblePhotos.map((photo, index) => {
              const videoLink =
                photo.videoUrl || photo.youtubeUrl || photo.url || photo.video;
              const isVideo =
                photo.mediaType === 'video' || Boolean(videoLink);

              const photoImage =
                photo.image ||
                photo.thumbnail ||
                photo.videoThumbnail ||
                getYouTubeThumb(videoLink);

              return (
                <figure
                  className={`photo-frame frame-${index % 3}`}
                  key={photo.id}
                >
                  <button
                    type="button"
                    onClick={() => setActivePhoto(photo)}
                    aria-label={`Ampliar ${
                      photo.title || photo.artist || 'projeto'
                    }`}
                  >
                    {photoImage ? (
                      <img
                        src={photoImage}
                        alt={
                          photo.title ||
                          photo.artist ||
                          'Fotografia do portfólio'
                        }
                        draggable="false"
                        loading={index > 2 ? 'lazy' : 'eager'}
                      />
                    ) : (
                      <span className="no-image">
                        {isVideo ? 'FILME' : 'IMAGEM'}
                      </span>
                    )}

                    <span className="album-count">
                      {isVideo ? 'FILME ▶' : 'FOTOGRAFIA'}
                    </span>

                    <span className="view-photo">
                      {isVideo ? 'Assistir ↗' : 'Ampliar ↗'}
                    </span>
                  </button>

                  <figcaption>
                    <span>
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {String(visiblePhotos.length).padStart(2, '0')}
                    </span>

                    <strong>
                      {photo.title || photo.artist || 'Projeto visual'}
                    </strong>

                    <span>
                      {photo.category || 'Fotografia'}
                      {photo.year ? ` · ${photo.year}` : ''}
                    </span>
                  </figcaption>
                </figure>
              );
            })}

          {/* SLIDES DE PROJETOS NO MESMO TRILHO HORIZONTAL */}
          {!loading &&
            !error &&
            !activeAlbum &&
            visibleProjects.length > 0 &&
            visibleProjects.map((project, index) => (
              <article className="project-slide" key={project.id}>
                <div className="project-slide-inner">
                  <div className="project-slide-media">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        draggable="false"
                        loading={index > 1 ? 'lazy' : 'eager'}
                      />
                    )}
                  </div>

                  <div className="project-slide-copy">
                    <span className="project-meta">
                      PROJETO · {String(index + 1).padStart(2, '0')} /{' '}
                      {String(visibleProjects.length).padStart(2, '0')}
                      {project.subtitle ? ` · ${project.subtitle}` : ''}
                    </span>

                    <h3>{project.title}</h3>

                    {project.description && (
                      <div className="project-slide-text">
                        <p>{project.description}</p>
                      </div>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="email-link"
                      >
                        Acessar projeto <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}

          {/* MENSAGEM QUANDO NÃO EXISTIREM ITENS */}
          {!loading &&
            !error &&
            ((activeAlbum && albumPhotos.length === 0) ||
              (!activeAlbum &&
                visibleAlbums.length === 0 &&
                visiblePhotos.length === 0 &&
                visibleProjects.length === 0)) && (
              <div className="loading-panel">
                Nenhum projeto nesta categoria ainda.
              </div>
            )}
        </div>
      )}

      {/* SOBRE */}
      {view === 'about' && (
        <div className="section-view">
          <section className="text-panel about-panel" id="sobre">
            <div className="about-layout">
              <div className="about-portrait">
                <img
                  src={image}
                  alt="Retrato de Fernanda Opitacio"
                  loading="lazy"
                />
              </div>

              <div className="about-copy">
                <span className="panel-index">01 / Sobre</span>

                <h2>
                  Câmera na
                  <br />
                  primeira fila.
                </h2>

                <div className="panel-columns">
                  <p>
                    Fernanda Opitacio é diretora criativa atuando entre
                    cultura, comunicação e imagem. Com base em São Paulo,
                    desenvolve conceitos, campanhas e projetos que conectam
                    narrativa, posicionamento e direção visual.
                  </p>

                  <p>
                    Seu trabalho investiga como ideias e narrativas ganham
                    forma em imagem, linguagem e presença cultural,
                    articulando estratégia criativa e construção estética em
                    diferentes territórios da comunicação contemporânea.
                  </p>
                </div>

                <div className="clients">
                  <span>Áreas de atuação</span>
                  <p>
                    Shows · Retratos · Editorial
                    <br />
                    Campanhas · Backstage · Filmes
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CONTATO */}
      {view === 'contact' && (
        <div className="section-view">
          <section className="text-panel contact-panel" id="contato">
            <span className="panel-index">02 / Contato</span>

            <h2>
              Vamos criar
              <br />
              uma imagem
              <br />
              juntos?
            </h2>

            <a
              className="email-link"
              href="mailto:fernandaopitacio@gmail.com"
            >
              fernandaopitacio@gmail.com
              <ArrowUpRight size={14} />
            </a>

            <div className="contact-social">
              <a
                href="https://www.instagram.com/feshoots"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={15} />
                @feshoots
              </a>
            </div>

            <p className="contact-note">
              Para projetos, campanhas, shows e trabalhos editoriais, entre em
              contato por e-mail.
            </p>
          </section>
        </div>
      )}

      {/* LIGHTBOX */}
      <Lightbox
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
      />
    </main>
  );
}