import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQBlock {
  q: string;
  a: string;
}

export default function FAQ() {
  const faqs: FAQBlock[] = [
    {
      q: "Is REN Residence a commercial or residential development?",
      a: "REN Residence is a pure residential title condominium. This is an immense advantage for families as it guarantees lower monthly maintenance charges, lower water/electricity utility tariffs (under domestic rates), lower assessment taxes, and a secure environment devoid of commercial shop traffic."
    },
    {
      q: "Is the land tenure Freehold or Leasehold?",
      a: "REN Residence is a residential-titled development with a 98-year leasehold tenure (expiring November 11, 2117)."
    },
    {
      q: "How far is REN Residence from Pavilion Bukit Jalil?",
      a: "It is located approximately 1.8km away, which is roughly a 3-minute drive by car. Residents have almost instant access to Pavilion's massive shopping, fine dining, lifestyle entertainment, and grocery facilities via seamless highway linkages."
    },
    {
      q: "Is REN Residence near public transportation networks?",
      a: "Yes. The Alam Sutera LRT Station (Sri Petaling Line) is within brief walking distance (approx. 500m). Direct covered pathways are planned to ensure seamless weather-protected transit commutes directly into KL Sentral and central business locations."
    },
    {
      q: "How many facilities are there, and what is the maintenance charge?",
      a: "Residents have exclusive access to more than 60 lifestyle facilities including an infinity pool, sky-view panoramic gymnasium, indoor co-working space, L-shaped jogging loops, and wellness zones. The estimated maintenance service charge is highly competitive due to the residential-only nature of the development."
    },
    {
      q: "Are there any special discounts for Bumiputera buyers?",
      a: "Yes. There is an approved 5% Bumiputera discount eligible for qualified buyers during booking phases as approved by Dewan Bandaraya Kuala Lumpur (DBKL)."
    },
    {
      q: "Who is the architect behind the project?",
      a: "The project's architectural firm is the multi-award-winning GDP Architects. They are behind some of Malaysia's most iconic skyline profiles, designing REN's unique '人'-shaped towering wings to elevate privacy and naturally channel breezes."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-12 md:py-24 bg-white text-brand-green-dark scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-dark block font-mono">Clarifying Details</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-brand-green-dark">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          <p className="text-slate-500 text-xs md:text-sm font-sans">
            Everything you need to know about purchasing, financing, or booking a high-floor suite at REN Residence Bukit Jalil.
          </p>
        </div>

        {/* Accordion container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                id={`faq-accordion-item-${idx}`}
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-brand-gold bg-brand-cream/90 shadow-md' 
                    : 'border-brand-sage bg-[#FAFBFB]/50 hover:bg-brand-cream/40'
                }`}
              >
                <button
                  id={`faq-btn-${idx}`}
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-brand-green-dark text-sm md:text-base gap-4 bg-transparent border-none outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`shrink-0 ${isOpen ? 'text-brand-gold-dark' : 'text-[#8DAEA4]'}`} size={18} />
                    <span className="font-sans font-semibold text-brand-green-dark">{faq.q}</span>
                  </div>
                  <div className="shrink-0 p-1 bg-white border border-brand-sage rounded-full text-slate-550 flex items-center justify-center">
                    {isOpen ? <ChevronUp size={14} className="text-brand-green" /> : <ChevronDown size={14} className="text-slate-400" />}
                  </div>
                </button>

                {/* Answer block */}
                {isOpen && (
                  <div id={`faq-answer-${idx}`} className="px-6 pb-6 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-brand-sage">
                    <p className="whitespace-pre-line font-sans">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
