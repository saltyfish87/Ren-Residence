import { useState } from 'react';
import { motion } from 'motion/react';
import { LAYOUTS, PROJECT, drive } from '../data/facts';
import { AGENT_CONTACT } from '../data';
import { Reveal } from './Reveal';
import { SafeImg } from './SafeImg';
import { Heading, Body } from './Heading';

export default function Residences() {
  const [i, setI] = useState(0);
  const u = LAYOUTS[i];
  const wa = encodeURIComponent(`Hi ${AGENT_CONTACT.name}, I'm interested in ${u.type} (${u.sqft.toLocaleString()} sq ft) at Ren Residence, Bukit Jalil. Could you share the floor plan and current price list?`);
  return (
    <section id="residences" className="border-t border-frame bg-panel px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><Heading size="lg" center>Floor plans</Heading></Reveal>
        <Reveal delay={0.05}><Body className="mx-auto mt-6 max-w-xl text-center">Six layouts from {PROJECT.builtUpMin} to {PROJECT.builtUpMax.toLocaleString()} sq ft, three to four-plus-one bedrooms, every home with {PROJECT.carPark.replace(' per unit', '')}.</Body></Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-x-7 gap-y-4">
            {LAYOUTS.map((l, k) => (
              <button key={l.type} onClick={() => setI(k)} aria-pressed={k === i} className={`caps border-b pb-2 transition-colors ${k === i ? 'border-ink text-ink' : 'border-transparent text-mute hover:text-ink'}`}>{l.type}</button>
            ))}
          </div>
        </Reveal>
        <motion.div key={u.type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="frame"><SafeImg src={drive(u.image, 1600)} alt={`${u.type} floor plan, ${u.sqft} sq ft`} className="aspect-[4/3] w-full object-contain" /></div>
          </div>
          <div className="lg:col-span-5">
            <Heading as="h3" size="md">{u.type}</Heading>
            <table className="mt-8 w-full border-t border-frame text-[13.5px]">
              <tbody>
                <tr className="border-b border-frame"><td className="py-3 pr-4 text-soft">Built-up</td><td className="tabular py-3 text-right font-display text-[15px] text-ink">{u.sqft.toLocaleString()} sq ft</td></tr>
                <tr className="border-b border-frame"><td className="py-3 pr-4 text-soft">Bedrooms</td><td className="tabular py-3 text-right font-display text-[15px] text-ink">{u.beds}</td></tr>
                <tr className="border-b border-frame"><td className="py-3 pr-4 text-soft">Bathrooms</td><td className="tabular py-3 text-right font-display text-[15px] text-ink">{u.baths}</td></tr>
                <tr className="border-b border-frame"><td className="py-3 pr-4 text-soft">Car park</td><td className="tabular py-3 text-right font-display text-[15px] text-ink">{PROJECT.carPark.replace(' per unit', '')}</td></tr>
              </tbody>
            </table>
            <p className="mt-8 text-[12px] text-mute">Current price list on request. Prices are set by the developer and may change.</p>
            <a href={`https://wa.me/${AGENT_CONTACT.phone}?text=${wa}`} target="_blank" rel="noopener noreferrer" className="caps mt-8 inline-block border-b border-bronze pb-1 text-ink transition-colors hover:text-bronze">Ask about this plan →</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
