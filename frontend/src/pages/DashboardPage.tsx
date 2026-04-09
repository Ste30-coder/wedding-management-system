import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import GuestStats from '../components/GuestStats';
import AddGuestModal from '../components/AddGuestModal';
import {
   Users,
   Plus,
   TrendingUp,
   Gem,
   MessageSquare
} from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';

const DashboardPage: React.FC = () => {
   const { stats, activities, loading, refresh } = useDashboard();
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
      <DashboardLayout>
         <div className="animate-fade-in space-y-10">
            {/* Header Section */}
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Event Overview</h1>
                  <p className="text-slate-500 font-medium mt-1">
                     Manage your digital guest experience for <span className="text-[#3b0764] font-bold">The Grand Celebration.</span>
                  </p>
               </div>
               <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-[#3b0764] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-indigo-900/20 active:scale-95 transition-all"
               >
                  <Plus size={20} /> Add Guest
               </button>
            </div>

            {/* Global Summary Stats */}
            <GuestStats />

            {/* Sides Split Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Bride Side Card */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-10 right-10 opacity-10">
                     <Gem size={80} className="text-[#3b0764]" />
                  </div>
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-12 h-12 rounded-2xl bg-[#3b0764] flex items-center justify-center text-white">
                        <Users size={24} />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-800">Bride Side</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-10 border-b border-slate-50 pb-10">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Invited</p>
                        <p className="text-2xl font-bold text-slate-800">{stats?.totalGuests || 0}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-[#10b981] uppercase tracking-widest mb-1.5">Confirmed</p>
                        <p className="text-2xl font-bold text-[#10b981]">{stats?.confirmedCount || 0}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-[#a855f7] uppercase tracking-widest mb-1.5">Pending</p>
                        <p className="text-2xl font-bold text-[#a855f7]">{stats?.pendingCount || 0}</p>
                     </div>
                  </div>
                  <div>
                     <div className="flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2.5">
                        <span>RSVP Progress</span>
                        <span className="text-slate-800 font-bold">{Math.round((stats?.confirmedCount || 0) / (stats?.totalGuests || 1) * 100)}%</span>
                     </div>
                     <div className="h-3 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#3b0764] rounded-full" style={{ width: `${Math.round((stats?.confirmedCount || 0) / (stats?.totalGuests || 1) * 100)}%` }} />
                     </div>
                  </div>
               </div>

               {/* Groom Side Card */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-10 right-10 opacity-10">
                     <TrendingUp size={80} className="text-[#facc15]" />
                  </div>
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-12 h-12 rounded-2xl bg-[#facc15] flex items-center justify-center text-white">
                        <Users size={24} />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-800">Groom Side</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-10 border-b border-slate-50 pb-10">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Invited</p>
                        <p className="text-2xl font-bold text-slate-800">0</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-[#10b981] uppercase tracking-widest mb-1.5">Confirmed</p>
                        <p className="text-2xl font-bold text-[#10b981]">0</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-[#f59e0b] uppercase tracking-widest mb-1.5">Pending</p>
                        <p className="text-2xl font-bold text-[#f59e0b]">0</p>
                     </div>
                  </div>
                  <div>
                     <div className="flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2.5">
                        <span>RSVP Progress</span>
                        <span className="text-slate-800 font-bold">0%</span>
                     </div>
                     <div className="h-3 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#facc15] rounded-full" style={{ width: '0%' }} />
                     </div>
                  </div>
               </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* RSVP Distribution */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">RSVP Distribution</h3>
                  <div className="flex items-center justify-around h-[300px]">
                     <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="96" cy="96" r="80" className="stroke-[#f1f5f9]" strokeWidth="24" fill="transparent" />
                           <circle cx="96" cy="96" r="80" className="stroke-[#3b0764]" strokeWidth="24" fill="transparent"
                              strokeDasharray="502.4"
                              strokeDashoffset={502.4 - (502.4 * (stats?.confirmedCount || 0) / (stats?.totalGuests || 1))}
                              strokeLinecap="round"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <p className="text-3xl font-bold text-slate-900 leading-none">{stats?.totalGuests || 0}</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#3b0764]" />
                              <span className="text-sm font-bold text-slate-500">Confirmed</span>
                           </div>
                           <span className="text-sm font-black text-slate-900 ml-auto">{Math.round((stats?.confirmedCount || 0) / (stats?.totalGuests || 1) * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                              <span className="text-sm font-bold text-slate-500">Declined</span>
                           </div>
                           <span className="text-sm font-black text-slate-900 ml-auto">{Math.round((stats?.declinedCount || 0) / (stats?.totalGuests || 1) * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#f1f5f9]" />
                              <span className="text-sm font-bold text-slate-500">Pending</span>
                           </div>
                           <span className="text-sm font-black text-slate-900 ml-auto">{Math.round((stats?.pendingCount || 0) / (stats?.totalGuests || 1) * 100)}%</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Response Trend */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-bold text-slate-900">Response Trend (7 Days)</h3>
                     <div className="px-2 py-1 bg-slate-100 rounded-md text-[9px] font-black text-slate-500 uppercase tracking-widest">REAL-TIME</div>
                  </div>
                  <div className="flex items-end justify-between h-[300px] px-4 pb-4">
                     {[10, 15, 25, 45, 35, 60, activities.length * 2].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 w-12 group">
                           <div className="w-full bg-[#3b0764] rounded-xl group-hover:bg-[#4c1d95] transition-all hover:scale-x-110" style={{ height: `${Math.min(h * 4, 300)}px`, opacity: 0.3 + (h / 100) }} />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Bottom Lists Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
               {/* Recent Responses */}
               <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-bold text-slate-900">Recent Responses (Live)</h3>
                     <button className="text-xs font-bold text-[#3b0764] hover:underline">View All</button>
                  </div>
                  <table className="w-full">
                     <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                           <th className="text-left pb-5 font-black">Guest Name</th>
                           <th className="text-left pb-5 font-black">Group</th>
                           <th className="text-left pb-5 font-black">Status</th>
                           <th className="text-left pb-5 font-black">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {loading ? (
                           [...Array(5)].map((_, i) => (
                              <tr key={i} className="animate-pulse">
                                 <td className="py-5 bg-slate-50 rounded-lg mb-2 h-10 w-full" colSpan={4} />
                              </tr>
                           ))
                        ) : activities.length === 0 ? (
                           <tr>
                              <td colSpan={4} className="py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No guest data found in project</td>
                           </tr>
                        ) : activities.slice(0, 8).map((guest) => (
                           <tr key={guest.id} className="group hover:bg-slate-50/50 transition-colors">
                              <td className="py-5">
                                 <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white bg-indigo-100 text-indigo-700`}>
                                       {guest.fullName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">{guest.fullName}</span>
                                 </div>
                              </td>
                              <td className="py-5 text-sm font-medium text-slate-500 italic">{guest.group?.groupName || 'No Group'}</td>
                              <td className="py-5">
                                 <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest
                                ${guest.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                       guest.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                          'bg-rose-50 text-rose-600 border-rose-100'}
                             `}>
                                    {guest.status}
                                 </span>
                              </td>
                              <td className="py-5 text-xs font-bold text-slate-400 font-mono">
                                 Live
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Event Timeline */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-[#eef2f6] shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Event Timeline</h3>
                  <div className="space-y-10 relative">
                     <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100" />

                     {[
                        { title: 'Mehendi Ceremony', date: 'DEC 14, 2024 • 04:00 PM', location: 'Poolside Garden • 240 Guests', color: 'bg-yellow-400' },
                        { title: 'Sangeet Night', date: 'DEC 15, 2024 • 07:00 PM', location: 'Royal Ballroom • 800 Guests', color: 'bg-[#3b0764]' },
                        { title: 'The Wedding Muhurat', date: 'DEC 16, 2024 • 10:00 AM', location: 'Main Mandap • 1,200 Guests', color: 'bg-slate-200' }
                     ].map((event, i) => (
                        <div key={i} className="relative pl-8">
                           <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full ring-4 ring-white ${event.color} z-10`} />
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{event.date}</p>
                              <h4 className="text-base font-bold text-slate-900 mb-1">{event.title}</h4>
                              <p className="text-[11px] text-slate-500 font-medium">{event.location}</p>
                           </div>
                        </div>
                     ))}

                     <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-xs font-bold text-slate-500 hover:border-[#3b0764] hover:text-[#3b0764] transition-all">
                        <Plus size={16} /> Schedule Event
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <AddGuestModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => refresh?.()}
         />

         {/* Floating Messenger Button */}
         <button className="fixed bottom-10 right-10 w-16 h-16 bg-[#3b0764] text-white rounded-2xl shadow-2xl shadow-indigo-900/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
            <MessageSquare size={28} />
         </button>
      </DashboardLayout>
   );
};

export default DashboardPage;
