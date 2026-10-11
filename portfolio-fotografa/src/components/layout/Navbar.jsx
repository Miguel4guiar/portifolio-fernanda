import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Instagram, Mail } from 'lucide-react';

const LINKS = [
  { label: 'Galeria', href: '#galeria' },
  { label: 'Archive', href: '#archive' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24));

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -80 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'border-b border-smoke/15 bg-void/60 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10">
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); scrollTo('#top'); }}
            className="font-display text-xl font-extrabold uppercase tracking-tightest"
            data-cursor="view"
          >
            Fe<span className="text-acid">shoo</span>ts
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="font-mono text-xs uppercase tracking-widest2 text-smoke transition-colors hover:text-bone"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <a href="mailto:booking@raiofotografia.com" aria-label="E-mail" className="text-smoke transition-colors hover:text-acid">
              <Mail size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-smoke transition-colors hover:text-acid">
              <Instagram size={18} />
            </a>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center text-bone md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-void p-6 md:hidden"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="flex h-11 w-11 items-center justify-center text-bone"
              >
                <X size={28} />
              </button>
            </div>
            <ul className="mt-12 flex flex-1 flex-col justify-center gap-7">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-display text-4xl font-bold uppercase text-bone xs:text-5xl"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center gap-6 border-t border-smoke/20 pt-6">
              <a href="mailto:booking@raiofotografia.com" aria-label="E-mail" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-smoke">
                <Mail size={16} /> E-mail
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-smoke">
                <Instagram size={16} /> Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
