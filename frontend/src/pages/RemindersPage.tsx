import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Settings, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';

const RemindersPage: React.FC = () => {
  const { activeSide } = useWeddingStore();
  const isBride = activeSide === 'BRIDE';

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Bell className={isBride ? 'text-pink-600' : 'text-indigo-600'} size={24} />
              Automated Reminders
            </h2>
            <p className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-widest">
              Set and track follow-up schedules for non-responders
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Status Card */}
          <div className="premium-card space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-widest">Reminder Engine Status</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-tighter shadow-sm border border-emerald-200">
                <CheckCircle2 size={12} /> Live & Active
              </div>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                   isBride ? 'bg-pink-600 text-white' : 'bg-indigo-600 text-white'
                 }`}>
                   <Sparkles size={28} />
                 </div>
                 <div>
                   <h4 className="font-black text-lg text-slate-800 dark:text-slate-100">Smart Nudges Engaged</h4>
                   <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Automated Daily Scans at 10:00 AM</p>
                 </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "Our background engine is currently monitoring all pending invitations. Guests who haven't responded within your defined timeframe will receive a personalized follow-up automatically."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Reminders Sent</p>
                 <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">124</h4>
               </div>
               <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Nudge Success Rate</p>
                 <h4 className="text-2xl font-black text-emerald-600">32%</h4>
               </div>
            </div>
          </div>

          {/* Configuration Card */}
          <aside className="space-y-6">
            <div className="premium-card space-y-6">
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-widest flex items-center gap-2">
                <Settings size={16} /> Configuration
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Follow-up Days</label>
                   <div className="flex items-center gap-4">
                      <input type="range" min="1" max="7" defaultValue="3" className="w-full accent-primary h-2 rounded-full" />
                      <span className="font-black text-slate-800">3d</span>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Max Reminder Counts</label>
                   <select className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold">
                     <option>1 Reminder</option>
                     <option selected>2 Reminders</option>
                     <option>3 Reminders</option>
                   </select>
                </div>
                <button className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-white text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  isBride ? 'bg-pink-600 shadow-pink-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
                }`}>
                  Update Settings
                </button>
              </div>
            </div>

            <div className="premium-card bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 space-y-3">
               <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 font-bold text-xs uppercase tracking-widest">
                 <AlertCircle size={14} /> Safety Guard
               </div>
               <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 leading-relaxed">
                 We never send duplicate reminders within a 24-hour window to avoid being marked as spam by WhatsApp.
               </p>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RemindersPage;
