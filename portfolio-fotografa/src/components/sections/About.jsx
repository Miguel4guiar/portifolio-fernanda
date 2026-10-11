import { motion } from 'framer-motion';
import image from '../../data/_P3_1145.jpg';
const PRESS = ['Rolling Stone BR', 'Complexo Magazine', 'Revista Vibe', 'Trap Nation'];
const CLIENTS = ['Warner Music', 'Sony Music BR', 'Popload Festival', 'Rock in Rio', 'Sommos'];

export default function About() {
  return (
    <section id="sobre" className="bg-void px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-10 sm:gap-14 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden bg-asphalt"
        >
          <img
            src={image}
            alt="Retrato editorial da fotógrafa"
            loading="lazy"
            className="h-full w-full object-cover grayscale"
          />
        </motion.div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest2 text-acid">Sobre</span>
          <h2 className="mb-6 mt-3 break-words font-display text-display-lg font-extrabold uppercase leading-[0.95] text-bone">
            Câmera na
            <br /> primeira fila.
          </h2>
          <p className="max-w-md font-body text-base leading-relaxed text-smoke">
            Fernanda Opitacio é diretora criativa atuando entre cultura, comunicação e imagem.
            Com base em São Paulo, desenvolve conceitos, campanhas e projetos que conectam narrativa, posicionamento e direção visual.
            Seu trabalho investiga como ideias e narrativas ganham forma em imagem, linguagem e presença cultural, articulando estratégia criativa e construção estética em diferentes territórios da comunicação contemporânea.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:mt-10 sm:gap-8">
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest2 text-smoke">
                Publicações
              </h3>
              <ul className="space-y-2">
                {PRESS.map((p) => (
                  <li key={p} className="font-body text-sm text-bone">{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest2 text-smoke">
                Clientes
              </h3>
              <ul className="space-y-2">
                {CLIENTS.map((c) => (
                  <li key={c} className="font-body text-sm text-bone">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
