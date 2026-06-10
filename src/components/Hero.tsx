import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DRIVE_IMAGES } from '../constants';

interface HeroProps {
  onTourClick: () => void;
}

export default function Hero({ onTourClick }: HeroProps) {
  return (
    <section id="overview" className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-brand-green-dark text-white">
      {/* Background Graphic Image with layout overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={DRIVE_IMAGES.facade}
          alt="REN Residence Twin Towers Elegant Architecture"
          className="w-full h-full object-cover scale-101 animate-[subtleZoom_40s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Soft, luxury ambient dark green and charcoal overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/95 via-brand-green/65 to-brand-green-dark/30"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-green-dark to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col justify-center py-20 md:py-28 h-full">

        {/* Main Content Area */}
        <div className="max-w-3xl space-y-7">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold block font-sans">
            Bukit Jalil's Luxury Family Landmark
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-none">
            We Begin The Home.<br />
            <span className="text-brand-gold font-normal font-serif italic">You Complete It.</span>
          </h1>
          <div className="pt-4">
            <button
              id="hero-book-now-btn"
              onClick={onTourClick}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-[0_4px_20px_rgba(194,164,120,0.2)] hover:shadow-[0_4px_25px_rgba(194,164,120,0.4)] transition-all group cursor-pointer border-none"
            >
              <span>Secure Early-Bird Package</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes subtleZoom {
          0% { transform: scale(1.01); }
          100% { transform: scale(1.06); }
        }
      `}</style>
    </section>
  );
}
