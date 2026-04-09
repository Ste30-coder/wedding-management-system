import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
   Users,
   CheckCircle2,
   XCircle,
   Clock,
   Info,
   Download,
   Printer,
   MoreVertical,
   Send
} from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';

interface RSVPResponse {
   id: string;
   fullName: string;
   side: 'BRIDE' | 'GROOM';
   status: 'CONFIRMED' | 'DECLINED' | 'PENDING';
   headcount: string;
   avatar?: string;
}

const RSVPsDashboardPage: React.FC = () => {
   const { weddingId } = useWeddingStore();
   const [activities, setActivities] = useState<RSVPResponse[]>([]);

   useEffect(() => {
      // Simulated fetch or real fetch mapping
      const timer = setTimeout(() => {
         setActivities([
            { id: '1', fullName: 'Ananya Kapoor', side: 'BRIDE', status: 'CONFIRMED', headcount: '2 adults, 1 child' },
            { id: '2', fullName: 'Rohan Mehra', side: 'GROOM', status: 'CONFIRMED', headcount: '1 adult' },
            { id: '3', fullName: 'Vikram Malhotra', side: 'GROOM', status: 'DECLINED', headcount: '0' },
            { id: '4', fullName: 'Priya Sharma', side: 'BRIDE', status: 'PENDING', headcount: '4 (Expected)' },
         ]);
      }, 800);
      return () => clearTimeout(timer);
   }, [weddingId]);

   const metrics = [
      { label: 'CONFIRMED', value: '428', badge: '+12 today', badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <CheckCircle2 size={20} />, active: false },
      { label: 'DECLINED', value: '52', badge: '8.4% rate', badgeColor: 'bg-slate-50 text-slate-500 border-slate-100', icon: <XCircle size={20} />, active: false },
      { label: 'PENDING', value: '120', action: 'Send Reminders', actionColor: 'text-[#3b0764]', icon: <Clock size={20} />, active: false },
      { label: 'TOTAL HEADCOUNT', value: '548', subtext: 'Plates & Seating needed', icon: <Users size={20} />, active: true },
   ];

   return (
      <DashboardLayout>
         <div className="animate-fade-in space-y-10 pb-20">
            {/* Page Header */}
            <div>
               <h1 className="text-4xl font-bold text-slate-900 tracking-tight">RSVP Analytics</h1>
               <p className="text-slate-500 font-medium mt-1">Real-time breakdown of your guest confirmations and headcount requirements.</p>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {metrics.map((m, i) => (
                  <div key={i} className={`p-8 rounded-[2rem] border shadow-sm relative overflow-hidden transition-all ${m.active ? 'bg-[#3b0764] text-white border-transparent shadow-indigo-900/20' : 'bg-white border-[#eef2f6]'
                     }`}>
                     <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${m.active ? 'text-white/60' : 'text-slate-400'}`}>
                        {m.label}
                     </p>
                     <div className="flex items-end gap-3 mb-4">
                        <span className="text-[2.8rem] font-bold leading-none tracking-tight">{m.value}</span>
                        {m.badge && (
                           <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest mb-2 ${m.badgeColor}`}>
                              {m.badge}
                           </span>
                        )}
                     </div>
                     {m.subtext && <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">{m.subtext}</p>}
                     {m.action && (
                        <button className={`text-[11px] font-black uppercase tracking-[0.1em] hover:opacity-80 transition-opacity flex items-center gap-1.5 ${m.actionColor}`}>
                           <Send size={12} /> {m.action}
                        </button>
                     )}
                  </div>
               ))}
            </div>

            {/* Analytics Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Response Split (Center Circular Chart) */}
               <div className="lg:col-span-5 bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm flex flex-col items-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-8 self-start">Response Split</h3>
                  <div className="relative w-64 h-64 mb-10">
                     <svg className="w-full h-full transform -rotate-90">
                        <circle cx="128" cy="128" r="100" className="stroke-[#f1f5f9]" strokeWidth="28" fill="transparent" />
                        {/* Attending Piece */}
                        <circle cx="128" cy="128" r="100" className="stroke-[#3b0764]" strokeWidth="28" fill="transparent" strokeDasharray="628" strokeDashoffset="125.6" strokeLinecap="round" />
                        {/* Declined Piece */}
                        <circle cx="128" cy="128" r="100" className="stroke-[#f87171]" strokeWidth="28" fill="transparent" strokeDasharray="628" strokeDashoffset="580" strokeLinecap="round" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-4xl font-bold text-slate-900 leading-none">82%</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Response Rate</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#3b0764]" />
                        <span className="text-xs font-bold text-slate-600">Attending (428)</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <span className="text-xs font-bold text-slate-600">Declined (52)</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        <span className="text-xs font-bold text-slate-600">No Info (120)</span>
                     </div>
                  </div>
               </div>

               {/* Lineage Attendance Section */}
               <div className="lg:col-span-7 bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-bold text-slate-900">Lineage Attendance</h3>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-2 rounded-full bg-[#3b0764]" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bride Side</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-2 rounded-full bg-[#5b21b6]" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Groom Side</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-10 mt-4 flex-1">
                     {/* Bride Side */}
                     <div>
                        <div className="flex items-center justify-between mb-3 px-1">
                           <span className="text-sm font-bold text-slate-800 tracking-tight">Bride Side</span>
                           <span className="text-sm font-bold text-slate-900 tracking-tight">210 Guests</span>
                        </div>
                        <div className="h-6 w-full bg-slate-50 rounded-lg overflow-hidden flex relative">
                           <div className="h-full bg-[#3b0764] flex items-center px-4" style={{ width: '75%' }}>
                              <span className="text-[9px] font-black text-white/90 uppercase tracking-wider">CONFIRMED (158)</span>
                           </div>
                           <div className="h-full bg-[#3b0764]/20" style={{ width: '15%' }} />
                        </div>
                     </div>

                     {/* Groom Side */}
                     <div>
                        <div className="flex items-center justify-between mb-3 px-1">
                           <span className="text-sm font-bold text-slate-800 tracking-tight">Groom Side</span>
                           <span className="text-sm font-bold text-slate-900 tracking-tight">338 Guests</span>
                        </div>
                        <div className="h-6 w-full bg-slate-50 rounded-lg overflow-hidden flex relative">
                           <div className="h-full bg-[#5b21b6] flex items-center px-4" style={{ width: '82%' }}>
                              <span className="text-[9px] font-black text-white/90 uppercase tracking-wider">CONFIRMED (270)</span>
                           </div>
                           <div className="h-full bg-[#5b21b6]/20" style={{ width: '12%' }} />
                        </div>
                     </div>
                  </div>

                  {/* Info Insight Alert */}
                  <div className="mt-auto bg-indigo-50/50 p-5 rounded-2xl flex items-start gap-4 border border-indigo-100/50">
                     <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">
                        <Info size={20} />
                     </div>
                     <p className="text-xs font-medium text-slate-600 leading-relaxed">
                        The <span className="font-bold text-[#3b0764]">Groom Side</span> has a 12% higher confirmation rate currently. We suggest sending the second reminder wave to the Bride Side extended family by Friday.
                     </p>
                  </div>
               </div>
            </div>

            {/* Recent Responses Section */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-bold text-slate-900">Recent Responses</h3>
                  <div className="flex items-center gap-3">
                     <button className="flex items-center gap-2 px-6 py-3 bg-[#f1f5f9] text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all">
                        <Download size={16} /> Export CSV
                     </button>
                     <button className="flex items-center gap-2 px-6 py-3 bg-[#f1f5f9] text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all">
                        <Printer size={16} /> Print List
                     </button>
                  </div>
               </div>

               <table className="w-full">
                  <thead>
                     <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                        <th className="text-left pb-6 font-black pl-4">GUEST NAME</th>
                        <th className="text-left pb-6 font-black">SIDE</th>
                        <th className="text-left pb-6 font-black">RESPONSE</th>
                        <th className="text-left pb-6 font-black">HEADCOUNT</th>
                        <th className="text-center pb-6 font-black pr-4">ACTION</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {activities.map((row) => (
                        <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                           <td className="py-6 pl-4">
                              <div className="flex items-center gap-4">
                                 <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                    {row.avatar ? (
                                       <img src={row.avatar} alt={row.fullName} className="w-full h-full object-cover" />
                                    ) : (
                                       <div className={`w-full h-full flex items-center justify-center font-bold text-xs ${row.side === 'BRIDE' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'
                                          }`}>
                                          {row.fullName.split(' ').map(n => n[0]).join('')}
                                       </div>
                                    )}
                                 </div>
                                 <span className="text-sm font-bold text-slate-800">{row.fullName}</span>
                              </div>
                           </td>
                           <td className="py-6">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${row.side === 'BRIDE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                 }`}>
                                 {row.side} SIDE
                              </span>
                           </td>
                           <td className="py-6 text-sm font-medium">
                              <div className="flex items-center gap-2">
                                 <div className={`w-2 h-2 rounded-full ${row.status === 'CONFIRMED' ? 'bg-emerald-500' :
                                       row.status === 'DECLINED' ? 'bg-rose-500' : 'bg-slate-300'
                                    }`} />
                                 <span className={`text-[11px] font-bold ${row.status === 'CONFIRMED' ? 'text-slate-800' :
                                       row.status === 'DECLINED' ? 'text-rose-600' : 'text-slate-400'
                                    }`}>
                                    {row.status === 'CONFIRMED' ? 'Attending' :
                                       row.status === 'DECLINED' ? 'Declined' : 'Pending'}
                                 </span>
                              </div>
                           </td>
                           <td className="py-6 font-bold text-slate-800 text-sm">
                              {row.headcount}
                           </td>
                           <td className="py-6 text-center pr-4">
                              <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                 <MoreVertical size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               {/* Pagination */}
               <div className="flex items-center justify-between mt-10 px-4">
                  <span className="text-xs font-bold text-slate-400">Showing 4 of 548 guests</span>
                  <div className="flex items-center gap-2">
                     <button className="px-5 py-2.5 text-xs font-black text-slate-500 tracking-widest hover:text-slate-800 transition-colors">Previous</button>
                     <button className="px-5 py-2.5 text-xs font-black text-slate-800 tracking-widest hover:text-slate-700 transition-colors">Next</button>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
};

export default RSVPsDashboardPage;
