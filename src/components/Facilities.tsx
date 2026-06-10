import React, { useState } from 'react';
import { Sparkles, Heart, Activity, Coffee, Users, Check } from 'lucide-react';
import { DRIVE_IMAGES } from '../constants';

interface FacilityCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: string[];
  tagline: string;
  image: string;
  title: string;
  desc: string;
}

export default function Facilities() {
  const [activeTab, setActiveTab] = useState<string>("recreation");

  const categories: FacilityCategory[] = [
    {
      id: "recreation",
      label: "Water & Play",
      icon: <Activity size={16} />,
      tagline: "Unwind under blue clear skies and tropical landscapes",
      image: DRIVE_IMAGES.pool,
      title: "We Build The Pool. You Make The Waves.",
      desc: "An Olympic-length signature pool wrapped within lush forest trees and outdoor wooden decks. Relax on the sunken lounge chairs or splash with your family in safety.",
      items: ["Olympic-Length Infinity Pool", "Children's Interactive Aqua-Play", "Therapeutic Sunken Spa Pool", "Poolside Floating Sunbeds", "Deep Water Tanning Ledges", "Tropical Cabana Poolside Deck"]
    },
    {
      id: "wellness",
      label: "Wellness & Nature",
      icon: <Heart size={16} />,
      tagline: "Recharge your physical and mental energy reserves",
      image: DRIVE_IMAGES.gym1,
      title: "Elevated Sky Health & Meditation",
      desc: "Our triple-aspect sky gymnasium has dynamic floor-to-ceiling glass windows overlooking the signature Bukit Jalil golf course with active outdoor running loops.",
      items: ["Sky-View Glass Gymnasium", "Zen Garden Yoga Pavilions", "Chakra Reflexology Footpaths", "Muted Sound Wellness Studio", "Outdoor Calisthenics Stations", "Aromatic Herbal Walkways"]
    },
    {
      id: "social",
      label: "Work & Social Lounge",
      icon: <Coffee size={16} />,
      tagline: "Collaborate, network, or celebrate together",
      image: DRIVE_IMAGES.coworking1,
      title: "Coworking Co-living Synthesis",
      desc: "Slick and modern focus desks, quiet library cubicles, and gourmet coffee bar facilities that empower entrepreneurs, freelancers, and hybrid remote executives.",
      items: ["Fully-Equipped Co-Working Labs", "Indoor Executive Conference Board", "Sound-insulated Zoom Call Booths", "Double-Height Banquet Grand Hall", "Signature Barbecue Gardens", "Billiard & Gaming Social Lounge"]
    },
    {
      id: "kids",
      label: "Kids & Family Bonding",
      icon: <Users size={16} />,
      tagline: "Nurture creativity and active outdoor physical play",
      image: DRIVE_IMAGES.kidsRoom,
      title: "Kids Sensory Growth Hub",
      desc: "Safe and spacious nurseries, kid's libraries, and custom sensory playgrounds designed to stimulate young imagination and foster friendships.",
      items: ["Modern Childcare & Nursery Lab", "Creative Sandbox Adventure Arena", "Toddlers' Sensory Play Room", "Interactive Climbing Blocks", "Rooftop Stargazing Grass Green", "Reading Cubby Libraries"]
    }
  ];

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section id="facilities" className="py-12 md:py-24 bg-brand-green text-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header strip */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-light block font-mono">The Resort Acre</span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight">
            An Acre of Signature Lifestyle Facilities
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          <p className="text-[#C1D2CD] text-xs md:text-base leading-relaxed">
            From focused executive co-working studios to calming tropical garden pavilions, over 60 amenities are crafted for perfect everyday work-life fulfillment.
          </p>
        </div>
 
        {/* Layout Grid: Left Tab content, Right pool landscape */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
          
          {/* Left Column: Tab Navigator & Items list */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-[#96B5AB] font-bold tracking-widest block">Choose Club Level:</span>
              
              {/* Responsive tab selectors: Horizontal scroll on mobile, Vertical stack on desktop */}
              <div className="flex flex-row overflow-x-auto pb-3 lg:pb-0 lg:flex-col gap-3 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
                {categories.map((c) => {
                  const isActive = activeTab === c.id;
                  return (
                    <button
                      id={`facility-tab-${c.id}`}
                      key={c.id}
                      onClick={() => setActiveTab(c.id)}
                      className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl text-left border transition-all cursor-pointer border-none shrink-0 ${
                        isActive
                          ? 'bg-white/10 text-brand-gold-light shadow-md'
                          : 'bg-brand-green-dark/45 text-[#96B5AB] hover:text-white hover:bg-brand-green-dark/70'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-brand-gold text-brand-green-dark font-extrabold' : 'bg-brand-green-dark text-[#D0DFDA]'}`}>
                        {c.icon}
                      </div>
                      <div>
                        <span className="block text-xs lg:text-sm font-bold tracking-tight whitespace-nowrap">{c.label}</span>
                        <span className="hidden lg:block text-[11px] text-[#96B5AB] font-sans italic">{c.tagline}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
 
            {/* Render items inside selected category in a styled grid */}
            <div className="bg-brand-green-dark/70 p-5 lg:p-6 rounded-2xl border border-brand-green-light/20 space-y-4 shadow-inner">
              <span className="text-xs font-bold uppercase text-brand-gold tracking-wider flex items-center gap-1.5 font-mono">
                <Sparkles size={12} /> Exquisite Highlights:
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
                {activeCategory.items.map((item, id) => (
                  <div key={id} className="flex items-center gap-2 text-[#D0DFDA] text-[11px] lg:text-xs py-0.5">
                    <span className="p-0.5 rounded-full bg-[#2E5E4E] text-brand-gold-light flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </span>
                    <span className="truncate" title={item}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* Right Column: Dynamic Category Renderings - Highly responsive and adaptive layout */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-brand-green-light/20 group shadow-2xl flex flex-col justify-end bg-brand-green-dark min-h-[350px] lg:min-h-[480px]">
            {/* Wrap the image with a relative box on mobile to prevent text overlay, absolute on desktop */}
            <div className="relative w-full h-56 sm:h-72 lg:absolute lg:inset-0 lg:h-full">
              <img
                src={activeCategory.image}
                alt={activeCategory.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 lg:absolute lg:inset-0"
                referrerPolicy="no-referrer"
              />
              {/* Ambient gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark-gradient from-brand-green-dark/95 via-brand-green-dark/20 to-transparent"></div>
            </div>
            
            {/* Details bar layout: Static/Relative on low resolution, Absolute on high-resolution desktop */}
            <div className="relative p-5 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 lg:p-6 bg-brand-green-dark/90 backdrop-blur-md rounded-b-3xl lg:rounded-2xl border-t lg:border border-brand-green-light/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <span className="block text-[10px] uppercase font-mono tracking-wider text-brand-gold font-bold">Resort Feature Studio</span>
                <span className="block text-base lg:text-lg font-serif font-semibold text-white mt-0.5">{activeCategory.title}</span>
                <span className="block text-xs text-[#C1D2CD] mt-1 line-clamp-3 font-sans pr-2">{activeCategory.desc}</span>
              </div>
              <a
                id="facilities-whatsapp-btn"
                href="https://wa.me/60195598932?text=Hi%2C%20Please%20share%20the%20complete%20PDF%20e-brochure%20with%20all%2060%2B%20facilities%20plan%20and%20site%20layout%20of%20REN%20Residence%20Bukit%20Jalil."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 lg:p-3.5 bg-[#25D366] hover:scale-105 rounded-full text-white shadow-lg transition-transform flex items-center justify-center cursor-pointer border-none shrink-0 self-end sm:self-center"
                title="Ask on WhatsApp"
              >
                <Users size={16} />
              </a>
            </div>
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
