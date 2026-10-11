import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Modal em tela cheia, fundo translúcido escuro, navegação entre frames.
 * Radix Dialog garante foco preso (focus trap), fechamento via ESC e
 * atributos ARIA corretos out-of-the-box.
 */
export default function Lightbox({ photo, onClose, onPrev, onNext }) {
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
                className="fixed inset-0 z-[81] flex flex-col items-center justify-center p-4 pt-16 sm:p-8 md:p-12"
              >
                <Dialog.Title className="sr-only">
                  {photo.title} — {photo.artist}
                </Dialog.Title>

                <Dialog.Close asChild>
                  <button
                    aria-label="Fechar"
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-smoke transition-colors hover:text-acid sm:right-6 sm:top-6"
                  >
                    <X size={24} className="sm:hidden" />
                    <X size={28} className="hidden sm:block" />
                  </button>
                </Dialog.Close>

                <button
                  onClick={onPrev}
                  aria-label="Foto anterior"
                  className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-smoke transition-colors hover:text-acid sm:left-3 md:left-8"
                >
                  <ChevronLeft size={26} className="sm:hidden" />
                  <ChevronLeft size={34} className="hidden sm:block" />
                </button>
                <button
                  onClick={onNext}
                  aria-label="Próxima foto"
                  className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-smoke transition-colors hover:text-acid sm:right-3 md:right-8"
                >
                  <ChevronRight size={26} className="sm:hidden" />
                  <ChevronRight size={34} className="hidden sm:block" />
                </button>

                <motion.img
                  key={photo.id}
                  src={photo.image}
                  alt={`${photo.title} — ${photo.artist}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-h-[62svh] w-auto max-w-[85vw] object-contain sm:max-h-[70svh] md:max-h-[75svh] md:max-w-full"
                />

                <div className="mt-4 flex w-full max-w-2xl flex-col items-center gap-1 border-t border-smoke/20 pt-4 text-center font-mono text-[11px] uppercase tracking-widest2 text-smoke sm:mt-6 sm:flex-row sm:justify-between sm:text-left sm:text-xs">
                  <span className="text-bone">{photo.artist}</span>
                  <span>{photo.event}</span>
                  <span className="text-acid">{photo.year}</span>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
