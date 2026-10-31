import { useLenis } from './lib/useLenis.js';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import Gallery from './components/sections/Gallery.jsx';
import ArtistArchive from './components/sections/ArtistArchive.jsx';
import About from './components/sections/About.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  useLenis();
  return <>
    <div className="film-grain" aria-hidden="true" />
    <Navbar />
    <main>
      <Hero />
      <Gallery />
      <ArtistArchive />
      <About />
      <Contact />
    </main>
    <Footer />
  </>;
}
