import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Send, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';
import api from '../api';

interface Campaign {
  id: string;
  name: string;
  templateName: string;
  status: 'DRAFT' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  launchedAt?: string;
  completedAt?: string;
}

const CampaignsPage: React.FC = () => {
  const { activeSide, weddingId, weddingName } = useWeddingStore();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const isBride = activeSide === 'BRIDE';

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/campaigns?weddingId=${weddingId}`);
      setCampaigns(res.data);
    } catch (err) {
      console.error('Failed to fetch campaigns', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weddingId) fetchCampaigns();
  }, [weddingId]);

  const handleLaunchBlast = async () => {
    if (!weddingId) return alert('No wedding selected!');
    const confirmed = confirm('🚀 Are you sure you want to BLAST invitations to all guests on this side?');
    if (!confirmed) return;
    
    try {
      const sideId = useWeddingStore.getState().sideId;
      // 1. Create the campaign draft
      const camp = await api.post('/campaigns', {
        weddingId,
        sideId: sideId || undefined,
        name: `Mass Invitation Blast - ${new Date().toLocaleDateString()}`,
        templateName: 'wedding_invitation_v1',
        variables: { weddingName }
      });
      // 2. Launch the blast!
      await api.post(`/campaigns/${camp.data.id}/launch`);
      alert('🔥 INVITATION BLAST ACTIVATED!');
      fetchCampaigns();
    } catch (err: any) {
      alert('FAILED: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Send className={isBride ? 'text-pink-600' : 'text-indigo-600'} size={24} />
              WhatsApp Campaigns
            </h2>
            <p className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-widest">
              Manage your guest invitations and updates
            </p>
          </div>
          
          <button 
            onClick={handleLaunchBlast}
            className={`px-6 py-3 rounded-2xl flex items-center gap-3 font-black text-white text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
              isBride ? 'bg-pink-600 shadow-pink-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
            }`}>
            <Plus size={20} /> Create New Blast
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="p-20 text-center text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-sm">
              Loading Campaigns...
            </div>
          ) : campaigns.length === 0 ? (
            <div className="premium-card p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                <Send size={32} />
              </div>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No campaigns found for this side</p>
            </div>
          ) : (
            campaigns.map((camp, idx) => (
              <motion.div 
                key={camp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 ${
                    camp.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' :
                    camp.status === 'FAILED' ? 'bg-rose-100 text-rose-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {camp.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : 
                     camp.status === 'FAILED' ? <AlertCircle size={24} /> : 
                     <Clock size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{camp.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                        <Calendar size={10} /> {new Date(camp.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        camp.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 
                        camp.status === 'FAILED' ? 'bg-rose-100 text-rose-700' : 
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {camp.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <button className="px-4 py-2 text-xs font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-widest">
                     View Reports
                   </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CampaignsPage;
