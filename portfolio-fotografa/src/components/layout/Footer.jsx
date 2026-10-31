export default function Footer() {
  return (
    <footer className="border-t border-smoke/20 bg-void px-4 py-10 sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-widest2 text-smoke md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} feshoots — Todos os direitos reservados</span>
        <span>São Paulo, Brasil</span>
      </div>
    </footer>
  );
}
