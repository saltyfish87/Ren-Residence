import React, { useState } from 'react';
import { ShieldCheck, MessageSquare, Phone, Mail, Building, Key, MapPin } from 'lucide-react';
import PDPA_Modal from './PDPA_Modal';

export default function Footer() {
  const [pdpaOpen, setPdpaOpen] = useState(false);

  return (
    <footer id="footer-legal" className="bg-brand-green-dark text-slate-350 font-sans text-xs pt-16 pb-8 border-t border-brand-green-light/20 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6 space-y-12 animate-fadeIn">
        
        {/* Upper Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-brand-green-light/15 pb-12">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-brand-gold rounded shadow">
                <span className="text-base font-serif text-[#1F2C27] font-semibold">人</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-white tracking-wider">REN RESIDENCE BUKIT JALIL</span>
                <span className="block text-[9px] text-brand-gold font-bold uppercase tracking-widest font-mono">Authorized VIP Agency Channel</span>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-sm font-sans">
              An independent marketing channel managed directly by authorized elite project coordinators (authorized under IQI Realty Sdn Bhd). Handled in strict compliance with Malaysian real estate advertising policies.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="block text-white font-bold text-xs uppercase tracking-wider font-mono">Privacy Policies</span>
            <ul className="space-y-2 font-sans">
              <li>
                <button 
                  id="foot-pdpa-link"
                  onClick={() => setPdpaOpen(true)}
                  className="hover:text-brand-gold text-left cursor-pointer bg-transparent border-none text-slate-400 hover:underline p-0"
                >
                  Personal Data Consent (PDPA)
                </button>
              </li>
              <li>
                <a 
                  id="foot-terms-link"
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setPdpaOpen(true); }}
                  className="hover:text-brand-gold text-slate-400 hover:underline"
                >
                  Website Terms of Use
                </a>
              </li>
              <li>
                <a 
                  id="foot-ad-compliance-link"
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert("Security Policy Guaranteed: This verified agency portal operates under high-grade SSL encryption and stores customer records safely in a client-consented database with zero trackers."); }}
                  className="hover:text-brand-gold text-slate-400 hover:underline"
                >
                  Certified Trust Agreement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="md:col-span-4 space-y-3">
            <span className="block text-white font-bold text-xs uppercase tracking-wider font-mono">Project Marketing Desk</span>
            <div className="space-y-2.5 text-slate-400 font-sans">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand-gold" />
                <span>Contact Hotline: <a href="tel:+60195598932" className="hover:text-brand-gold font-bold hover:underline">019-559 8932</a></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#25D366]" />
                <span>Immediate WhatsApp: <a href="https://wa.me/60195598932" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold font-semibold hover:underline">Chat With Agent</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand-gold" />
                <span>Broker Representative: <span className="text-slate-300 font-semibold">IQI Realty Sdn Bhd</span></span>
              </div>
            </div>
          </div>
        </div>



        {/* Copyright and signature */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4 pt-4 border-t border-brand-green-light/15 font-sans">
          <span>&copy; 2026 Gaya Kuasa Sdn Bhd &amp; Juta Asia Corporation. All rights reserved.</span>
          <span className="font-mono text-[10px] text-brand-gold/60">Property Safety Audit: Guaranteed APDL Compliant</span>
        </div>

      </div>

      {/* Render terms modally */}
      <PDPA_Modal isOpen={pdpaOpen} onClose={() => setPdpaOpen(false)} />
    </footer>
  );
}
