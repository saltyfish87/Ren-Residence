import React from 'react';
import { Award, ShieldCheck, Heart, Zap } from 'lucide-react';

export default function Developer() {
  const pastProjects = [
    { name: "Sastra U-Thant", location: "Ampang Hilir, KL (Elite Embassy Row)", type: "Ultra-luxury low-density" },
    { name: "GenKL", location: "Kuchai Lama, Kuala Lumpur", type: "High-End Family Private Suites" },
    { name: "Zehn Bukit Pantai", location: "Zehn Bangsar, Kuala Lumpur", type: "Prestige High-Rise Living" },
    { name: "Menara Technip", location: "Kuala Lumpur City Centre", type: "GBI Gold Certified Commercial Tower" }
  ];

  return (
    <section id="developer" className="py-12 md:py-24 bg-[#EBF0EC]/30 text-brand-green-dark border-y border-brand-sage/60 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Block: Company profiles */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-dark block font-mono">The Visionary Builders</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">
              Gaya Kuasa & Juta Asia Corporation
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold"></div>
            
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans">
              Established in 2002, Juta Asia Corporation—in trusted structural alliance with cooperative landowners Gaya Kuasa Sdn Bhd—has forged a premier reputation as a designer and builder of high-end residential, private villa, and corporate offices across Malaysia's gold-tier districts.
            </p>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans">
              By prioritially incorporating world-class architectural designs, Green Building Index (GBI) frameworks, and highly functional layouts, they deliver structural landmarks with solid, long-term multi-generational value.
            </p>

            {/* Strategic Core Pillar tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl border border-brand-sage flex items-start gap-3 shadow-xs">
                <ShieldCheck size={20} className="text-brand-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-brand-green-dark tracking-tight">QLASSIC Standards</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-sans">Rigorous materials testing ensuring lifetime structural durability.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-brand-sage flex items-start gap-3 shadow-xs">
                <Zap size={20} className="text-brand-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-bold text-brand-green-dark tracking-tight">Green Eco Infra</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-sans">Rainwater irrigation systems and smart EV power points pre-wired.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: completed portfolio showcase strip */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-brand-sage shadow-md space-y-6">
            <div className="border-b border-brand-sage pb-4 flex justify-between items-center bg-transparent">
              <div>
                <h3 className="font-serif text-lg text-brand-green-dark">Signature Track Record</h3>
                <p className="text-xs text-slate-500 leading-normal mt-0.5">Selected landmark completions by the joint consortium Partners</p>
              </div>
              <span className="text-[10px] font-bold text-brand-gold-dark bg-brand-cream px-3 py-1.5 rounded-lg border border-brand-sage font-mono">Est. 2002</span>
            </div>

            <div className="space-y-4">
              {pastProjects.map((p, index) => (
                <div
                  id={`past-proj-${index}`}
                  key={index}
                  className="p-4 bg-brand-cream/40 hover:bg-brand-cream hover:border-brand-gold/30 rounded-xl border border-[#EDF1EF] transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-brand-green-dark">{p.name}</h4>
                    <span className="block text-[11px] text-slate-500 font-sans">{p.location}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-750 text-slate-750 bg-white border border-brand-sage px-3 py-1.5 rounded-full shadow-xs whitespace-nowrap self-start sm:self-auto">
                    {p.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Verification small stamp */}
            <div className="bg-brand-cream border border-brand-gold/25 rounded-xl p-4 flex gap-3 text-[#5A4E39] text-xs leading-normal">
              <Award className="text-brand-gold-dark shrink-0 mt-0.5 animate-pulse" size={18} />
              <span className="font-sans">
                <strong>Legacy Built on Trust:</strong> With thousands of high-end homes successfully handed over on schedule, REN Residence stands as their landmark family sanctuary built for generations to come.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
