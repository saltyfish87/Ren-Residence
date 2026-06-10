import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, Menu, X } from 'lucide-react';

interface HeaderProps {
  onShowroomClick: () => void;
  onAdminClick: () => void;
}

export default function Header({ onShowroomClick, onAdminClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      id="main-app-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-green/95 backdrop-blur-md shadow-lg py-3.5 border-b border-brand-green-light/20 text-white' 
          : 'bg-gradient-to-b from-brand-green-dark/80 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          id="brand-logo-link"
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-9 h-9 flex items-center justify-center bg-brand-gold rounded-lg group-hover:scale-105 transition-transform shadow">
            {/* Elegant 人 representation */}
            <span className="text-lg font-serif text-[#1F2C27] font-semibold tracking-tight">人</span>
          </div>
          <div>
            <span className="block font-sans font-bold text-base tracking-wider text-white">
              REN RESIDENCE
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-brand-gold font-bold">
              BUKIT JALIL
            </span>
          </div>
        </a>

        {/* Desktop Navbar */}
        <nav id="desktop-navbar" className="hidden lg:flex items-center gap-7 font-sans text-xs uppercase tracking-widest font-bold">
          {[
            { label: 'Overview', id: 'overview' },
            { label: 'Key Features', id: 'why-choose' },
            { label: 'Floor Plans', id: 'floor-plans' },
            { label: 'Facilities', id: 'facilities' },
            { label: 'Location', id: 'location' },
            { label: 'Developer', id: 'developer' },
            { label: 'FAQs', id: 'faqs' }
          ].map((item) => (
            <button
              id={`nav-btn-${item.id}`}
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-brand-gold text-slate-100 bg-transparent border-none cursor-pointer transition-colors"
            >
              {item.label}
            </button>
          ))}
          
          {/* Hidden Admin Entrypoint to download leads */}
          <button 
            id="nav-btn-admin"
            onClick={onAdminClick}
            className="text-[9px] p-1 px-1.5 border border-brand-gold/30 hover:bg-brand-gold hover:text-brand-green-dark rounded transition-all tracking-normal lowercase text-brand-gold cursor-pointer"
          >
            agent desk
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            id="call-now-hdr-btn"
            href="tel:+60195598932"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <Phone size={13} />
            <span>019-559 8932</span>
          </a>

          <a
            id="whatsapp-hdr-btn"
            href="https://wa.me/60195598932?text=Hi%2C%20I'm%20interested%20in%20REN%20Residence%20Bukit%20Jalil.%20Please%20share%20the%20packages%20and%20brochure."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm transition-all text-center"
          >
            <MessageSquare size={13} />
            <span>WhatsApp</span>
          </a>

          <button
            id="book-hdr-btn"
            onClick={onShowroomClick}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark shadow-sm transition-all cursor-pointer border-none"
          >
            <Calendar size={13} />
            <span>Book Viewing</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            id="mobile-phone-shortcut-btn"
            href="tel:+60195598932"
            className="p-2 rounded-lg border border-white/25 text-white flex items-center justify-center hover:bg-white/15"
          >
            <Phone size={15} />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg flex items-center justify-center bg-transparent border-none text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden absolute top-full left-0 w-full bg-brand-green-dark text-white border-t border-brand-green-light/20 shadow-xl py-6 px-6 space-y-5 animate-fadeIn">
          <nav className="flex flex-col gap-4 font-sans text-xs uppercase tracking-widest font-bold">
            {[
              { label: 'Overview', id: 'overview' },
              { label: 'Key Features', id: 'why-choose' },
              { label: 'Floor Plans', id: 'floor-plans' },
              { label: 'Facilities', id: 'facilities' },
              { label: 'Location', id: 'location' },
              { label: 'Developer', id: 'developer' },
              { label: 'FAQs', id: 'faqs' }
            ].map((item) => (
              <button
                id={`mob-nav-btn-${item.id}`}
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left py-2 hover:text-brand-gold border-b border-brand-green-light/10 text-slate-100 bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-3">
            <a
              id="mob-call-btn"
              href="tel:+60195598932"
              className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-slate-100 rounded-lg border border-brand-green-light/40 bg-brand-green/30 active:bg-brand-green/50 transition-all"
            >
              <Phone size={15} />
              <span>Call: 019-559 8932</span>
            </a>

            <a
              id="mob-wa-btn"
              href="https://wa.me/60195598932?text=Hi%2C%20I'm%20interested%20in%20REN%20Residence%20Bukit%20Jalil.%20Please%20share%20the%20packages%20and%20brochure."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg shadow-md transition-all font-sans"
            >
              <MessageSquare size={15} />
              <span>WhatsApp Agent Now</span>
            </a>

            <button
              id="mob-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                const element = document.getElementById('showroom-appointment');
                if (element) {
                   element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center justify-center gap-2 py-3 text-xs font-bold bg-brand-gold text-brand-green-dark rounded-lg shadow-md hover:bg-brand-gold-light transition-all border-none cursor-pointer"
            >
              <Calendar size={15} />
              <span>Book Appointment Slot</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
