import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, ArrowUpRight, Check } from 'lucide-react';

const FIELDS = [
  { name: 'name', label: 'Nome', type: 'text', placeholder: 'Seu nome' },
  { name: 'project', label: 'Projeto', type: 'text', placeholder: 'Show, editorial, clipe...' },
  { name: 'date', label: 'Data', type: 'date' },
  { name: 'budget', label: 'Orçamento estimado', type: 'text', placeholder: 'R$' },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Em produção: POST para endpoint (ex.: Supabase, Resend, Formspree)
    setTimeout(() => setStatus('sent'), 1200);
  };

  return (
    <section id="contato" className="bg-asphalt px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 sm:gap-16 md:grid-cols-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest2 text-acid">Booking</span>
          <h2 className="mb-6 mt-3 break-words font-display text-display-lg font-extrabold uppercase leading-[0.95] text-bone">
            Vamos
            <br /> registrar isso.
          </h2>
          <p className="mb-10 max-w-sm font-body text-sm text-smoke">
            Para shows, editoriais e cobertura de bastidor, conta o projeto abaixo —
            resposta em até 48h.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:fernandaopitacio@gmail.com"
              className="group flex items-center gap-3 font-mono text-sm uppercase tracking-widest2 text-bone"
            >
              <Mail size={16} className="text-acid" />
              fernandaopitacio@gmail.com
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="https://www.instagram.com/feshoots"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 font-mono text-sm uppercase tracking-widest2 text-bone"
            >
              <Instagram size={16} className="text-acid" />
              @feshoots
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {FIELDS.map((field) => (
            <div key={field.name} className="border-b border-smoke/30 pb-2 transition-colors focus-within:border-acid">
              <label htmlFor={field.name} className="mb-1 block font-mono text-[10px] uppercase tracking-widest2 text-smoke">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required
                className="w-full bg-transparent font-body text-lg text-bone placeholder:text-smoke/50 focus:outline-none"
              />
            </div>
          ))}

          <motion.button
            type="submit"
            disabled={status !== 'idle'}
            whileTap={{ scale: 0.97 }}
            className="mt-4 flex items-center justify-center gap-2 border border-acid px-8 py-4 font-mono text-xs uppercase tracking-widest2 text-acid transition-colors hover:bg-acid hover:text-void disabled:opacity-70"
          >
            {status === 'idle' && 'Enviar solicitação'}
            {status === 'sending' && 'Enviando...'}
            {status === 'sent' && (
              <>
                <Check size={16} /> Recebido
              </>
            )}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
