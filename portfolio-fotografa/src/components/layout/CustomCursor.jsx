import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor customizado magnético. Escuta elementos com [data-cursor="view"|"drag"]
 * e expande o cursor com o texto correspondente.
 * Desativado automaticamente em dispositivos touch (coarse pointer).
 */
export default function CustomCursor() {
  const [label, setLabel] = useState('');
  const [isTouch, setIsTouch] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const overHandler = (e) => {
      const target = e.target.closest('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : '');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', overHandler);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', overHandler);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          width: label ? 88 : 10,
          height: label ? 88 : 10,
          backgroundColor: label ? '#CCFF00' : '#EDEDED',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="flex items-center justify-center rounded-full"
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-void">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
