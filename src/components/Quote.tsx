import { IMG, drive } from '../data/facts';
import { Reveal } from './Reveal';
import { SafeImg } from './SafeImg';

export default function Quote() {
  return (
    <section className="bg-bone px-6 pb-24 md:px-12 md:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><p className="mx-auto max-w-2xl text-center font-display text-[22px] italic leading-[1.6] text-ink md:text-[28px]">“Inspired by the Chinese character 人 (rén), meaning people: a place to connect, belong and play.”</p></Reveal>
        <Reveal delay={0.1} className="mt-16">
          <div className="frame"><SafeImg src={drive(IMG.infinity_pool, 2400)} alt="The infinity pool on the Ren Residence podium, architectural render" className="aspect-[4/3] w-full object-cover md:aspect-[16/9]" /></div>
        </Reveal>
      </div>
    </section>
  );
}
