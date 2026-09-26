import { IMG, PROJECT, drive } from '../data/facts';
import { Reveal } from './Reveal';
import { SafeImg } from './SafeImg';
import { Heading, Body } from './Heading';

export default function Address() {
  const facts: [string, string][] = [
    ['Tenure', PROJECT.tenure], ['Storeys', String(PROJECT.storeys)], ['Residences', PROJECT.totalUnits.toLocaleString()], ['Land', PROJECT.landSize],
    ['Built-up', `${PROJECT.builtUpMin} – ${PROJECT.builtUpMax.toLocaleString()} sq ft`], ['Completion', String(PROJECT.completionYear)],
  ];
  return (
    <section id="address" className="bg-bone px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6">
          <div className="frame"><SafeImg src={drive(IMG.facade, 1600)} alt="Ren Residence twin towers, architectural render" className="aspect-[4/5] w-full object-cover" /></div>
        </Reveal>
        <div className="lg:col-span-6 lg:pl-6">
          <Reveal><Heading size="lg">Bukit Jalil, on the hill</Heading></Reveal>
          <Reveal delay={0.05}><Body className="mt-10 max-w-lg">Ren Residence stands on an elevated {PROJECT.landSize.toLowerCase()} site at {PROJECT.address}, in the Bukit Jalil neighbourhood that has grown up around the National Stadium, Pavilion Bukit Jalil and the Alam Sutera LRT station.</Body></Reveal>
          <Reveal delay={0.1}><Body className="mt-5 max-w-lg">A residential title, {PROJECT.totalUnits.toLocaleString()} homes across two towers, {PROJECT.unitsPerFloor} to a floor and {PROJECT.lifts} lifts per tower, with more than an acre of the site given to families, sport and play.</Body></Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-12 grid grid-cols-2 gap-x-10 gap-y-7 border-t border-frame pt-10 sm:grid-cols-4">
              {facts.map(([k, v]) => <div key={k}><dt className="caps text-mute">{k}</dt><dd className="tabular mt-2 font-display text-[17px] text-ink">{v}</dd></div>)}
            </dl>
          </Reveal>
          <Reveal delay={0.2}><p className="mt-8 text-[12px] text-mute">{PROJECT.landTitle} title · {PROJECT.towers} towers · Developer: {PROJECT.developer} · Architect: {PROJECT.architect} · {PROJECT.status}</p></Reveal>
        </div>
      </div>
    </section>
  );
}
