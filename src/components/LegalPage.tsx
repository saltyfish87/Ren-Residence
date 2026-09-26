import { useEffect } from 'react';
import { LEGAL } from '../legal';
import { AGENT_CONTACT } from '../data';

const LOGO = 'https://lh3.googleusercontent.com/d/1DEI8SZwy7r-QIn1AQPaGgzPV4ZM49Uzv=w400';
const HOME_TITLE = 'Ren Residence Bukit Jalil | Family Residences by Gaya Kuasa';

export function LegalPage({ slug }: { slug: 'terms' | 'privacy' | 'disclaimer' }) {
  const doc = LEGAL.find((d) => d.slug === slug)!;
  useEffect(() => { window.scrollTo(0, 0); document.title = `${doc.title} | Ren Residence Bukit Jalil`; return () => { document.title = HOME_TITLE; }; }, [slug, doc.title]);
  return (
    <section className="bg-bone px-6 pb-28 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="caps text-mute transition-colors hover:text-ink">← Ren Residence</a>
        <h1 className="mt-8 display text-[26px] text-ink md:text-[34px]">{doc.title}</h1>
        <p className="mt-6 text-[14.5px] leading-[1.85] text-soft">{doc.intro}</p>
        <div className="mt-12 flex flex-col gap-10 border-t border-frame pt-10">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-[17px] tracking-[0.06em] text-ink">{s.h}</h2>
              {s.p.map((t, i) => <p key={i} className="mt-3 text-[13.5px] leading-[1.85] text-soft">{t}</p>)}
            </section>
          ))}
        </div>
        <div className="mt-14 flex items-center justify-between gap-6 border-t border-frame pt-8 text-[12px] text-mute">
          <span>Last updated 18 September 2026 · {AGENT_CONTACT.name} · {AGENT_CONTACT.ren}</span>
          <img src={LOGO} alt="IQI Realty" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
        </div>
      </div>
    </section>
  );
}
