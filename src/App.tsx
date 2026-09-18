import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Address from './components/Address';
import Quote from './components/Quote';
import Residences from './components/Residences';
import Facilities from './components/Facilities';
import Design from './components/Design';
import Location from './components/Location';
import Gallery from './components/Gallery';
import FAQSection from './components/FAQSection';
import RegisterForm from './components/RegisterForm';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminLeads from './components/AdminLeads';
import { LegalPage } from './components/LegalPage';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('s');
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 1200);
  }, []);

  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : '';
  const legal = (['/terms', '/privacy', '/disclaimer'] as const).find((p) => p === path);
  const shell = 'relative min-h-screen w-full overflow-x-hidden bg-bone font-body text-ink antialiased';

  if (legal) {
    return (
      <div className={shell}>
        <Navbar />
        <main><LegalPage slug={legal.slice(1) as 'terms' | 'privacy' | 'disclaimer'} /></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={shell}>
      <Navbar />
      <main>
        <Hero />
        <Address />
        <Quote />
        <Residences />
        <Facilities />
        <Design />
        <Location />
        <Gallery />
        <FAQSection />
        <RegisterForm />
      </main>
      <Footer onAgentDesk={() => setAdminOpen(true)} />
      <FloatingWhatsApp />
      <AdminLeads isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}
