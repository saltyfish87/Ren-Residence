import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Specs from './components/Specs';
import LayoutExplorer from './components/LayoutExplorer';
import Facilities from './components/Facilities';
import Amenities from './components/Amenities';
import Developer from './components/Developer';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import AdminLeads from './components/AdminLeads';
import { ShieldCheck, MessageSquare, Phone, Calendar, ArrowUp } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Scroll to booking form helper
  const handleScrollToBooking = () => {
    const el = document.getElementById('showroom-appointment');
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Back to top scroll link
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-white text-brand-green-dark font-sans selection:bg-brand-gold selection:text-brand-green-dark relative">
      {/* 1. Header (Sticky navigation) */}
      <Header 
        onShowroomClick={handleScrollToBooking} 
        onAdminClick={() => setIsAdminOpen(true)} 
      />

      {/* 2. Hero Section */}
      <Hero onTourClick={handleScrollToBooking} />

      {/* 3. Specs / Key Selling Points bento grid */}
      <Specs />

      {/* 4. Floor plans / Interactive Sizing Sheet with loan mortgage calculation */}
      <LayoutExplorer />

      {/* 5. Luxury Resort Facilities & Pool */}
      <Facilities />

      {/* 6. Surrounding Hotspots Amenities */}
      <Amenities />

      {/* 7. Corporate Developer Track Record */}
      <Developer />

      {/* 8. Detailed FAQ Accordion */}
      <FAQ />

      {/* 9. Secured PDPA lead-capture Booking Form */}
      <BookingForm onSuccess={() => {}} />

      {/* 10. Google Ads APDL Compliant Footer */}
      <Footer />

      {/* 11. Custom Real Lead Manager Desk (Agent admin passcode accessible modal) */}
      <AdminLeads isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* 12. Persistent Floating Action Bar on Mobile Screens (High Conversion) */}
      <div id="mobile-sticky-action-bar" className="lg:hidden fixed bottom-0 left-0 w-full z-30 bg-brand-green-dark/95 backdrop-blur-md border-t border-brand-green-light/20 p-3 shadow-2xl flex items-center justify-between gap-3 text-white">
        <a
          id="mob-stick-phone"
          href="tel:+60195598932"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-brand-green-light/30 text-white bg-brand-green/20 active:bg-brand-green/40 rounded-xl font-bold text-xs uppercase"
        >
          <Phone size={14} />
          <span>Call Agent</span>
        </a>
        
        <a
          id="mob-stick-wa"
          href="https://wa.me/60195598932?text=Hi%2C%20I'm%20visiting%20the%20REN%20Residence%20landing%20page.%20Please%20send%20me%20special%20early-bird%20pricing%20packages%20and%20brochure."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs uppercase shadow-md transition-all whitespace-nowrap"
        >
          <MessageSquare size={14} />
          <span>WhatsApp Quick</span>
        </a>

        <button
          id="mob-stick-book"
          onClick={handleScrollToBooking}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark font-extrabold rounded-xl text-xs uppercase shadow-md transition-all border-none cursor-pointer"
        >
          <Calendar size={14} />
          <span>Book Tour</span>
        </button>
      </div>

      {/* 13. Back to Top Arrow floating button (Desktop) */}
      <button
        id="back-to-top-floating-btn"
        onClick={handleBackToTop}
        className="hidden md:flex fixed bottom-6 right-6 z-35 bg-brand-green hover:bg-brand-green-dark border border-brand-green-light/40 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer backdrop-blur-md items-center justify-center"
        title="Back To Top"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}
