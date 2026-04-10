import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Plus, 
  Clock, 
  Heart, 
  Star, 
  Pencil, 
  Zap, 
  Hourglass, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

const AutomationsPage: React.FC = () => {
  const [flows, setFlows] = useState([
    {
      id: 1,
      title: 'Reminder after 2 days',
      subtitle: 'Sends to Pending Guests',
      icon: <Clock size={20} className="text-[#3b0764]" />,
      isActive: true,
      color: 'bg-indigo-50'
    },
    {
      id: 2,
      title: 'Post-event thank you',
      subtitle: 'Sends to Confirmed Guests',
      icon: <Heart size={20} className="text-[#3b0764]" />,
      isActive: true,
      color: 'bg-rose-50'
    },
    {
      id: 3,
      title: 'VIP Welcome Sequence',
      subtitle: 'Priority Concierge Line',
      icon: <Star size={20} className="text-[#3b0764]" />,
      isActive: false,
      color: 'bg-amber-50'
    }
  ]);

  const toggleFlow = (id: number) => {
    setFlows(flows.map(flow => 
      flow.id === id ? { ...flow, isActive: !flow.isActive } : flow
    ));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#3b0764] tracking-tight">Automations</h1>
            <p className="text-slate-500 font-medium mt-2">Coordinate your digital concierge workflows seamlessly.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-4 bg-[#3b0764] text-white rounded-2xl font-bold shadow-xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Plus size={20} />
            New Workflow
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Flow List & Stats */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-800">Active Flows</h2>
              <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                {flows.filter(f => f.isActive).length} Active
              </span>
            </div>

            <div className="space-y-4">
              {flows.map(flow => (
                <div key={flow.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#3b0764]/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`${flow.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                      {flow.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{flow.title}</h3>
                      <p className="text-xs text-slate-400 font-medium">{flow.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleFlow(flow.id)}
                      className={`w-12 h-6 rounded-full relative transition-colors p-1 ${flow.isActive ? 'bg-emerald-400' : 'bg-slate-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${flow.isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Efficiency Box */}
            <div className="bg-[#3b0764] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40 mt-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Efficiency Boost</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[240px]">
                  Automations saved 24 hours of manual follow-ups this week.
                </p>
                
                <div className="mt-8 flex items-end gap-3">
                  <span className="text-6xl font-black">98%</span>
                  <span className="text-sm font-bold mb-2 text-white/50 tracking-wider">RSVP SUCCESS RATE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workflow Visualization */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-[#f8fafc] rounded-[48px] border-4 border-white shadow-inner p-12 min-h-[700px] flex flex-col relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none rounded-[48px]" />
              
              <div className="relative z-10 flex flex-col items-center flex-1">
                {/* Visual Connector Line */}
                <div className="absolute w-px bg-slate-200 h-[80%] top-[10%] left-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="space-y-24 w-full max-w-md relative">
                  {/* Step 1: Trigger */}
                  <div className="relative transition-transform hover:scale-[1.02]">
                    <div className="absolute -left-2 top-0 bottom-0 w-1.5 bg-[#3b0764] rounded-full shadow-[0_0_15px_rgba(59,7,100,0.3)]" />
                    <div className="bg-white p-6 rounded-[28px] shadow-xl shadow-slate-200/50 flex gap-6 items-center border border-white">
                      <div className="w-14 h-14 bg-[#3b0764] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/20">
                        <Zap size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-[#3b0764] uppercase tracking-[0.2em]">Trigger</span>
                        <h4 className="text-lg font-bold text-slate-800">RSVP Pending</h4>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Condition */}
                  <div className="relative transition-transform hover:scale-[1.02]">
                    <div className="absolute -left-2 top-0 bottom-0 w-1.5 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
                    <div className="bg-white p-6 rounded-[28px] shadow-xl shadow-slate-200/50 flex gap-6 items-center border border-white">
                      <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Hourglass size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Condition</span>
                        <h4 className="text-lg font-bold text-slate-800">Time Elapse &gt; 3 days</h4>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Action */}
                  <div className="relative transition-transform hover:scale-[1.02]">
                    <div className="absolute -left-2 top-0 bottom-0 w-1.5 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
                    <div className="bg-white p-6 rounded-[28px] shadow-xl shadow-slate-200/50 flex flex-col gap-4 border border-white">
                      <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <MessageSquare size={24} className="text-white" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Action</span>
                          <h4 className="text-lg font-bold text-slate-800">Send WhatsApp Message</h4>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-[11px] font-medium text-slate-500 italic leading-relaxed">
                          "Hey &#123;guest_name&#125;! We missed your RSVP..."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex items-center justify-end gap-4 p-4">
                <button className="px-8 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors bg-slate-100 rounded-2xl">
                  Discard
                </button>
                <button className="px-10 py-4 bg-[#3b0764] text-white font-bold rounded-2xl shadow-xl shadow-indigo-900/20 hover:bg-[#2b054a] transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AutomationsPage;
