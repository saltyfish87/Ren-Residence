import React, { useState } from 'react';
import { Home, Ruler, Car, ChevronRight, MessageSquare, Info, ShieldCheck } from 'lucide-react';
import { DRIVE_IMAGES } from '../constants';

interface LayoutOption {
  id: string;
  name: string;
  sqft: number;
  rooms: string;
  bathrooms: number;
  carparks: number;
  startingPrice: number;
  idealFor: string;
  desc: string;
  image: string;
}

const LAYOUTS: LayoutOption[] = [
  {
    id: "type-a",
    name: "Type A (The Compact Modern)",
    sqft: 920,
    rooms: "3 Bedrooms",
    bathrooms: 2,
    carparks: 2,
    startingPrice: 537000,
    idealFor: "Young couples & Dynamic professionals wanting optimized square footage",
    desc: "A highly efficient dual-orientation design with zero wasted hallway space. Yields a premium dining/living flow with wide sun-drenched panoramic windows.",
    image: DRIVE_IMAGES.typeA
  },
  {
    id: "type-b1",
    name: "Type B1 (The Smart Flex)",
    sqft: 1050,
    rooms: "3+1 Bedrooms",
    bathrooms: 2,
    carparks: 2,
    startingPrice: 610000,
    idealFor: "Growing families needing an designated study or workspace",
    desc: "A stunning family design featuring a practical utility-cum-flex room that easily converts into a workspace, nursery, or secondary food pantry.",
    image: DRIVE_IMAGES.typeB1
  },
  {
    id: "type-b3",
    name: "Type B3 (Corner Oasis)",
    sqft: 1120,
    rooms: "3+1 Bedrooms",
    bathrooms: 2,
    carparks: 2,
    startingPrice: 645050,
    idealFor: "People who love side balconies, cross ventilation, and morning light",
    desc: "A luxury corner wing distribution maximizing daylight entry across all master quarters, complete with a beautiful spacious L-shaped balcony.",
    image: DRIVE_IMAGES.typeB3
  },
  {
    id: "type-c",
    name: "Type C (The Multi-Gen Haven)",
    sqft: 1270,
    rooms: "4+1 Bedrooms",
    bathrooms: 3,
    carparks: 2,
    startingPrice: 735000,
    idealFor: "Multi-generational families wanting split dual-key spaces",
    desc: "Designed with isolated master divisions. Features a private ground junior-suite layout perfect for elders or older children, enabling daily quiet and peace.",
    image: DRIVE_IMAGES.typeC
  },
  {
    id: "type-d",
    name: "Type D (The Sky Villa bungalow)",
    sqft: 1680,
    rooms: "4+1 Bedrooms",
    bathrooms: 3,
    carparks: 3,
    startingPrice: 950000,
    idealFor: "Discerning elite buyers wanting absolute space and scenic views",
    desc: "The absolute flagship. Yields majestic wrapping entertainment balconies, professional dry gourmet island division, separate maids quarters, and 3 private carparks.",
    image: DRIVE_IMAGES.typeD
  }
];

export default function LayoutExplorer() {
  const [selectedType, setSelectedType] = useState<LayoutOption>(LAYOUTS[0]);
  
  // Calculator States
  const [customPrice, setCustomPrice] = useState<number>(LAYOUTS[0].startingPrice);
  const [downpaymentPercent, setDownpaymentPercent] = useState<number>(10);
  const [tenureYears, setTenureYears] = useState<number>(35);
  const [interestRate, setInterestRate] = useState<number>(3.85);

  // Auto-update price when type changes
  const handleTypeSelect = (layout: LayoutOption) => {
    setSelectedType(layout);
    setCustomPrice(layout.startingPrice);
  };

  // Math calculation logic
  const calculateMortgage = () => {
    const downpayment = (downpaymentPercent / 100) * customPrice;
    const principal = customPrice - downpayment;
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = tenureYears * 12;
    
    if (monthlyRate === 0) return Math.round(principal / totalMonths).toLocaleString();
    
    const monthlyAmount = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    return Math.round(monthlyAmount).toLocaleString();
  };

  return (
    <section id="floor-plans" className="py-12 md:py-24 bg-white text-brand-green-dark scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header strip */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-dark block font-mono">Premium Geometry</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Explore Floor Layouts & Plans
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          <p className="text-slate-655 text-slate-500 text-xs md:text-base leading-relaxed">
            With over 1,200 total residences spread across two beautifully shaped wings, choose a suite perfectly tailored to your budget and family configuration.
          </p>
        </div>

        {/* Dynamic interactive grid content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Selector & Big visual of Floor Plan */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Horizontal slider tab selector with custom scroll styling */}
            <div className="flex bg-brand-cream/80 p-1.5 rounded-2xl border border-brand-sage overflow-x-auto gap-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-1.5">
              {LAYOUTS.map((layout) => (
                <button
                  id={`layout-tab-${layout.id}`}
                  key={layout.id}
                  onClick={() => handleTypeSelect(layout)}
                  className={`flex-1 min-w-[100px] text-center px-3 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer border-none whitespace-nowrap ${
                    selectedType.id === layout.id
                      ? 'bg-brand-green text-brand-gold-light shadow-md'
                      : 'text-slate-500 hover:text-brand-green-dark hover:bg-brand-sage/40'
                  }`}
                >
                  {layout.id.toUpperCase().replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Layout Presentation Floorplan Display */}
            <div className="relative bg-brand-cream border border-brand-sage rounded-2xl p-5 md:p-8 flex flex-col justify-between overflow-hidden shadow-sm group min-h-[440px] md:min-h-[480px]">
              {/* Grid graphic overlay to mimic real blueprints */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e1e6e2_1px,transparent_1px),linear-gradient(to_bottom,#e1e6e2_1px,transparent_1px)] bg-[size:28px_28px] opacity-20 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b border-brand-sage/80 pb-4">
                  <div>
                    <h3 className="text-lg md:text-2xl font-serif text-brand-green-dark">{selectedType.name}</h3>
                    <span className="text-[11px] text-slate-500 italic block mt-1 leading-normal max-w-sm">Best for: {selectedType.idealFor}</span>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-2xl md:text-3xl font-bold font-serif text-brand-green">{selectedType.sqft}</span>
                    <span className="text-[9px] text-brand-gold-dark block uppercase font-mono tracking-widest mt-0.5">SQ.FT. SIZE</span>
                  </div>
                </div>

                {/* Real Floor Plan Image fetched from Drive */}
                <div className="flex justify-center items-center py-6 bg-white rounded-xl border border-brand-sage/60 p-4 shadow-inner max-h-[300px] sm:max-h-[360px] overflow-hidden">
                  <img
                    src={selectedType.image}
                    alt={`${selectedType.name} floorplan layout rendering`}
                    className="max-h-[220px] sm:max-h-[300px] object-contain group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-xs text-slate-655 text-slate-500 leading-relaxed bg-white/75 p-4 border border-brand-sage/50 rounded-xl font-sans">
                  {selectedType.desc}
                </p>
              </div>

              {/* Spec row badges: Responsive grid columns to prevent squeese on mobile */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-brand-sage/80 pt-4 mt-6 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-green/10 rounded-lg text-brand-green flex items-center justify-center shrink-0">
                    <Home size={14} />
                  </span>
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase font-bold tracking-wider font-sans leading-none">Quarters</span>
                    <span className="font-bold text-xs text-brand-green mt-0.5 block">{selectedType.rooms}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-green/10 rounded-lg text-brand-green flex items-center justify-center shrink-0">
                    <Ruler size={14} />
                  </span>
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase font-bold tracking-wider font-sans leading-none">Bathrooms</span>
                    <span className="font-bold text-xs text-brand-green mt-0.5 block">{selectedType.bathrooms} Bathrooms</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-brand-green/10 rounded-lg text-brand-green flex items-center justify-center shrink-0">
                    <Car size={14} />
                  </span>
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase font-bold tracking-wider font-sans leading-none">Allocated Parking</span>
                    <span className="font-bold text-xs text-brand-green mt-0.5 block">Min. {selectedType.carparks} CP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Loan Mortgage Calculator */}
          <div className="lg:col-span-5 bg-brand-cream rounded-3xl p-5 sm:p-8 border border-brand-sage flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-brand-sage pb-4">
                <h4 className="text-lg font-serif text-brand-green font-normal tracking-tight">Financing & Mortgage Estimator</h4>
                <p className="text-slate-500 text-xs mt-0.5">Adjust purchase budgets and loan values to calculate commitments.</p>
              </div>

              {/* Price Field */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-brand-green-dark uppercase tracking-wider">Purchase Price (RM)</span>
                  <span className="font-mono text-brand-green-dark font-bold text-sm">RM {customPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="1350000"
                  step="5000"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full accent-brand-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Min: RM 500,000</span>
                  <span>Max: RM 1,350,000</span>
                </div>
              </div>

              {/* Downpayment Field */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-brand-green-dark uppercase tracking-wider">Downpayment ({downpaymentPercent}%)</span>
                  <span className="font-mono text-brand-green-dark font-bold text-sm">RM {Math.round((downpaymentPercent/100)*customPrice).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={downpaymentPercent}
                  onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
                  className="w-full accent-brand-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>10% (Std)</span>
                  <span>20%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Loan Tenure years slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-brand-green-dark uppercase tracking-wider">Loan Tenure ({tenureYears} Years)</span>
                  <span className="font-mono text-brand-green-dark font-bold text-sm">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="35"
                  step="5"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-brand-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>20 Yrs</span>
                  <span>30 Yrs</span>
                  <span>35 Yrs</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-brand-green-dark uppercase tracking-wider">Bank Interest Rate</span>
                  <span className="font-mono text-brand-gold-dark font-bold text-sm">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="4.5"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-brand-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>3.0% (Floor)</span>
                  <span>3.85% (Avg)</span>
                  <span>4.5%</span>
                </div>
              </div>
            </div>

            {/* Total Block */}
            <div className="mt-8 bg-brand-green-dark text-white rounded-2xl p-6 border border-brand-green-light/20 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-350 text-slate-400 block">Est. Monthly Installment</span>
                  <span className="text-3xl font-bold text-brand-gold font-serif">RM {calculateMortgage()}</span>
                  <span className="text-[10px] text-slate-350 text-slate-400 block mt-1.5">*Subject to standard bank approval & downpayment margins</span>
                </div>
              </div>

              {/* Direct Layout Action button (Triggers WhatsApp) */}
              <a
                id="layout-custom-wa-cta"
                href={`https://wa.me/60195598932?text=Hi%2C%20I'm%20interested%20in%2520the%2520REN%2520Residence%20Bukit%20Jalil%20-${selectedType.id.toUpperCase().replace('-', ' ')}%20(${selectedType.sqft}%20sqft).%20Please%20send%20me%20early-bird%20rebates%20and%20official%20pricing%20breakdowns.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-[#1F2C27] text-xs font-extrabold rounded-xl shadow-md transition-all uppercase tracking-widest border-none"
              >
                <MessageSquare size={14} />
                <span>Enquire For Exclusive Rebates</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
