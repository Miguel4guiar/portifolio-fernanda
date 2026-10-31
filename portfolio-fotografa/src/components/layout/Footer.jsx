export default function Footer() {
  return <footer className="editorial-footer"><span>© {new Date().getFullYear()} FESHOOTS</span><span>Photography / Art direction / Film</span><a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Voltar ao topo ↑</a></footer>;
}
