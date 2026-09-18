import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const LINKS = [
  { href: '/#address', label: 'Address' }, { href: '/#residences', label: 'Residences' }, { href: '/#facilities', label: 'Facilities' },
  { href: '/#design', label: 'Design' }, { href: '/#location', label: 'Location' }, { href: '/#gallery', label: 'Gallery' }, { href: '/#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(true);
  useEffect(() => {
    const f = () => { const hero = document.getElementById('top'); const bottom = hero ? hero.getBoundingClientRect().bottom : 0; setOnDark(bottom > 72); };
    f(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f); return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const dark = onDark && !open;
  const txt = dark ? 'text-bone' : 'text-ink';
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${dark ? 'bg-charcoal/0' : 'border-b border-frame bg-bone/95 backdrop-blur-sm'}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <a href="/" onClick={() => setOpen(false)} className={`display text-[15px] tracking-[0.3em] ${txt}`}>Ren <span className="font-body text-[13px] tracking-[0.1em] opacity-70">人</span></a>
        <nav className="hidden items-center gap-7 xl:flex">
          {LINKS.map((l) => <a key={l.href} href={l.href} className={`caps ${txt} opacity-75 transition-opacity hover:opacity-100`}>{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-6">
          <a href="/#register" onClick={() => setOpen(false)} className={`caps border-b border-bronze pb-1 ${txt} transition-colors hover:text-bronze`}>Register →</a>
          <button aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((v) => !v)} className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 xl:hidden">
            <span className={`h-px w-5 transition-transform ${dark ? 'bg-bone' : 'bg-ink'} ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-5 transition-transform ${dark ? 'bg-bone' : 'bg-ink'} ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden xl:hidden">
            <div className="flex flex-col px-6 pb-8">
              {LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="caps border-b border-frame py-4 text-ink">{l.label}</a>)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
