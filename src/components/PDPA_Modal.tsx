import React from 'react';
import { X } from 'lucide-react';

interface PDPA_ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PDPA_Modal({ isOpen, onClose }: PDPA_ModalProps) {
  if (!isOpen) return null;

  return (
    <div id="pdpa-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div id="pdpa-modal-content" className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Personal Data Protection Notice (PDPA)</h3>
          <button 
            id="pdpa-close-btn"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] text-sm text-gray-600 leading-relaxed space-y-4">
          <p className="font-medium text-gray-800">
            In compliance with the Personal Data Protection Act 2010 (PDPA) of Malaysia, this notice is issued to all valued customers and website visitors of Gaya Kuasa Sdn Bhd, Juta Asia Corporation, and their authorised marketing representatives (collectively referred to as "We" or "Us").
          </p>

          <h4 className="font-semibold text-gray-800 text-base mt-4">1. Collection of Personal Data</h4>
          <p>
            We collect personal data provided directly by you through interactive forms on this landing page, including your name, email address, phone number, and unit preferences.
          </p>

          <h4 className="font-semibold text-gray-800 text-base mt-4">2. Purposes of Processing</h4>
          <p>
            Your personal data is collected, parsed, and processed for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To schedule showroom appointments or private viewings.</li>
            <li>To deliver property pricing sheets, brochures, or promotional updates.</li>
            <li>To facilitate authorised marketing agents (such as IQI Realty representatives) to communicate project details via phone calls, electronic mail, or WhatsApp messages.</li>
            <li>To fulfill statutory, commercial, and administrative duties related to the promotion and sale of REN Residence Bukit Jalil.</li>
          </ul>

          <h4 className="font-semibold text-gray-800 text-base mt-4">3. Disclosure & Security</h4>
          <p>
            Your database record is kept strictly confidential and secure. It is only shared with developer managers and authorised project marketers. We do not sell, rent, or lease your personal information to third-party brokers.
          </p>

          <h4 className="font-semibold text-gray-800 text-base mt-4">4. Rights of Access and Correction</h4>
          <p>
            You have the right to request access to and correction of your personal data held by us. You can request to withdraw your consent and request that we delete your record at any time by contacting our marketing desk or writing directly to us.
          </p>
          
          <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
            Last Updated: June 2026. This landing page is managed by authorised project marketing executives.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            id="pdpa-ok-btn"
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg transition-all"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
