import { motion } from 'framer-motion';
import portrait from '../../data/_P3_1145.jpg';

export default function About() {
  return <section id="sobre" className="editorial-section about-section">
    <div className="section-heading"><div><span className="eyebrow">03 / Sobre a artista</span><h2>About <i>Fernanda</i></h2></div><p>Um olhar sensível para<br/>o que acontece ao redor.</p></div>
    <div className="about-layout">
      <motion.div className="about-portrait" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}><img src={portrait} alt="Fernanda Opitacio" loading="lazy"/><span>FERNANDA OPITACIO — FOTÓGRAFA</span></motion.div>
      <div className="about-copy"><span className="eyebrow">Imagem · Cultura · Narrativa</span><p className="about-lead">A fotografia como uma forma de sentir, observar e contar histórias.</p><p>Fernanda Opitacio é diretora criativa atuando entre cultura, comunicação e imagem. Com base em São Paulo, desenvolve conceitos, campanhas e projetos que conectam narrativa, posicionamento e direção visual.</p><p>Seu trabalho investiga como ideias e narrativas ganham forma em imagem, linguagem e presença cultural, articulando estratégia criativa e construção estética em diferentes territórios da comunicação contemporânea.</p><a href="#contato" onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }); }}>Vamos conversar ↗</a></div>
    </div>
  </section>;
}
