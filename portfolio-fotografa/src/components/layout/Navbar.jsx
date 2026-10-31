import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Instagram, ArrowUpRight } from 'lucide-react';

const LINKS = [
  { label: 'Trabalhos', href: '#galeria' },
  { label: 'Arquivo', href: '#archive' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return <>
    <header className="editorial-nav">
      <a className="brand-mark" href="#top" onClick={(e) => { e.preventDefault(); go('#top'); }}>FESHOOTS<span>®</span></a>
      <nav className="desktop-links" aria-label="Navegação principal">
        {LINKS.map((item) => <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); go(item.href); }}>{item.label}</a>)}
      </nav>
      <a className="nav-instagram" href="https://www.instagram.com/feshoots" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a>
      <button className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu size={23}/></button>
    </header>
    <AnimatePresence>
      {open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Fechar menu"><X size={26}/></button>
        <span className="mobile-menu-label">FESHOOTS — MENU</span>
        {LINKS.map((item, i) => <motion.a key={item.href} href={item.href} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }} onClick={(e) => { e.preventDefault(); go(item.href); }}>{item.label}</motion.a>)}
        <a className="mobile-social" href="https://www.instagram.com/feshoots" target="_blank" rel="noreferrer">Instagram ↗</a>
      </motion.div>}
    </AnimatePresence>
  </>;
}
