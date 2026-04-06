import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';
import api from '../api';

interface RSVPResponse {
  id: string;
  guest: { fullName: string; phoneNumber: string };
  status: 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'MAYBE' | 'AMBIGUOUS';
  confirmedHeadcount: number;
  respondedAt?: string;
  rawResponse?: string;
}

const RSVPsDashboardPage: React.FC = () => {
  const { activeSide, weddingId } = useWeddingStore();
  const [rsvps, setRsvps] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const isBride = activeSide === 'BRIDE';

  const fetchRSVPs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/dashboard/activity?weddingId=${weddingId}&limit=100`);
      // Re-map dashboard activity to RSVP response format
      setRsvps(res.data);
    } catch (err) {
      console.error('Failed to fetch RSVPs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weddingId) fetchRSVPs();
  }, [weddingId]);

  const filteredRSVPs = rsvps.filter(r => 
    r.guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.guest.phoneNumber.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <MessageSquare className={isBride ? 'text-pink-600' : 'text-indigo-600'} size={24} />
              RSVP Tracking
            </h2>
            <p className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-widest">
              Review and manage guest confirmation statuses
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              className="pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-80 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="p-20 text-center text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-sm">
              Loading RSVPs...
            </div>
          ) : filteredRSVPs.length === 0 ? (
            <div className="premium-card p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                <Filter size={32} />
              </div>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No matching RSVPs found</p>
            </div>
          ) : (
            filteredRSVPs.map((rsvp, idx) => (
              <motion.div 
                key={rsvp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="premium-card flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform ${
                    isBride ? 'bg-pink-100 text-pink-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {rsvp.guest.fullName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{rsvp.guest.fullName}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                        <Users size={10} /> {rsvp.guest.phoneNumber}
                      </span>
                      {rsvp.respondedAt && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                           <Clock size={10} /> {new Date(rsvp.respondedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {rsvp.confirmedHeadcount > 0 && (
                    <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 shadow-inner">
                      Headcount: {rsvp.confirmedHeadcount}
                    </div>
                  )}
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                    rsvp.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                    rsvp.status === 'DECLINED' ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                    rsvp.status === 'AMBIGUOUS' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {rsvp.status}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RSVPsDashboardPage;
