import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Plus, 
  MapPin, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Heart, 
  Map,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const EventsPage: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'The Grand Wedding',
      subtitle: 'The main ceremonial union',
      status: 'SCHEDULED',
      date: 'December 14, 2024',
      time: '06:00 PM onwards',
      location: 'Umaid Bhawan Palace',
      city: 'Jodhpur, Rajasthan',
      image: '/assets/grand_wedding.png',
      rsvpCount: 450,
      totalCount: 500,
      statusColor: 'bg-emerald-400',
    },
    {
      id: 2,
      title: 'Evening Reception',
      subtitle: 'Cocktails and Celebration',
      status: 'DRAFT',
      date: 'December 15, 2024',
      time: '08:00 PM onwards',
      location: 'Grand Ballroom, JW Marriott',
      city: 'Jaipur, India',
      image: '/assets/reception.png',
      rsvpCount: 320,
      totalCount: 600,
      statusColor: 'bg-indigo-400',
    },
    {
      id: 3,
      title: 'Sagaai Ceremony',
      subtitle: 'Traditional Engagement',
      status: 'COMPLETED',
      date: 'August 20, 2024',
      time: '10:00 AM onwards',
      location: 'Rose Garden Estate',
      city: 'New Delhi, India',
      image: '/assets/sagaai.png',
      rsvpCount: 184,
      totalCount: 200,
      statusColor: 'bg-slate-400',
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-[#3b0764] uppercase tracking-[0.2em] mb-1">Management Console</p>
            <h1 className="text-4xl font-extrabold text-[#3b0764] tracking-tight">Wedding Events</h1>
            <p className="text-slate-500 font-medium mt-2 max-w-xl">
              Orchestrate every moment of your journey with high-end precision and editorial grace.
            </p>
          </div>
          <button className="flex items-center gap-2 px-8 py-4 bg-[#3b0764] text-white rounded-2xl font-bold shadow-xl shadow-indigo-900/20 hover:scale-[1.02] transition-all">
            <Plus size={20} />
            Add Event
          </button>
        </div>

        {/* Global Tabs */}
        <div className="flex border-b border-slate-100">
           {['All Events', 'Upcoming', 'Past Events', 'Drafts'].map((tab, idx) => (
             <button key={tab} className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${idx === 0 ? 'border-[#3b0764] text-[#3b0764]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
               {tab}
             </button>
           ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col">
              {/* Image Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 left-6">
                  <span className={`${event.statusColor} text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg`}>
                    {event.status}
                  </span>
                </div>
                {event.status === 'COMPLETED' && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-[#3b0764]">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                )}
                {event.status === 'SCHEDULED' && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-rose-500">
                      <Heart size={20} fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-extrabold text-slate-800 leading-tight">{event.title}</h3>
                  <p className="text-sm text-slate-400 font-medium mt-1">{event.subtitle}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-[#3b0764] transition-colors">
                      <CalendarIcon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{event.date}</p>
                      <p className="text-[10px] font-bold text-slate-400">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-[#3b0764] transition-colors">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{event.location}</p>
                      <p className="text-[10px] font-bold text-slate-400">{event.city}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Footer */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 overflow-hidden shadow-sm`}>
                           <img src={`https://i.pravatar.cc/100?u=${event.id}-${i}`} alt="Avatar" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[8px] font-bold text-[#3b0764] shadow-sm">
                        +{event.rsvpCount - 3}
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">RSVP Count</p>
                      <p className="text-lg font-black text-[#3b0764]">
                        {event.rsvpCount} <span className="text-slate-300 text-sm">/ {event.totalCount}</span>
                      </p>
                   </div>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Milestone Card */}
          <button className="bg-slate-50/50 rounded-[40px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center py-20 px-10 group hover:bg-white hover:border-[#3b0764]/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all min-h-[500px]">
             <div className="w-16 h-16 rounded-full bg-indigo-100/50 flex items-center justify-center text-[#3b0764] group-hover:scale-110 transition-transform mb-6">
                <Plus size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-700 mb-2">Create New Milestone</h3>
             <p className="text-xs text-slate-400 font-medium text-center leading-relaxed">
               Add Mehendi, Sangeet, or <br/> Haldi ceremonies
             </p>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Logistics Hub */}
           <div className="lg:col-span-2 bg-[#F8FAFC] rounded-[48px] p-8 flex flex-col md:flex-row gap-8 items-center border border-white shadow-sm">
              <div className="w-full md:w-64 h-48 rounded-[32px] bg-slate-900 overflow-hidden shadow-2xl relative">
                  <img src="/assets/logistics.png" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                      <Map size={48} className="drop-shadow-lg" />
                  </div>
              </div>
              <div className="flex-1">
                 <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Venue Logistics Hub</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                    Coordinate multiple venues across Rajasthan. Automated guest navigation and digital maps are currently active for the Wedding and Reception events.
                 </p>
                 <div className="flex items-center gap-6">
                    <button className="text-[11px] font-black text-[#3b0764] uppercase tracking-widest flex items-center gap-2 group">
                      Manage Maps <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="text-[11px] font-black text-[#3b0764] uppercase tracking-widest flex items-center gap-2 group">
                      Vendor Access <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
           </div>

           {/* VIP Concierge Card */}
           <div className="bg-[#facc15] rounded-[48px] p-10 flex flex-col justify-between shadow-2xl shadow-yellow-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-black/5 group-hover:scale-110 transition-transform">
                 <ShieldCheck size={120} />
              </div>
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck size={24} className="text-slate-900" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">VIP Concierge</h3>
                 <p className="text-sm text-slate-900/60 font-bold leading-relaxed mb-8">
                    Prioritize RSVP approvals and transport for high-tier guests automatically.
                 </p>
              </div>
              <button className="w-full py-5 bg-white/20 backdrop-blur-md border border-white/20 rounded-3xl text-slate-900 text-sm font-black hover:bg-white/40 transition-all relative z-10">
                 Active (84 Guests)
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;
