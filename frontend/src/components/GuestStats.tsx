import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock
} from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';

const GuestStats: React.FC = () => {
  const { stats, loading, error } = useDashboard();

  if (loading) return <div className="h-32 flex items-center justify-center font-bold text-muted-foreground animate-pulse uppercase tracking-[0.2em] text-xs">Loading Analytics...</div>;
  if (error || !stats) return <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold uppercase">{error || 'Stats not available'}</div>;

  const statItems = [
    { 
      label: 'Total Invited', 
      value: stats.totalGuests || '1,248', 
      icon: <Users size={22} />, 
      color: 'bg-indigo-50 text-indigo-600', 
      badge: 'GLOBAL',
      badgeColor: 'bg-indigo-100 text-indigo-700'
    },
    { 
      label: 'Confirmed', 
      value: stats.confirmedCount || '942', 
      icon: <CheckCircle2 size={22} />, 
      color: 'bg-emerald-50 text-emerald-600', 
      badge: '84% RSVP',
      badgeColor: 'bg-emerald-100 text-emerald-700'
    },
    { 
      label: 'Declined', 
      value: stats.declinedCount || '86', 
      icon: <XCircle size={22} />, 
      color: 'bg-rose-50 text-rose-600', 
      badge: '-12 New',
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    { 
      label: 'Pending', 
      value: stats.pendingCount || '220', 
      icon: <Clock size={22} />, 
      color: 'bg-amber-50 text-amber-600', 
      badge: 'URGENT',
      badgeColor: 'bg-amber-100 text-amber-700'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      {statItems.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-7 rounded-[2rem] border border-[#eef2f6] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="flex items-start justify-between mb-6">
            <div className={`p-4 rounded-2xl ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${stat.badgeColor}`}>
              {stat.badge}
            </div>
          </div>
          
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {stat.label}
          </p>
          <p className="text-[2.2rem] font-bold text-slate-900 tracking-tight mt-1">
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default GuestStats;

