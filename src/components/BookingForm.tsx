import React, { useState } from 'react';
import { Send, Phone, User, Mail, ShieldAlert, Check } from 'lucide-react';
import PDPA_Modal from './PDPA_Modal';

interface BookingFormProps {
  onSuccess: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [layoutInterest, setLayoutInterest] = useState('type-a');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [consentPdpa, setConsentPdpa] = useState(false);
  
  // PDPA Modal state
  const [isPdpaModelOpen, setIsPdpaModelOpen] = useState(false);

  // Statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your contact phone number.");
      return;
    }
    if (!consentPdpa) {
      setErrorMessage("You must accept the PDPA consent check to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Dispatch form data to direct free serverless FormSubmit service for instant email notification
      const formSubmitUrl = "https://formsubmit.co/ajax/saltyfish1987@gmail.com";
      try {
        await fetch(formSubmitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: `[New Lead - Booking] REN Residence - ${name}`,
            "Visitor Name": name,
            "Contact Phone": phone,
            "Email Address": email || "Not provided",
            "Layout Preference": layoutInterest.toUpperCase(),
            "Preferred Contact Channel": preferredContact,
            "Malaysian PDPA Consent": consentPdpa ? "Accepted (Compliant)" : "No",
            _honey: "" // anti-spam honeypot
          })
        });
        console.log("[FORM_SUBMIT] Serverless mail dispatch initiated successfully to saltyfish1987@gmail.com.");
      } catch (fsError) {
        console.error("[FORM_SUBMIT] Serverless dispatch error, falling back to local mailer:", fsError);
      }

      // 2. Dispatch to local lead tracker API for local storage & AdminLeads.tsx panel integration
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          layoutInterest,
          preferredContact,
          consentPdpa
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking application.");
      }

      setIsSuccess(true);
      onSuccess(); // Parent notification

      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setConsentPdpa(false);

      // Reset success message after timeout
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="showroom-appointment" className="py-12 md:py-24 bg-brand-green text-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left instructions block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold-light px-3 py-1.5 rounded-full text-xs font-semibold">
              <ShieldAlert size={12} className="text-brand-gold" />
              <span>Priority VIP Showroom Queues</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">
              Schedule Your Private Showroom Viewing
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold"></div>
            
            <p className="text-[#C1D2CD] text-xs sm:text-sm leading-relaxed font-sans">
              Showroom tours are scheduled privately to ensure complete comfort, undivided attention from our senior marketing advisors, and personalized corporate portfolio comparisons.
            </p>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-brand-green-dark/60 rounded-lg text-brand-gold shrink-0">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider font-sans text-xs">Full Dynamic Sizing Sheet Provided</h4>
                  <p className="mt-1.5 text-[#C1D2CD] leading-normal font-sans">Understand floorplan configurations, ceiling drop specs, material scopes, and real available units.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-brand-green-dark/60 rounded-lg text-brand-gold shrink-0">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider font-sans text-xs">Direct Developer Priority Packages</h4>
                  <p className="mt-1.5 text-[#C1D2CD] leading-normal font-sans">View the latest available promotional waivers, rebate structures, and VIP fully furnished vouchers.</p>
                </div>
              </div>
            </div>

            {/* Direct Instant Backup WhatsApp trigger */}
            <div className="pt-6 border-t border-brand-green-light/20 space-y-3">
              <span className="block text-xs uppercase font-mono text-slate-400 font-bold tracking-widest">Need immediate planning support? Chat live:</span>
              <a
                id="instant-chat-booking-btn"
                href="https://wa.me/60195598932?text=Hi%2C%20I'm%20interested%20in%20appointing%20a%20showroom%20viewing%20for%20REN%20Residence%20Bukit%20Jalil.%20Please%2520share%2520open%2520slots."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-lg transition-all uppercase tracking-wider border-none cursor-pointer"
              >
                <Phone size={14} />
                <span>WhatsApp Coordinator: 019-559 8932</span>
              </a>
            </div>
          </div>

          {/* Right Lead Capture Box */}
          <div className="lg:col-span-6 bg-brand-green-dark/85 p-5 sm:p-8 rounded-3xl border border-brand-green-light/20 shadow-2xl relative">
            
            {/* Show success animation over form */}
            {isSuccess ? (
              <div id="form-success-alert" className="absolute inset-0 bg-brand-green-dark rounded-3xl z-20 flex flex-col items-center justify-center text-center p-8 animate-fadeIn">
                <div className="w-16 h-16 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold rounded-full flex items-center justify-center mb-6">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Viewing Slot Secured!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-6">
                  Thank you for registering your interest. Our senior project coordinator (IQI Realty) will reach out to organize your private VIP walkthrough on your preferred contact channel shortly.
                </p>
                <button
                  id="success-form-reset-btn"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-brand-green hover:bg-brand-green-light text-slate-100 font-bold text-xs rounded-lg transition-colors border-none cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : null}

            <div className="space-y-4">
              <div className="border-b border-brand-green-light/20 pb-4">
                <h3 className="text-xl font-serif text-white">Join Priority Showroom Booking</h3>
                <p className="text-xs text-slate-400 mt-1">Submit the secure form to secure current promotional packages & early release rates.</p>
              </div>

              {errorMessage && (
                <div id="form-error-alert" className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-350 text-rose-450 rounded-xl text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form id="bookings-contact-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-300 font-bold block">Contact Name *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
                    <input
                      id="lead-input-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-green/45 text-sm border border-brand-green-light/20 focus:border-brand-gold text-white rounded-xl py-3 pl-10 pr-4 outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-300 font-bold block">Phone Number * (e.g. 0123456789)</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
                    <input
                      id="lead-input-phone"
                      type="tel"
                      required
                      placeholder="e.g. 0123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-green/45 text-sm border border-brand-green-light/20 focus:border-brand-gold text-white rounded-xl py-3 pl-10 pr-4 outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-300 block font-bold">Email Address (Optional)</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
                    <input
                      id="lead-input-email"
                      type="email"
                      placeholder="e.g. name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-green/45 text-sm border border-brand-green-light/20 focus:border-brand-gold text-white rounded-xl py-3 pl-10 pr-4 outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Selection layouts and contact type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-300 font-bold block">Layout Sizing</label>
                    <select
                      id="lead-select-layout"
                      value={layoutInterest}
                      onChange={(e) => setLayoutInterest(e.target.value)}
                      className="w-full bg-brand-green border border-brand-green-light/20 focus:border-brand-gold text-white rounded-xl p-3 outline-none transition-all text-xs"
                    >
                      <option value="type-a">Type A (920 sqft, 3R2B)</option>
                      <option value="type-b1">Type B1 (1050 sqft, 3+1R2B)</option>
                      <option value="type-b3">Type B3 (1120 sqft, 3+1R2B)</option>
                      <option value="type-c">Type C (1270 sqft, 4+1R3B)</option>
                      <option value="type-d">Type D (1680 sqft, 4+1R3B)</option>
                      <option value="general">General Tour / Brochure</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-300 font-bold block">Preferred Contact</label>
                    <select
                      id="lead-select-contact"
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value as any)}
                      className="w-full bg-brand-green border border-brand-green-light/20 focus:border-brand-gold text-white rounded-xl p-3 outline-none transition-all text-xs"
                    >
                      <option value="whatsapp">WhatsApp Text</option>
                      <option value="call">Direct Voice Call</option>
                      <option value="email">Electronic Email</option>
                    </select>
                  </div>
                </div>

                {/* Consent checkbox (Malaysian PDPA compliant!) */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      id="lead-check-pdpa"
                      type="checkbox"
                      checked={consentPdpa}
                      onChange={(e) => setConsentPdpa(e.target.checked)}
                      className="mt-1 accent-brand-gold text-[#1F2C27] h-4 w-4 bg-brand-green border border-brand-green-light/35"
                    />
                    <span className="text-[10px] text-slate-300 leading-tight">
                      I hereby consent to Gaya Kuasa Sdn Bhd & marketing agents (IQI Realty) processing my personal data to organize my showroom tour, in accordance with the Malaysian{' '}
                      <button
                        id="pdpa-trigger-inline-link"
                        type="button"
                        onClick={() => setIsPdpaModelOpen(true)}
                        className="text-brand-gold hover:underline font-bold inline hover:text-brand-gold-light bg-transparent border-none cursor-pointer p-0"
                      >
                        PDPA Act 2010 Privacy Notice
                      </button>
                      . *
                    </span>
                  </label>
                </div>

                {/* Form submit button */}
                <button
                  id="lead-submit-form-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-gold hover:bg-brand-gold-light disabled:opacity-55 disabled:cursor-not-allowed text-[#1F2C27] font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group border-none cursor-pointer"
                >
                  <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{isSubmitting ? "Transmitting Leads..." : "Secure Showroom Tour Slot"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Render the PDPA compliance modal */}
      <PDPA_Modal isOpen={isPdpaModelOpen} onClose={() => setIsPdpaModelOpen(false)} />
    </section>
  );
}
