import { AMENITIES, DISTANCES, IMG, PROJECT, drive } from '../data/facts';
import { Reveal } from './Reveal';
import { SafeImg } from './SafeImg';
import { Heading, Body } from './Heading';

export default function Location() {
  return (
    <section id="location" className="bg-bone px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6"><Reveal><Heading size="lg">The Bukit Jalil that grew up</Heading></Reveal></div>
          <div className="lg:col-span-6"><Reveal delay={0.05}><Body className="max-w-lg">Alam Sutera LRT station is about 500 m away; Pavilion Bukit Jalil about 1.8 km. Tzu Chi International School, IMU and Kingsgate International School are minutes away, and the KESAS, Bukit Jalil, KL–Seremban and Sungai Besi expressways connect the rest of the city.</Body></Reveal></div>
        </div>
        <Reveal delay={0.1} className="mt-14">
          <div className="frame"><SafeImg src={drive(IMG.location_map, 1600)} alt="Ren Residence location map, Bukit Jalil" className="w-full object-cover" /></div>
          <p className="caps mt-3 text-mute">Location map · {PROJECT.address}</p>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {AMENITIES.map((g, i) => (
            <Reveal key={g.category} delay={0.05 + i * 0.03}>
              <h3 className="caps text-bronze">{g.category}</h3>
              <ul className="mt-4 flex flex-col gap-1.5 border-t border-frame pt-4 text-[12.5px] leading-[1.7] text-soft">
                {g.items.map((it) => <li key={it}>{it}{DISTANCES[it] ? <span className="block text-[11.5px] text-mute">{DISTANCES[it]}</span> : null}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
