import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Plus, 
  Rocket, 
  Send, 
  Hash, 
  Calendar, 
  User, 
  Link, 
  Smile, 
  Type, 
  Underline, 
  Bold, 
  Italic,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const CampaignsPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedSide, setSelectedSide] = useState('Both Sides');
  const [message, setMessage] = useState(`Namaste {{name}}! 🌸

We are delighted to invite you to the {{event_name}}. Your presence would mean the world to us as we begin this beautiful journey together.

Kindly RSVP using the link below:
{{rsvp_link}}

Warm Regards,
The Wedding Committee`);

  const dynamicVariables = [
    '{{name}}',
    '{{event_name}}',
    '{{rsvp_link}}',
    '{{event_date}}',
    '{{guest_count}}'
  ];

  const steps = [
    { number: 1, label: 'Target Audience', status: 'CURRENT STEP' },
    { number: 2, label: 'Event Selection', status: 'UPCOMING' },
    { number: 3, label: 'Message Content', status: 'UPCOMING' }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-[#3b0764] tracking-tight">Campaign Builder</h1>
          <div className="flex items-center gap-2 bg-[#F1F5F9] p-1 rounded-full border border-slate-200">
             <div className="w-8 h-8 rounded-full bg-[#3b0764] flex items-center justify-center text-white text-[10px] font-black">SF</div>
             <span className="text-xs font-bold text-slate-700 pr-3">SF_USER_2024</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Stepper & Selection */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            
            {/* Stepper Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
              {steps.map((s, idx) => (
                <div key={s.number} className="flex items-center gap-4 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black z-10 
                    ${s.number === step ? 'bg-[#3b0764] text-white shadow-lg shadow-indigo-900/30' : 'bg-slate-100 text-slate-400'}`}>
                    {s.number}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${s.number === step ? 'text-[#3b0764]' : 'text-slate-300'}`}>
                      {s.status}
                    </p>
                    <p className={`text-sm font-bold ${s.number === step ? 'text-slate-800' : 'text-slate-400'}`}>
                      {s.label}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-[-1.5rem] w-px bg-slate-100 -z-0" />
                  )}
                </div>
              ))}
            </div>

            {/* 1. Select Side Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4 tracking-tight">1. Select Side</h3>
              <div className="space-y-2">
                {['Both Sides', "Bride's Family", "Groom's Family"].map((side) => (
                  <button
                    key={side}
                    onClick={() => setSelectedSide(side)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all border
                      ${selectedSide === side 
                        ? 'bg-indigo-50 border-indigo-100 text-[#3b0764]' 
                        : 'bg-white border-transparent text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedSide === side ? 'border-[#3b0764]' : 'border-slate-200'}`}>
                      {selectedSide === side && <div className="w-2.5 h-2.5 bg-[#3b0764] rounded-full" />}
                    </div>
                    {side}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Event Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4 tracking-tight">2. Select Event</h3>
              <div className="relative group">
                <select className="w-full bg-[#F8FAFC] border border-slate-100 p-4 rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3b0764]/10 transition-all">
                  <option>Main Wedding Ceremony</option>
                  <option>Engagement Party</option>
                  <option>Reception</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                   <ChevronRight size={18} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Message Editor */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm min-h-[600px] flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Message Editor</h2>
                  <p className="text-xs text-slate-400 font-medium">Compose your WhatsApp invitation message</p>
                </div>
                <div className="bg-indigo-50 text-[#3b0764] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Draft Saved
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1 bg-[#F8FAFC] p-2 rounded-2xl border border-slate-50 mb-6">
                <button className="p-3 text-slate-500 hover:bg-white hover:text-slate-800 rounded-xl transition-all"><Bold size={18} /></button>
                <button className="p-3 text-slate-500 hover:bg-white hover:text-slate-800 rounded-xl transition-all"><Italic size={18} /></button>
                <button className="p-3 text-slate-500 hover:bg-white hover:text-slate-800 rounded-xl transition-all"><Link size={18} /></button>
                <div className="w-px h-6 bg-slate-200 mx-2" />
                <button className="p-3 text-slate-500 hover:bg-white hover:text-slate-800 rounded-xl transition-all"><Smile size={18} /></button>
              </div>

              {/* Text Area */}
              <textarea 
                className="flex-1 w-full bg-transparent text-slate-700 font-medium text-lg leading-loose resize-none focus:outline-none mb-8"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Start typing your message..."
              />

              {/* Dynamic Variables Pill Section */}
              <div className="pt-8 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Dynamic Variables (Click to Insert)</p>
                <div className="flex flex-wrap gap-2">
                  {dynamicVariables.map(v => (
                    <button 
                      key={v}
                      onClick={() => setMessage(prev => prev + ' ' + v)}
                      className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[11px] font-bold text-[#3b0764] hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                 <span className="text-sm font-bold text-slate-800">Ready to broadcast</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="px-8 py-4 border-2 border-slate-100 rounded-2xl text-sm font-black text-[#3b0764] hover:bg-slate-50 transition-all">
                  Send Test
                </button>
                <button className="px-10 py-4 bg-[#3b0764] text-white rounded-2xl text-sm font-black flex items-center gap-3 shadow-xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Rocket size={20} />
                  Launch Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CampaignsPage;
