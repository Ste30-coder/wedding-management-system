import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  ArrowLeft,
  Phone,
  Mail
} from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';
import { useGuests } from '../hooks/useGuests';
import { useNavigate } from 'react-router-dom';
import AddGuestModal from '../components/AddGuestModal';

const GuestManagementPage: React.FC = () => {
  const { activeSide } = useWeddingStore();
  const { guests, fetchGuests, loading } = useGuests();
  const isBride = activeSide === 'BRIDE';
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, [activeSide]);

  const filteredGuests = (guests || []).filter(guest => 
    guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (guest.relationship || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all hover:scale-105 shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Guest Management
              </h1>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                Manage all guests from {activeSide.toLowerCase()}'s side
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className={`py-4 px-8 rounded-2xl flex items-center justify-center gap-3 font-black text-white text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
              isBride ? 'bg-pink-600 shadow-pink-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
            }`}
          >
            <Plus size={20} /> Add New Guest
          </button>
        </div>

        {/* Search & Filter Section */}
        <div className="flex items-center gap-4">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or relationship..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all shadow-sm hover:scale-105 active:scale-95">
            <Filter size={20} />
          </button>
        </div>

        {/* Guest List Card */}
        <div className="premium-card !p-0 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Users size={18} className="text-muted-foreground" />
               <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                 {filteredGuests.length} Guests Total
               </span>
            </div>
          </div>

          {loading ? (
            <div className="p-20 text-center text-muted-foreground font-black animate-pulse uppercase tracking-widest text-sm">
              Loading Guests...
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground font-medium uppercase tracking-widest text-xs">
              No guests found matching your search
            </div>
          ) : (
            <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
              {filteredGuests.map((guest, idx) => (
                <motion.div 
                  key={guest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="flex items-center justify-between p-6 hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transition-all group-hover:scale-110 group-hover:rotate-3 ${
                       isBride ? 'bg-pink-100 text-pink-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {guest.fullName[0]}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 dark:text-slate-100 text-lg leading-tight mb-1">{guest.fullName}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-muted-foreground font-bold flex items-center gap-1.5 uppercase tracking-wide px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                          <Users size={12} /> {guest.relationship || 'Friend'}
                        </span>
                        <div className="flex items-center gap-4 ml-2">
                           <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 uppercase tracking-wide">
                             <Phone size={10} /> {guest.phoneNumber}
                           </span>
                           {guest.email && (
                             <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 uppercase tracking-wide">
                               <Mail size={10} /> {guest.email}
                             </span>
                           )}
                        </div>
                      </div>
                      {guest.tags && guest.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                           {guest.tags.map((tag: string) => (
                             <span key={tag} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                               #{tag}
                             </span>
                           ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm border ${
                      guest.invitationSent ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                    }`}>
                      {guest.invitationSent ? 'Invited' : 'Pending'}
                    </div>
                    <button className="p-2.5 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:scale-110 active:scale-90">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddGuestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => fetchGuests()} 
      />
    </DashboardLayout>
  );
};

export default GuestManagementPage;
