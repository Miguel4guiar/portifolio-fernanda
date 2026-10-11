import { useLenis } from './lib/useLenis.js';
import CustomCursor from './components/layout/CustomCursor.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Marquee from './components/layout/Marquee.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import Gallery from './components/sections/Gallery.jsx';
import ArtistArchive from './components/sections/ArtistArchive.jsx';
import About from './components/sections/About.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  useLenis();

  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <ArtistArchive />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
