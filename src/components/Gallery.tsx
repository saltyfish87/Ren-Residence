import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { IMG, drive } from '../data/facts';
import { Reveal } from './Reveal';
import { SafeImg } from './SafeImg';
import { Heading } from './Heading';

const SHOTS = [
  { id: IMG.facade_dusk, name: 'The towers at dusk', tall: true },
  { id: IMG.main_lobby, name: 'Main lobby' },
  { id: IMG.lobby_water, name: 'Lobby water feature' },
  { id: IMG.community_kitchen, name: 'Community kitchen and café' },
  { id: IMG.dining_function, name: 'Dining and function room' },
  { id: IMG.gym_weight, name: 'Gymnasium' },
];

export default function Gallery() {
  const [active, setActive] = useState<(typeof SHOTS)[number] | null>(null);
  return (
    <section id="gallery" className="border-t border-frame bg-panel px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><Heading size="lg" center>Gallery</Heading></Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {SHOTS.map((g, i) => (
            <Reveal key={g.id} delay={Math.min(i * 0.05, 0.3)} className={g.tall ? 'md:row-span-2' : ''}>
              <button type="button" onClick={() => setActive(g)} className="frame group block h-full w-full text-left">
                <SafeImg src={drive(g.id, g.tall ? 1800 : 1400)} alt={`${g.name}, architectural render`} loading="eager" className={`w-full object-cover transition-opacity group-hover:opacity-90 ${g.tall ? 'aspect-[3/4] md:h-full md:aspect-auto' : 'aspect-[4/3]'}`} />
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-[12px] text-mute">Artist's impressions from the developer's sales kit; the completed development may differ.</p>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-6" onClick={() => setActive(null)}>
            <button aria-label="Close" className="absolute right-6 top-6 text-bone/80 hover:text-bone" onClick={() => setActive(null)}><X className="h-7 w-7" strokeWidth={1.2} /></button>
            <img src={drive(active.id, 2400)} alt={`${active.name}, architectural render`} className="max-h-[90vh] max-w-full object-contain" referrerPolicy="no-referrer" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
