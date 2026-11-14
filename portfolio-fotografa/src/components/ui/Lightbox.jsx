import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Modal em tela cheia com Radix Dialog e Framer Motion.
 * Exibe a imagem em destaque junto com a legenda completa de forma responsiva.
 */
export default function Lightbox({ photo, onClose, onPrev, onNext }) {
  const photoImage = photo?.image || photo?.thumbnail || photo?.videoThumbnail;

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
                className="fixed inset-0 z-[80] bg-[var(--ink)]/90 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6 md:p-10"
              >
                <Dialog.Title className="sr-only">
                  {photo.title || photo.artist || 'Visualizar fotografia'}
                </Dialog.Title>

                {/* Botão Fechar */}
                <Dialog.Close asChild>
                  <button
                    aria-label="Fechar"
                    className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center text-[var(--paper)] bg-[var(--ink)]/60 transition-colors hover:text-[var(--rose)] sm:right-6 sm:top-6"
                  >
                    <X size={24} />
                  </button>
                </Dialog.Close>

                {/* Setas de Navegação */}
                <button
                  onClick={onPrev}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 z-25 -translate-y-1/2 flex h-12 w-12 items-center justify-center text-[var(--paper)] bg-[var(--ink)]/60 transition-colors hover:text-[var(--rose)] md:left-6"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  onClick={onNext}
                  aria-label="Próxima foto"
                  className="absolute right-3 top-1/2 z-25 -translate-y-1/2 flex h-12 w-12 items-center justify-center text-[var(--paper)] bg-[var(--ink)]/60 transition-colors hover:text-[var(--rose)] md:right-6"
                >
                  <ChevronRight size={28} />
                </button>

                {/* Card Container: Responsivo (Coluna no mobile, Lado a lado no Desktop) */}
                <div 
                  className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden bg-[var(--paper)] p-5 shadow-2xl md:flex-row md:items-center md:gap-8 md:p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Área da Imagem */}
                  <div className="flex h-[45vh] w-full items-center justify-center overflow-hidden bg-[var(--sage)]/20 md:h-[70vh] md:w-3/5">
                    {photoImage ? (
                      <motion.img
                        key={photo.id}
                        src={photoImage}
                        alt={`${photo.title || ''} — ${photo.artist || ''}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="font-mono text-xs uppercase text-[var(--wine)]">Sem imagem</span>
                    )}
                  </div>

                  {/* Área do Texto / Legenda (Fonte Space Mono e Responsiva) */}
                  <div className="mt-5 flex flex-col justify-center md:mt-0 md:w-2/5">
                    <span className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
                      {photo.category || photo.event || 'Feshoots Archive'} {photo.year ? `· ${photo.year}` : ''}
                    </span>

                    <h3 className="font-mono text-base font-bold uppercase leading-snug text-[var(--ink)] sm:text-lg">
                      {photo.title || photo.artist || 'Projeto Visual'}
                    </h3>

                    {photo.artist && photo.title && (
                      <p className="mt-1 font-mono text-xs text-[var(--wine)]">
                        {photo.artist}
                      </p>
                    )}

                    {photo.description && (
                      <p className="mt-3 font-mono text-xs leading-relaxed text-[var(--muted)]">
                        {photo.description}
                      </p>
                    )}

                    <div className="mt-6 border-t border-[var(--ink)]/10 pt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">
                      <span>{photo.year || '2026'}</span>
                      <span className="text-[var(--wine)] font-bold">Feshoots</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}