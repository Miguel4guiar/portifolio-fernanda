import { Instagram, Mail, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return <section id="contato" className="editorial-section contact-section">
    <span className="eyebrow">04 / Contato & projetos</span>
    <h2>Have a <i>story?</i></h2>
    <p className="contact-intro">Para projetos, colaborações, editoriais e trabalhos audiovisuais, entre em contato.</p>
    <a className="contact-email" href="mailto:fernandaopitacio@gmail.com">fernandaopitacio@gmail.com <ArrowUpRight size={23}/></a>
    <div className="contact-bottom"><a href="https://www.instagram.com/feshoots" target="_blank" rel="noreferrer"><Instagram size={15}/> @feshoots <ArrowUpRight size={13}/></a><a href="mailto:fernandaopitacio@gmail.com"><Mail size={15}/> E-mail</a><span>São Paulo, Brasil</span></div>
  </section>;
}
