import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import Products from '../components/Products';
import Applications from '../components/Applications';
import Differentiators from '../components/Differentiators';
import About from '../components/About';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <main>
      <SEO />
      <Hero />
      <TrustBadges />
      <Products />
      <Applications />
      <Differentiators />
      <About />
      <Contact />
    </main>
  );
}
