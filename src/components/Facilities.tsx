import { FACILITY_GROUPS, IMG, drive } from '../data/facts';
import { Reveal } from './Reveal';
import { SafeImg } from './SafeImg';
import { Heading, Body } from './Heading';

const ALL = FACILITY_GROUPS.flatMap((g) => g.items);
/** The developer lists the podium facilities as one long list; shown here in five families, each item once, with the sales-kit renders. */
const FAMILIES: { key: string; title: string; photo: string; test: RegExp }[] = [
  { key: 'water', title: 'Water & play', photo: IMG.infinity_pool, test: /pool|jacuzzi|shower|kid|children|parent/i },
  { key: 'sport', title: 'Sport & movement', photo: IMG.gym_cardio, test: /court|gym|jogging|turf|changing room/i },
  { key: 'wellness', title: 'Wellness & quiet', photo: IMG.yoga, test: /yoga|sauna|steam|therapy|garden|seating|outdoor lounge/i },
  { key: 'family', title: 'Family & learning', photo: IMG.game_room, test: /tadika|kindergarten|taska|childcare|games room|multipurpose hall/i },
  { key: 'social', title: 'Work, gather & services', photo: IMG.cafe_lounge, test: /./ },
];
const taken = new Set<string>();
const GROUPS = FAMILIES.map((f) => ({ ...f, items: ALL.filter((it) => { if (taken.has(it) || !f.test.test(it)) return false; taken.add(it); return true; }) }));

export default function Facilities() {
  return (
    <section id="facilities" className="bg-bone px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><Heading size="lg" center>An acre for the family</Heading></Reveal>
        <Reveal delay={0.05}><Body className="mx-auto mt-6 max-w-2xl text-center">More than an acre of the podium is given over to residents: pools for every age, courts for every sport, quiet rooms, a kindergarten and childcare centre, and rooms to work and gather. {ALL.length} facilities in the developer's list.</Body></Reveal>
        <div className="mt-20 flex flex-col gap-24">
          {GROUPS.map((G, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={G.key} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                  <div className="frame"><SafeImg src={drive(G.photo, 1800)} alt={`${G.title}, architectural render`} className="aspect-[16/10] w-full object-cover" /></div>
                </Reveal>
                <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:pr-6' : 'lg:pl-6'}`}>
                  <Reveal><p className="caps text-bronze">Podium</p></Reveal>
                  <Reveal delay={0.05}><Heading as="h3" size="md" className="mt-4">{G.title}</Heading></Reveal>
                  <Reveal delay={0.1}>
                    <ul className="mt-8 columns-2 gap-8 text-[13.5px] leading-[2] text-soft">
                      {G.items.map((f) => <li key={f} className="break-inside-avoid">{f}</li>)}
                    </ul>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
