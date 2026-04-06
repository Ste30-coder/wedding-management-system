import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import GuestStats from '../components/GuestStats';
import AddGuestModal from '../components/AddGuestModal';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  Download,
  Plus,
  FileUp,
  Send,
  Pencil
} from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';
import { useDashboard } from '../hooks/useDashboard';
import { useNavigate } from 'react-router-dom';
import ImportGuestModal from '../components/ImportGuestModal';
import EditGuestModal from '../components/EditGuestModal';
import api from '../api';

const DashboardPage: React.FC = () => {
  const { activeSide } = useWeddingStore();
  const { activities, loading, refresh } = useDashboard();
  const navigate = useNavigate();
  const isBride = activeSide === 'BRIDE';

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-fade-in">
        <GuestStats />
        
        {/* ... previous grid content ... */}
        {/* Skipping most of the grid for the diff, but keeping the button section */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List Section */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Users className={isBride ? 'text-pink-600' : 'text-indigo-600'} size={20} />
                Recent Guest Activity
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search guests..."
                    className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <Filter size={18} className="text-slate-500" />
                </button>
              </div>
            </div>

            <div className="premium-card !p-0 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <div className="p-10 text-center text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Fetching Activity...</div>
              ) : activities.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground font-medium uppercase tracking-widest text-xs">No recent activity</div>
              ) : activities.map((guest, idx) => (
                <motion.div 
                  key={guest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex items-center justify-between p-4 hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform ${
                       isBride ? 'bg-pink-100 text-pink-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {guest.fullName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{guest.fullName}</h3>
                      <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 uppercase tracking-wide">
                        <Users size={12} /> {guest.group?.groupName || 'Unassigned'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                      guest.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                      guest.status === 'DECLINED' ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                      'bg-amber-100 text-amber-700 border-amber-200'
                    }`}>
                      {guest.status}
                    </div>
                    <button 
                      onClick={async () => {
                         const confirmed = confirm(`🚀 Send invitation now to ${guest.fullName}?`);
                         if (!confirmed) return;
                         
                         try {
                           const res = await api.post(`/messages/send-single`, { guestId: guest.id });
                           alert('✅ Invitation queued for: ' + guest.fullName);
                         } catch (err: any) {
                           alert('FAILED: ' + (err.response?.data?.message || err.message));
                         }
                      }}
                      className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors text-emerald-500 hover:text-emerald-700"
                    >
                      <Send size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        setEditingGuest(guest);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
              <button 
                onClick={() => navigate('/guests')}
                className="w-full py-4 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 group"
              >
                View All Guests <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Right Column Section */}
          <aside className="space-y-8">
            {/* Action Cards */}
            <div className="space-y-4">
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-white text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                   isBride ? 'bg-pink-600 shadow-pink-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
                 }`}>
                 <Plus size={20} /> Add New Guest
               </button>
               <button 
                 onClick={() => setIsImportModalOpen(true)}
                 className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                 <FileUp size={20} /> Import Guest List
               </button>
               <button 
                 onClick={async () => {
                   if (!useWeddingStore.getState().weddingId) return alert('No wedding selected!');
                   const confirmed = confirm('🚀 Are you sure you want to BLAST invitations to all guests on this side?');
                   if (!confirmed) return;
                   
                   try {
                     const weddingId = useWeddingStore.getState().weddingId;
                     const sideId = useWeddingStore.getState().sideId;
                     // 1. Create the campaign draft
                     const camp = await api.post('/campaigns', {
                       weddingId,
                       sideId: sideId || undefined,
                       name: `Mass Invitation Blast - ${new Date().toLocaleDateString()}`,
                       templateName: 'wedding_invitation_v1',
                       variables: { weddingName: useWeddingStore.getState().weddingName }
                     });
                     // 2. Launch the blast!
                     await api.post(`/campaigns/${camp.data.id}/launch`);
                     alert('🔥 INVITATION BLAST ACTIVATED! Your guests will receive messages shortly.');
                   } catch (err: any) {
                     alert('FAILED: ' + (err.response?.data?.message || err.message));
                   }
                 }}
                 className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-white text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                   isBride ? 'bg-pink-600 shadow-pink-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
                 }`}>
                 <Send size={20} /> Send Invitation Blast
               </button>
               <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black bg-slate-50 dark:bg-slate-950/50 text-slate-400 text-sm shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-800 cursor-not-allowed">
                 <Download size={20} /> Export Report
               </button>
            </div>

            {/* Event Summary Card */}
            <div className="premium-card space-y-6">
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-widest">Upcoming Event</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5">Sangeet Night</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 uppercase font-medium">May 15, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5">The Oberoi Grand</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 uppercase font-medium underline cursor-pointer">View Directions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5">7:00 PM onwards</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 uppercase font-medium">Arrival at 6:45 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AddGuestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => refresh()} 
      />

      <ImportGuestModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={() => refresh()}
      />

      <EditGuestModal
        guest={editingGuest}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => refresh()}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;

const ChevronRight: React.FC<{ size: number, className?: string }> = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
