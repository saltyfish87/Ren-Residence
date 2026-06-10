import React, { useState, useEffect } from 'react';
import { Shield, Key, Download, RefreshCw, CheckCircle, Trash, X, Calendar, Phone, Mail, FileText, Globe, Settings, Save } from 'lucide-react';
import { Lead } from '../types';

interface AdminLeadsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLeads({ isOpen, onClose }: AdminLeadsProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'junk'>('all');
  
  // SEO and site verification state
  const [activeTab, setActiveTab] = useState<'leads' | 'seo'>('leads');
  const [googleCode, setGoogleCode] = useState('');
  const [isSavingSeo, setIsSavingSeo] = useState(false);
  const [seoSuccess, setSeoSuccess] = useState(false);

  // Notes updating buffer states
  const [activeNoteText, setActiveNoteText] = useState<Record<string, string>>({});

  const fetchSeoSettings = async () => {
    try {
      const response = await fetch('/api/seo');
      const data = await response.json();
      if (response.ok && data.success) {
        setGoogleCode(data.googleSiteVerification || '');
      }
    } catch (err) {
      console.error("Failed to fetch SEO settings:", err);
    }
  };

  const handleSaveSeoSettings = async () => {
    setIsSavingSeo(true);
    setSeoSuccess(false);
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          passcode: 'REN2026',
          googleSiteVerification: googleCode
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update SEO configuration.");
      }
      setSeoSuccess(true);
      setTimeout(() => setSeoSuccess(false), 3000);
    } catch (err: any) {
      alert("Failed to save SEO configuration: " + err.message);
    } finally {
      setIsSavingSeo(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (passcode === "REN2026") {
      setIsAuthenticated(true);
      fetchLeads();
      fetchSeoSettings();
    } else {
      setErrorMessage("Incorrect agent passcode. Please check your credentials.");
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`/api/leads?passcode=REN2026`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load database records.");
      }
      setLeads(data.leads || []);
      
      // Seed notes buffer
      const buffer: Record<string, string> = {};
      (data.leads || []).forEach((lead: Lead) => {
        buffer[lead.id] = lead.notes || '';
      });
      setActiveNoteText(buffer);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred fetching leads.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: 'new' | 'contacted' | 'junk') => {
    try {
      const response = await fetch(`/api/leads/${leadId}?passcode=REN2026`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      // Update local state
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    try {
      const noteToSave = activeNoteText[leadId] || '';
      const response = await fetch(`/api/leads/${leadId}?passcode=REN2026`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteToSave })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      // Update local state
      setLeads(leads.map(l => l.id === leadId ? { ...l, notes: noteToSave } : l));
      alert("Notes saved successfully!");
    } catch (err: any) {
      alert("Failed to save notes: " + err.message);
    }
  };

  const handleNoteChange = (leadId: string, text: string) => {
    setActiveNoteText({
      ...activeNoteText,
      [leadId]: text
    });
  };

  const filteredLeads = leads.filter(l => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] text-white animate-fade-in">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/15 border border-amber-500/25 text-amber-500 rounded-lg">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">IQI Realty Agent Desk</h2>
              <p className="text-xs text-slate-400 font-sans">Manage showroom visitors and SEO configurations for REN Residence Bukit Jalil</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 hover:bg-slate-800/50 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Passcode Protection gate */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto space-y-6">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full flex items-center justify-center">
              <Key size={24} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-base font-bold text-white">Secure Credentials Required</h3>
              <p className="text-xs text-slate-400 leading-normal font-sans">
                This dashboard contains confidential visitor information protected by personal privacy regulations. Please enter the authorised project passcode to proceed.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                required
                placeholder="Enter Access Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full p-3 bg-slate-950 text-white text-center text-sm font-mono border border-slate-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
              />
              {errorMessage && (
                <p className="text-[11px] text-rose-500 text-center font-semibold">{errorMessage}</p>
              )}
              <div className="text-slate-500 text-[10px] text-center italic mt-1 bg-white/5 p-2 rounded">
                 Hint: Passcode is "REN2026"
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Verify & Unlock Desk
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated content */
          <div className="flex-1 flex flex-col min-h-0 bg-slate-950/40">
            
            {/* View navigation switcher */}
            <div className="flex border-b border-slate-800 bg-slate-950 px-6 py-1 gap-2">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                  activeTab === 'leads'
                    ? 'border-amber-500 text-amber-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Leads Registry ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                  activeTab === 'seo'
                    ? 'border-amber-500 text-amber-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                SEO & Site Verification
              </button>
            </div>

            {activeTab === 'leads' ? (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Toolbar strip */}
                <div className="p-4 bg-slate-950 border-b border-slate-900/60 flex flex-wrap gap-4 items-center justify-between">
                  {/* Filter tabs */}
                  <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                    {(['all', 'new', 'contacted', 'junk'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                          filter === t 
                            ? 'bg-slate-800 text-amber-400 border border-slate-700/60' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchLeads}
                      disabled={isLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold transition-all text-slate-300 cursor-pointer"
                    >
                      <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                      <span>Refresh DB</span>
                    </button>

                    <a
                      href={`/api/leads/export?passcode=REN2026`}
                      download
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow transition-all cursor-pointer"
                    >
                      <Download size={12} />
                      <span>Download CRM CSV</span>
                    </a>
                  </div>
                </div>

                {/* Error alerts inside */}
                {errorMessage && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/25 text-rose-450 text-xs m-4 rounded-xl">
                    {errorMessage}
                  </div>
                )}

                {/* Main leads lists wrapper */}
                {isLoading ? (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <RefreshCw size={32} className="text-amber-500 animate-spin" />
                    <span className="text-xs text-slate-400 mt-2 font-mono">Querying Leads records...</span>
                  </div>
                ) : filteredLeads.length === 0 ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
                    <FileText size={40} className="text-slate-700 mb-2" />
                    <h4 className="text-sm font-bold text-slate-400">No matching leads in selection</h4>
                    <p className="text-xs text-slate-500 max-w-sm mt-1 font-sans">Submit test entries in the scheduling form to populate records live on the server.</p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className={`p-5 rounded-xl border flex flex-col md:flex-row gap-6 justify-between items-start md:items-stretch bg-slate-900 ${
                          lead.status === 'contacted' 
                            ? 'border-slate-800 bg-slate-900/50 opacity-80' 
                            : lead.status === 'junk' 
                            ? 'border-red-950/50 bg-slate-950/20' 
                            : 'border-slate-800 border-l-2 border-l-amber-500'
                        }`}
                      >
                        {/* Visitor meta info */}
                        <div className="space-y-2 max-w-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-100 text-base">{lead.name}</span>
                            <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                              lead.status === 'new' 
                                ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20' 
                                : lead.status === 'contacted' 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-rose-500/10 text-rose-450 text-slate-500'
                            }`}>
                              {lead.status}
                            </span>
                          </div>

                          <div className="space-y-1 text-xs text-slate-400 font-sans">
                            <div className="flex items-center gap-1.5">
                              <Phone size={12} className="text-slate-500" />
                              <a href={`tel:${lead.phone}`} className="hover:underline text-amber-400 hover:text-amber-300">{lead.phone}</a>
                            </div>
                            {lead.email && (
                              <div className="flex items-center gap-1.5">
                                <Mail size={12} className="text-slate-500" />
                                <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 font-mono text-[10px]">
                              <Calendar size={12} className="text-slate-500" />
                              <span>Submitted: {new Date(lead.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interest details */}
                        <div className="space-y-1.5 flex flex-col justify-center min-w-[150px]">
                          <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Interest Particulars</span>
                          <p className="text-xs font-bold text-white uppercase font-sans">Layout: {lead.layoutInterest.toUpperCase()}</p>
                          <p className="text-xs text-slate-450 font-sans">Contact preference: <span className="font-semibold text-slate-250 capitalize text-slate-350">{lead.preferredContact}</span></p>
                        </div>

                        {/* Quick status updates and custom internal notes */}
                        <div className="flex-1 max-w-md flex flex-col justify-between gap-2 border-l border-white/5 pl-0 md:pl-6">
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">Agent Private Notes</span>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Add lead follow-up notes here..."
                                value={activeNoteText[lead.id] || ''}
                                onChange={(e) => handleNoteChange(lead.id, e.target.value)}
                                className="flex-1 bg-slate-950 p-2 text-xs rounded border border-slate-800 outline-none focus:border-amber-500 text-slate-300"
                              />
                              <button
                                onClick={() => handleSaveNotes(lead.id)}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs font-bold text-amber-400 cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </div>

                          {/* Status switch shortcuts */}
                          <div className="flex items-center gap-3 pt-2">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Move Status:</span>
                            <div className="flex gap-2">
                              {lead.status !== 'contacted' && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'contacted')}
                                  className="text-[10px] p-1 px-2 border border-emerald-500/20 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white rounded transition-colors cursor-pointer"
                                >
                                  mark contacted
                                </button>
                              )}
                              {lead.status !== 'junk' && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'junk')}
                                  className="text-[10px] p-1 px-2 border border-rose-500/20 text-rose-400 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded transition-colors cursor-pointer"
                                >
                                  mark junk
                                </button>
                              )}
                              {lead.status !== 'new' && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'new')}
                                  className="text-[10px] p-1 px-2 border border-slate-700 text-slate-400 bg-slate-850 hover:bg-slate-700 hover:text-white rounded transition-colors cursor-pointer"
                                >
                                  re-open standard
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* SEO Configuration tab panel */
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
                
                {/* 1. Google Site Verification Box */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Globe size={18} />
                    <h3 className="text-sm font-bold uppercase tracking-wider font-mono">Google Search Console Registration</h3>
                  </div>
                  
                  <p className="text-xs text-slate-450 text-slate-400 leading-relaxed font-sans">
                    Paste your <strong>Google Site Verification</strong> code below to verify ownership of <code>jutaasia-residence.com</code>. 
                    You can paste either the full metadata HTML strip (e.g. <code>&lt;meta name="google-site-verification" content="xxxxxxxx" /&gt;</code>) or just the verification token code itself (e.g. <code>xxxxxxxx</code>). 
                    Our server dynamically parses the token and injects it live into the homepage head.
                  </p>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider font-mono">Verification Code / Meta Tag</label>
                    <textarea
                      placeholder='e.g. google-site-verification=FsdWdf32fse_rSgWErfg... or copy the entire <meta ... /> tag from Search Console'
                      value={googleCode}
                      onChange={(e) => setGoogleCode(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 focus:border-amber-500 outline-none transition-all placeholder:text-slate-650 placeholder:text-slate-600"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleSaveSeoSettings}
                      disabled={isSavingSeo}
                      className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      <Save size={14} />
                      <span>{isSavingSeo ? "Saving Config..." : "Apply Verification Code"}</span>
                    </button>
                    {seoSuccess && (
                      <span className="text-xs font-bold text-emerald-400 animate-pulse bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-sans">
                        Saved successfully! Verification is live now.
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. SEO & AI Engine Dynamic Index Info */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Settings size={18} />
                    <h3 className="text-sm font-bold uppercase tracking-wider font-mono">AISEO / AEO / GEO Indexing Assets</h3>
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    These optimization assets are dynamically served by the Node server to provide ultimate rankings across traditional Google Search, Generative Search Overviews (GEO), and Answer Engine models (e.g. Perplexity, ChatGPT Search, Gemini):
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1">
                        <span className="text-xs font-bold font-mono text-slate-200">Robots Directives</span>
                        <a href="/robots.txt" target="_blank" rel="noreferrer" className="text-[10px] text-amber-500 hover:underline hover:text-amber-400 font-mono">/robots.txt</a>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal font-sans">
                        Authorises search engines and modern AI crawlers (like Google-Extended, ClaudeBot, and GPTBot) to scan project sizing, coordinates, and prices.
                      </p>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1">
                        <span className="text-xs font-bold font-mono text-slate-200">XML Search Sitemap</span>
                        <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-[10px] text-amber-500 hover:underline hover:text-amber-400 font-mono">/sitemap.xml</a>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal font-sans">
                        Tells search bots exactly which domain URL boundaries are available. Ready for submission inside Google Search Console dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Helpful instructions for GSC */}
                <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-3 font-sans">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">Google Search Console Quick Check:</h4>
                  <ul className="list-decimal list-inside text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
                    <li>Log into your <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-amber-500 hover:underline">Google Search Console Dashboard</a>.</li>
                    <li>Add the domain name <code>jutaasia-residence.com</code> as a URL Prefix property.</li>
                    <li>Choose the <strong>HTML Tag</strong> verification method.</li>
                    <li>Copy the code they provide and paste it in the box above, then click <strong>Apply Verification Code</strong>.</li>
                    <li>Click <strong>Verify</strong> in Google Search Console details — ownership will unlock immediately!</li>
                  </ul>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Footer bar informational */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-slate-500 text-[11px] font-mono">
          Security: Leads are fully compliant with pdpa rules. Powered live by the AI studio Express Leads database engine.
        </div>

      </div>
    </div>
  );
}
