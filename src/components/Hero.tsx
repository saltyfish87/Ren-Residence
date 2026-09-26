import { IMG, PROJECT, drive } from '../data/facts';
import { AGENT_CONTACT } from '../data';

const wa = encodeURIComponent(`Hi ${AGENT_CONTACT.name}, I'd like to arrange a private viewing of Ren Residence, Bukit Jalil.`);

/**
 * Full-bleed night aerial render from the developer's sales kit, drifting very slowly (the developer has no film for this
 * project). Reduced-motion users get the still. Same charcoal band and type as the CloutHaus hero.
 */
export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-charcoal text-bone">
      <img src={drive(IMG.aerial_night, 1920)} alt="" aria-hidden fetchPriority="high" referrerPolicy="no-referrer" className="drift absolute inset-0 h-full w-full object-cover object-[50%_40%]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,40,40,0.35)_0%,rgba(40,40,40,0.05)_40%,rgba(40,40,40,0.6)_100%)]" />
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <p style={{ animationDelay: '0.2s' }} className="rise caps text-bronze">{PROJECT.name} · {PROJECT.area}, Kuala Lumpur</p>
        <h1 style={{ animationDelay: '0.35s' }} className="rise mt-5 max-w-3xl display text-[26px] leading-[1.22] text-bone md:text-[38px] lg:text-[44px]">A home shaped like the character for people</h1>
        <p style={{ animationDelay: '0.5s' }} className="rise mt-6 max-w-md text-[13.5px] leading-[1.85] text-bone/75">Twin 52-storey towers by {PROJECT.developer}, designed by {PROJECT.architect}. Family layouts of {PROJECT.builtUpMin} to {PROJECT.builtUpMax.toLocaleString()} sq ft.</p>
        <div style={{ animationDelay: '0.65s' }} className="rise mt-9 flex flex-wrap items-center gap-8">
          <a href={`https://wa.me/${AGENT_CONTACT.phone}?text=${wa}`} target="_blank" rel="noopener noreferrer" className="caps border-b border-bronze pb-1 text-bone transition-colors hover:text-bronze">Book a private viewing →</a>
          <a href="#address" className="caps text-bone/60 transition-colors hover:text-bone">Explore the address</a>
        </div>
      </div>
    </section>
  );
}
