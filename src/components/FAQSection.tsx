import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '../data/facts';
import { Reveal } from './Reveal';
import { Heading } from './Heading';

/** The same Q&As are in the FAQPage structured data in index.html; keep both in sync. */
export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-bone px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal><Heading size="lg" center>Frequently asked</Heading></Reveal>
        <div className="mt-14 divide-y divide-frame border-y border-frame">
          {FAQ.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx}>
                <button type="button" onClick={() => setOpen(isOpen ? null : idx)} aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`} className="group flex w-full items-center justify-between gap-8 py-6 text-left">
                  <h3 className="font-display text-[15px] text-ink transition-colors group-hover:text-bronze md:text-[16px]">{item.q}</h3>
                  <span className="shrink-0 text-bronze">{isOpen ? <Minus className="h-4 w-4" strokeWidth={1.2} /> : <Plus className="h-4 w-4" strokeWidth={1.2} />}</span>
                </button>
                <div id={`faq-answer-${idx}`} hidden={!isOpen} className="pb-7 pr-12">
                  <p className="text-[13.5px] leading-[1.85] text-soft">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
