import { AGENT_CONTACT } from '../data';
import { PROJECT } from '../data/facts';

const LOGO = 'https://lh3.googleusercontent.com/d/1DEI8SZwy7r-QIn1AQPaGgzPV4ZM49Uzv=w400';
const LEGAL = [['/terms', 'Terms & Conditions'], ['/privacy', 'Privacy Policy'], ['/disclaimer', 'Disclaimer']];

export default function Footer({ onAgentDesk }: { onAgentDesk?: () => void }) {
  return (
    <footer className="bg-charcoal px-6 py-16 text-bone md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 border-b border-bone/15 pb-12 md:grid-cols-3">
          <div>
            <p className="display text-[15px] tracking-[0.3em]">Ren Residence</p>
            <p className="mt-4 text-[12.5px] leading-[1.8] text-bone/60">{PROJECT.address}<br />{PROJECT.developer} · {PROJECT.architect}</p>
          </div>
          <div>
            <p className="caps text-bronze">Marketed by</p>
            <p className="mt-4 text-[12.5px] leading-[1.8] text-bone/80">{AGENT_CONTACT.name} · {AGENT_CONTACT.ren}<br />{AGENT_CONTACT.agency} {AGENT_CONTACT.agencyCode}<br />{AGENT_CONTACT.phoneDisplay} · {AGENT_CONTACT.email}</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="bg-bone px-4 py-3"><img src={LOGO} alt="IQI Realty Sdn Bhd" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" /></div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-bone/60">
              {LEGAL.map(([href, label]) => <a key={href} href={href} className="transition-colors hover:text-bone">{label}</a>)}
              {onAgentDesk && <button type="button" onClick={onAgentDesk} className="transition-colors hover:text-bone">Agent desk</button>}
            </nav>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 text-[11.5px] leading-[1.8] text-bone/45">
          <p>This website is managed by an authorised real estate negotiator for marketing purposes and is not the developer's official website. It is a real estate advertisement, not a contract of sale, financial advice or an investment guarantee.</p>
          <p>Renders are artist's impressions from the developer's sales kit and may differ from the completed development. Layouts, specifications, unit count and facilities are subject to change by the developer and the relevant authorities. Prices are stated as a starting price only.</p>
          <p>&copy; {new Date().getFullYear()} {AGENT_CONTACT.name}, {AGENT_CONTACT.agency}.</p>
        </div>
      </div>
    </footer>
  );
}
