import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Users, 
  Tag, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { useGuests } from '../hooks/useGuests';
import { useWeddingStore } from '../store/useWeddingStore';

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddGuestModal: React.FC<AddGuestModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { activeSide } = useWeddingStore();
  const { addGuest, loading, error } = useGuests();
  const isBride = activeSide === 'BRIDE';

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    relationship: 'Family',
    tags: [] as string[],
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addGuest(formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        relationship: 'Family',
        tags: [],
        notes: ''
      });
    } catch (err) {
      // Error handled in hook/displayed in UI
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className={`p-8 text-white relative ${isBride ? 'bg-pink-600' : 'bg-indigo-600'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <button 
                 onClick={onClose}
                 className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-black tracking-tight mb-1">Add New Guest</h2>
                <p className="text-white/70 text-sm font-medium uppercase tracking-widest">
                  Adding to {activeSide.toLowerCase()}'s side
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-shake">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isBride ? 'group-focus-within:text-pink-500' : 'group-focus-within:text-indigo-500'} text-slate-400`} size={20} />
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none transition-all text-slate-900 dark:text-white font-medium"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isBride ? 'group-focus-within:text-pink-500' : 'group-focus-within:text-indigo-500'} text-slate-400`} size={20} />
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none transition-all text-slate-900 dark:text-white font-medium"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email (Optional)</label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isBride ? 'group-focus-within:text-pink-500' : 'group-focus-within:text-indigo-500'} text-slate-400`} size={20} />
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none transition-all text-slate-900 dark:text-white font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {/* Relationship */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Relationship</label>
                  <div className="relative group">
                    <Users className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isBride ? 'group-focus-within:text-pink-500' : 'group-focus-within:text-indigo-500'} text-slate-400`} size={20} />
                    <select 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none appearance-none font-medium"
                      value={formData.relationship}
                      onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                    >
                      <option>Family</option>
                      <option>Friends</option>
                      <option>Relative</option>
                      <option>Colleagues</option>
                    </select>
                  </div>
                </div>

                {/* Tags (Simplified for now) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Guest Tags</label>
                  <div className="relative group">
                    <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isBride ? 'group-focus-within:text-pink-500' : 'group-focus-within:text-indigo-500'} text-slate-400`} size={20} />
                    <input 
                      type="text" 
                      placeholder="VIP, Outstation"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none transition-all text-slate-900 dark:text-white font-medium"
                      onKeyDown={(e) => {
                         if (e.key === 'Enter') {
                           e.preventDefault();
                           const target = e.target as HTMLInputElement;
                           if (target.value) {
                             setFormData({...formData, tags: [...formData.tags, target.value]});
                             target.value = '';
                           }
                         }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex gap-4">
                 <button 
                   type="button"
                   onClick={onClose}
                   className="flex-1 py-4 font-black uppercase tracking-widest text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
                 >
                   Cancel
                 </button>
                 <button 
                   type="submit"
                   disabled={loading}
                   className={`flex-[2] py-4 rounded-2xl font-black text-white text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                     isBride ? 'bg-pink-600 shadow-pink-600/20' : 'bg-indigo-600 shadow-indigo-600/20'
                   }`}
                 >
                   {loading ? 'Adding...' : (
                      <>
                        Confirm and Add <Plus size={18} strokeWidth={3} />
                      </>
                   )}
                 </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddGuestModal;
