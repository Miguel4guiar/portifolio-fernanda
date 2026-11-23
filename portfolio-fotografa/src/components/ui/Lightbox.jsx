import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function Lightbox({ photo, onClose, onPrev, onNext }) {
  const photoImage = photo?.image || photo?.thumbnail || photo?.videoThumbnail;
  const videoLink = photo?.videoUrl || photo?.videoAsset || photo?.youtubeUrl || photo?.url;
  const youtubeId = getYouTubeId(videoLink);

  return (
    <Dialog.Root open={!!photo} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {photo && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80] bg-void/90 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[81] flex h-[100svh] flex-col items-center justify-center gap-4 px-10 py-14 sm:gap-6 sm:px-16 md:px-24"
              >
                <Dialog.Title className="sr-only">
                  {photo.title || photo.artist}
                </Dialog.Title>

                {/* Botão Fechar */}
                <Dialog.Close asChild>
                  <button
                    aria-label="Fechar"
                    className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center text-smoke transition-colors hover:text-acid sm:right-6 sm:top-6"
                  >
                    <X size={24} className="sm:hidden" />
                    <X size={28} className="hidden sm:block" />
                  </button>
                </Dialog.Close>

                {/* Seta Anterior */}
                <button
                  onClick={onPrev}
                  aria-label="Anterior"
                  className="absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-smoke transition-colors hover:text-acid sm:left-3 md:left-8"
                >
                  <ChevronLeft size={26} className="sm:hidden" />
                  <ChevronLeft size={34} className="hidden sm:block" />
                </button>

                {/* Seta Próxima */}
                <button
                  onClick={onNext}
                  aria-label="Próximo"
                  className="absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-smoke transition-colors hover:text-acid sm:right-3 md:right-8"
                >
                  <ChevronRight size={26} className="sm:hidden" />
                  <ChevronRight size={34} className="hidden sm:block" />
                </button>

                {/* Container da Mídia com altura controlada para nunca invadir o texto */}
                <div className="flex min-h-0 w-full max-w-4xl flex-1 items-center justify-center overflow-hidden">
                  {youtubeId ? (
                    <div className="aspect-video max-h-full w-full max-w-[min(100%,calc(56svh*16/9))] overflow-hidden bg-black shadow-2xl">
                      <iframe
                        key={youtubeId}
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
                        title={photo.title || 'Vídeo'}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : videoLink ? (
                    <video
                      key={videoLink}
                      src={videoLink}
                      poster={photoImage}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-full max-w-full bg-black object-contain shadow-2xl"
                    />
                  ) : (
                    <motion.img
                      key={photo.id}
                      src={photoImage}
                      alt={`${photo.title || ''} — ${photo.artist || ''}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                {/* Área da Legenda alinhada com a mesma largura máxima do player */}
                <div className="w-full max-w-4xl shrink-0 border-t border-smoke/20 pt-3 font-mono text-smoke sm:pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[11px] uppercase tracking-wider sm:text-xs">
                    <span className="font-bold text-bone">
                      {photo.artist || photo.title}
                    </span>
                    {photo.year && (
                      <span className="text-acid">{photo.year}</span>
                    )}
                  </div>

                  {(photo.event || photo.description || photo.caption || (photo.artist && photo.title)) && (
                    <div className="lightbox-scroll mt-2 max-h-[22svh] overflow-y-auto pr-3 text-left text-xs leading-relaxed text-smoke/90 sm:max-h-[20svh] sm:text-[13px]">
                      {photo.artist && photo.title && (
                        <p className="font-bold text-bone/90">{photo.title}</p>
                      )}
                      {photo.event && <p>{photo.event}</p>}
                      {(photo.description || photo.caption) && (
                        <p className="mt-1 whitespace-pre-line">
                          {photo.description || photo.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}