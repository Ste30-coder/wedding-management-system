import React from 'react';
import { motion } from 'framer-motion';
import { useWeddingStore } from '../store/useWeddingStore';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

import { useDashboard } from '../hooks/useDashboard';

const GuestStats: React.FC = () => {
  const { activeSide } = useWeddingStore();
  const { stats, loading, error } = useDashboard();
  const isBride = activeSide === 'BRIDE';

  if (loading) return <div className="h-32 flex items-center justify-center font-bold text-muted-foreground animate-pulse">Loading Analytics...</div>;
  if (error || !stats) return <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase">{error || 'Stats not available'}</div>;

  const statItems = [
    { label: 'Total Guests', value: stats.totalGuests, icon: <Users size={24} />, color: isBride ? 'text-pink-600' : 'text-indigo-600', trend: stats.trends.total, up: true },
    { label: 'Confirmed', value: stats.confirmedCount, icon: <CheckCircle2 size={24} />, color: 'text-emerald-600', trend: stats.trends.confirmed, up: true },
    { label: 'Declined', value: stats.declinedCount, icon: <XCircle size={24} />, color: 'text-rose-600', trend: stats.trends.declined, up: false },
    { label: 'Pending', value: stats.pendingCount, icon: <HelpCircle size={24} />, color: 'text-amber-600', trend: stats.trends.pending, up: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {statItems.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="premium-card relative group overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.05] group-hover:scale-150 transition-transform duration-700 ${
            isBride ? 'bg-pink-600' : 'bg-indigo-600'
          }`} />
          
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm ${stat.color}`}>
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${
              stat.up ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {stat.trend}
            </div>
          </div>
          
          <p className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {stat.value}
          </p>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default GuestStats;
