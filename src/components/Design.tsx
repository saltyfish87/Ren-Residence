import { IMG, KEY_FEATURES, PROJECT, drive } from '../data/facts';
import { Reveal } from './Reveal';
import { SafeImg } from './SafeImg';
import { Heading, Body } from './Heading';

export default function Design() {
  return (
    <section id="design" className="border-t border-frame bg-panel px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5 lg:pr-6">
          <Reveal><p className="caps text-bronze">{PROJECT.architect}</p></Reveal>
          <Reveal delay={0.05}><Heading size="lg" className="mt-4">Shaped for light, air and privacy</Heading></Reveal>
          <Reveal delay={0.1}><Body className="mt-10 max-w-md">The two towers are drawn in the shape of the character 人, so that every home faces open air: more sunlight, cross-ventilation through the wings, and no living room looking straight into another.</Body></Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 flex max-w-md flex-col gap-3 border-t border-frame pt-8 text-[13.5px] leading-[1.7] text-soft">
              {KEY_FEATURES.map((f) => <li key={f} className="flex gap-3"><span className="mt-[9px] h-px w-4 shrink-0 bg-bronze" />{f}</li>)}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          {/* The dusk render is a 4:5 portrait; the frame keeps that ratio so nothing is cropped. */}
          <div className="frame mx-auto w-full max-w-[560px] lg:ml-auto"><SafeImg src={drive(IMG.facade_dusk, 1800)} alt="Ren Residence facade at dusk, architectural render" className="aspect-[4/5] w-full object-cover" /></div>
        </Reveal>
      </div>
    </section>
  );
}
