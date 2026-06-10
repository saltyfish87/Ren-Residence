import React from 'react';
import { Home, Compass, Award, Building, Sparkles, Shield, Eye } from 'lucide-react';
import { DRIVE_IMAGES } from '../constants';

export default function Specs() {
  const cards = [
    {
      icon: <Building className="text-brand-gold-dark" size={24} />,
      title: "Pure Residential Title",
      desc: "Enjoy lower domestic-tariff utility rates (TNB & Syabas) and property assessment taxes. No commercial podium traffic means complete serenity & premium safety for your children."
    },
    {
      icon: <Compass className="text-brand-gold-dark" size={24} />,
      title: "GDP Architects' dual tower geometry",
      desc: "Inspired by the human character '人' (People) for balanced weight and cross-ventilation. Neighbors never look into each other's living rooms, prioritizing your ultimate family privacy."
    },
    {
      icon: <Home className="text-brand-gold-dark" size={24} />,
      title: "Multi-Generational Sizing",
      desc: "Sizes ranging from 920 sq.ft. to 1,680 sq.ft. with up to 4+1 bedrooms. Expansive layout flows optimized for children, working-from-home study pods, and elder comfort."
    },
    {
      icon: <Shield className="text-brand-gold-dark" size={24} />,
      title: "Secured EV-Ready Living",
      desc: "Each unit is allocated at least 2 side-by-side carparks on convenient low floors, pre-provisioned with electric vehicle charging-ready infrastructure."
    }
  ];

  return (
    <section id="why-choose" className="py-12 md:py-24 bg-brand-cream text-brand-green-dark scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-dark block">The Brand Blueprint</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-green tracking-tight">
            Composed With Care. Designed For Life.
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          <p className="text-slate-600 text-xs md:text-base leading-relaxed">
            Every square inch is engineered to deliver pristine privacy, comfort, and everlasting family value. Discover the luxury benchmarks that define REN Residence.
          </p>
        </div>

        {/* Bento Grid Concept */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Large Column with lobby rendering */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between group shadow-sm">
            <div className="p-5 sm:p-8 md:p-10 space-y-4">
              <div className="flex items-center gap-2 text-brand-gold-dark">
                <Award size={18} />
                <span className="text-xs uppercase tracking-widest font-bold">Iconic Design Masterclass</span>
              </div>
              <h3 className="text-xl md:text-3xl font-serif text-brand-green leading-snug">
                The Human-Centric "人" (People) Philosophy
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                By sculpting the tower architecture in an organic '人' pattern, multi-award-winning GDP Architects created distinct wing distributions. This ensures superb solar shading (keeping suites cool naturally) and yields excellent wind pocket channeling, resulting in cooler ambient temperatures.
              </p>
            </div>
            
            {/* Lobby Graphic Image Asset wrapper */}
            <div className="relative h-64 sm:h-72 md:h-[350px] w-full overflow-hidden mt-4">
              <img 
                src={DRIVE_IMAGES.lobby} 
                alt="REN Residence Designer Lobby Rendering" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-green-dark/95 via-brand-green-dark/40 to-transparent p-4 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="block text-xs sm:text-sm font-bold tracking-wide font-serif">The Double-Height Grand Lobby</span>
                  <span className="block text-[10px] sm:text-[11px] text-[#C1D2CD] font-sans leading-relaxed">Sophisticated brass elements and premium imported marble floor aesthetics</span>
                </div>
                <span className="flex items-center gap-1.5 bg-brand-gold font-bold text-[8px] sm:text-[10px] uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-brand-green-dark shadow shrink-0">
                  <Sparkles size={10} /> 5-Star Reception
                </span>
              </div>
            </div>
          </div>

          {/* Right Smaller Columns Container */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {cards.map((card, i) => (
              <div
                id={`specs-card-${i}`}
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-gold/30 hover:shadow-lg transition-all duration-300 flex gap-4 items-start shadow-xs"
              >
                <div className="p-3.5 bg-brand-cream border border-brand-gold-light/20 rounded-xl shrink-0 text-brand-green">
                  {card.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-brand-green-dark tracking-tight">{card.title}</h4>
                  <p className="text-slate-650 text-slate-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
