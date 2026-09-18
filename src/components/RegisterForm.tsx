import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { AGENT_CONTACT, FORM_ENDPOINT } from '../data';
import { LAYOUTS } from '../data/facts';
import { Reveal } from './Reveal';
import { Heading, Body } from './Heading';

const UNITS = LAYOUTS.map((l) => `${l.type} (${l.sqft.toLocaleString()} sq ft, ${l.beds} bedrooms)`);

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', preferredUnit: 'General enquiry', message: '', consent: false });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const t = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [t.name]: t.type === 'checkbox' ? t.checked : t.value }));
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.consent) return; setBusy(true); setStatus('idle');
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ _subject: `[New Lead] Ren Residence - ${form.name}`, 'Visitor Name': form.name, 'Contact Phone': form.phone, 'Email Address': form.email || 'Not provided', 'Layout Preference': form.preferredUnit, Message: form.message, 'PDPA Consent': 'Accepted', _captcha: 'false', _honey: '' }) });
      const j = await r.json();
      if (r.ok && (j.success === 'true' || j.success === true)) { setStatus('ok'); setForm({ name: '', phone: '', email: '', preferredUnit: 'General enquiry', message: '', consent: false }); } else setStatus('err');
    } catch { setStatus('err'); } finally { setBusy(false); }
  };
  const wa = encodeURIComponent(`Hi ${AGENT_CONTACT.name}, I'm interested in Ren Residence, Bukit Jalil.${form.preferredUnit !== 'General enquiry' ? ` Preferred: ${form.preferredUnit}.` : ''} Please share the latest price list and floor plans.${form.name ? ` My name is ${form.name}.` : ''}`);
  const input = 'w-full border-b border-frame bg-transparent py-3 text-[14px] text-ink placeholder:text-mute focus:border-bronze focus:outline-none';
  const label = 'caps text-mute';
  return (
    <section id="register" className="border-t border-frame bg-panel px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal><Heading size="lg" center>Register your interest</Heading></Reveal>
        <Reveal delay={0.05}><Body className="mt-6 text-center">Leave your details for the floor plans, the current price list and a private viewing.</Body></Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            <div><label htmlFor="name" className={label}>Name *</label><input id="name" name="name" required value={form.name} onChange={onChange} className={input} /></div>
            <div><label htmlFor="phone" className={label}>Phone / WhatsApp *</label><input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} placeholder="+60" className={input} /></div>
            <div><label htmlFor="email" className={label}>Email</label><input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="example@email.com" className={input} /></div>
            <div><label htmlFor="preferredUnit" className={label}>Preferred layout</label>
              <select id="preferredUnit" name="preferredUnit" value={form.preferredUnit} onChange={onChange} className={input}>
                <option value="General enquiry">General enquiry</option>
                {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select></div>
            <div className="md:col-span-2"><label htmlFor="message" className={label}>Message</label><textarea id="message" name="message" rows={3} value={form.message} onChange={onChange} className={input} /></div>
            <label className="flex items-start gap-3 text-[12px] leading-[1.7] text-mute md:col-span-2">
              <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} required className="mt-1 accent-bronze" />
              <span>I agree to be contacted about Ren Residence and to my details being handled under the Personal Data Protection Act 2010, as described in the <a href="/privacy" className="underline underline-offset-2 hover:text-ink">Privacy Policy</a>.</span>
            </label>
            <div className="flex flex-wrap items-center gap-8 md:col-span-2">
              <button type="submit" disabled={busy} className="caps inline-flex items-center gap-3 border-b border-bronze pb-1 text-ink transition-colors hover:text-bronze disabled:opacity-50"><Send className="h-3.5 w-3.5" strokeWidth={1.2} />{busy ? 'Sending' : 'Register now'}</button>
              <a href={`https://wa.me/${AGENT_CONTACT.phone}?text=${wa}`} target="_blank" rel="noopener noreferrer" className="caps text-soft transition-colors hover:text-bronze">WhatsApp {AGENT_CONTACT.phoneDisplay}</a>
              {status === 'ok' && <span className="text-[13px] text-bronze">Received. We will be in touch shortly.</span>}
              {status === 'err' && <span className="text-[13px] text-red-700">Could not send. Please use WhatsApp instead.</span>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
