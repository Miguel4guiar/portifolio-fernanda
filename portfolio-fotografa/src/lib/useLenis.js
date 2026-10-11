import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Inicializa o Lenis para smooth/momentum scroll em toda a aplicação.
 * Respeita prefers-reduced-motion não forçando duração longa demais.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expõe globalmente para permitir scrollTo() a partir de qualquer componente
    window.__lenis = lenis;

    return () => lenis.destroy();
  }, []);
}
