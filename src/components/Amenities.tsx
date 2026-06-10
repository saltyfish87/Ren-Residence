import React, { useState } from 'react';
import { ShoppingBag, GraduationCap, HeartPulse, Train, MapPin, Eye } from 'lucide-react';
import { DRIVE_IMAGES } from '../constants';

interface NearbyPlace {
  name: string;
  sub: string;
  time: string;
  desc: string;
}

interface AmenityCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  places: NearbyPlace[];
}

export default function Amenities() {
  const [activeCategory, setActiveCategory] = useState<string>("shopping");

  const categories: AmenityCategory[] = [
    {
      id: "shopping",
      label: "Shopping & Lifestyle",
      icon: <ShoppingBag size={18} />,
      places: [
        { name: "Pavilion Bukit Jalil", sub: "Bukit Jalil's Crown Jewel Retail Destination", time: "3 mins drive (approx. 1.8km)", desc: "A world-class 1.8 million sq ft mega lifestyle hub offering premium dining, specialty shops, hypermarkets, and golden screens." },
        { name: "Bukit Jalil Golf & Country Resort", sub: "Elite 18-Hole Championship Greens", time: "5 mins drive", desc: "A prestigious green sanctuary offering pristine parklands, active country clubhouses, and multiple athletic networks." },
        { name: "Bukit Jalil Recreational Park", sub: "80-Acre Scenic Public Garden", time: "6 mins drive", desc: "A massive public landscaped terrain equipped with children play zones, international garden displays, and jogging tracks." }
      ]
    },
    {
      id: "education",
      label: "Premier Education Centres",
      icon: <GraduationCap size={18} />,
      places: [
        { name: "Tzu Chi International School", sub: "Elite Values-Driven Dual-Curriculum", time: "2 mins drive", desc: "A prominent progressive institution promoting values, environmental care, and standard Cambridge academic pathways." },
        { name: "International Medical University (IMU)", sub: "Malaysia's Foremost Medical Institution", time: "5 mins drive", desc: "A premier private medical and health sciences institution with a bustling community of students." },
        { name: "Asia Pacific University (APU)", sub: "Award-winning Digital & Innovation Hub", time: "10 mins drive", desc: "State-of-the-art research facility specializing in high-demand technical computing, digital architectures, and artificial intelligence." }
      ]
    },
    {
      id: "healthcare",
      label: "Eminent Healthcare Trust",
      icon: <HeartPulse size={18} />,
      places: [
        { name: "IMU Specialist Hospital", sub: "Immediate Patient-Centric Medicine", time: "5 mins drive", desc: "Equipped with advanced patient monitoring technologies and a comprehensive suite of specialist diagnostic rooms." },
        { name: "Columbia Asia Hospital (Puchong)", sub: "Highly-Rated Emergency & Maternity Care", time: "10 mins drive", desc: "A modern regional hospital facilitating rapid triage, expert pediatric clinics, and emergency surgeries." },
        { name: "Sunway Medical Centre", sub: "Multi-Disciplinary JCI-Accredited Complex", time: "12 mins drive", desc: "One of the absolute largest medical hospitals in Southeast Asia with award-winning cardiology and intensive triage facilities." }
      ]
    },
    {
      id: "transport",
      label: "Transit & Highways",
      icon: <Train size={18} />,
      places: [
        { name: "Alam Sutera LRT Station", sub: "Covered Pedestrian Connection (Sri Petaling Line)", time: "Walkable (approx 500m)", desc: "A seamless walking bridge system that connects residents to the rapid train grid mapping directly into KL Sentral." },
        { name: "Bukit Jalil LRT Station", sub: "Secondary Stadium Connection", time: "5 mins drive", desc: "Provides swift transit options to the Bukit Jalil National Stadium, major recreational parks, and event corridors." },
        { name: "Direct Highway Interchanges", sub: "KESAS, MEX, Bukit Jalil Expressways", time: "Instant layout integration", desc: "Immediate link options placing you moments away from Puchong, Subang, Sunway, and downtown KL City Centre." }
      ]
    }
  ];

  const activeData = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <section id="location" className="py-12 md:py-24 bg-brand-cream text-brand-green-dark scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-dark block font-mono">Unrivalled Grid Location</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            We're Close To Any Destination.
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          <p className="text-slate-650 text-xs md:text-base leading-relaxed">
            Nestled directly at Bukit Jalil's prime residential growth belt. Live perfectly connected to luxury shopping malls, international schools, and transport systems.
          </p>
        </div>

        {/* Display Grid: Tabs, Schematic Layout list and Map preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Categories and place tiles */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Pill tabs buttons horizontal */}
            <div className="bg-brand-sage/40 p-1.5 rounded-2xl border border-brand-sage flex overflow-x-auto gap-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-1.5">
              {categories.map((cat) => (
                <button
                  id={`amenities-tab-${cat.id}`}
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer border-none whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-brand-green text-brand-gold-light shadow-md'
                      : 'text-slate-500 hover:text-brand-green-dark hover:bg-brand-sage/40'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* List of active places */}
            <div className="space-y-4">
              {activeData.places.map((place, idx) => (
                <div
                  id={`amenity-item-${idx}`}
                  key={idx}
                  className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-100 hover:border-brand-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <span className="inline-flex items-center gap-1.5 bg-brand-cream border border-brand-sage/80 text-[10px] text-brand-gold-dark font-bold px-2 py-0.5 rounded-full uppercase font-mono">
                      <MapPin size={10} /> Local hotspot
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-brand-green-dark tracking-tight">{place.name}</h4>
                    <span className="block text-[11px] sm:text-xs font-semibold text-[#8DAEA4]">{place.sub}</span>
                    <p className="text-slate-550 text-slate-500 text-xs leading-relaxed pt-0.5">{place.desc}</p>
                  </div>
                  <div className="shrink-0 bg-brand-cream border border-brand-sage/80 text-brand-green-dark px-4 py-2.5 rounded-xl flex flex-col items-center justify-center text-center shadow-xs min-w-[110px] self-stretch sm:self-auto">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold font-mono leading-none">Travel Offset</span>
                    <span className="text-xs font-bold font-serif text-brand-green mt-1.5">{place.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Beautiful Surrounding Map Graphic Schema */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-brand-sage p-6 flex flex-col justify-between relative overflow-hidden shadow-sm group">
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold-dark font-bold">Location Blueprint</span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#2CB489] font-bold bg-[#EBFDFA] px-2 py-1 rounded">Sri Petaling Transit Line</span>
              </div>
              <h3 className="text-xl font-serif text-brand-green-dark">Spatial Location Map</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans pb-3 border-b border-brand-sage/60">
                REN Residence occupies the primary premium plot of land located along Bukit Jalil. Flanked by high-speed expressways and nestled within a lush established luxury corridor.
              </p>
            </div>

            {/* Location Map Image fetched from Drive */}
            <div className="w-full h-80 overflow-hidden rounded-2xl border border-brand-sage flex items-center justify-center bg-brand-cream my-4 p-1.5 shadow-inner">
              <img
                src={DRIVE_IMAGES.locationMap}
                alt="REN Residence Bukit Jalil Location Map Schema"
                className="w-full h-full object-cover rounded-xl group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Direct Link to GMap */}
            <a 
              id="external-gmap-btn"
              href="https://maps.google.com/?q=REN+Residence+Bukit+Jalil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-green hover:bg-brand-green-light text-white text-xs font-bold rounded-xl shadow-md transition-all uppercase tracking-wider border-none"
            >
              <Eye size={14} />
              <span>Launch Live Google Maps Navigate</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
