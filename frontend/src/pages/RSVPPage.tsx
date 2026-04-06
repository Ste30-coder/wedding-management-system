import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Send
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const RSVPPage: React.FC = () => {
  const { id: _id } = useParams(); // Guest unique ID
  const [step, setStep] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative floral/bg elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl shadow-pink-900/5 overflow-hidden border border-white"
      >
        {/* Header Invitation Card */}
        <div className="bg-slate-900 p-10 text-center text-white relative">
           <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-indigo-600/20 opacity-40 shrink-0" />
           <div className="relative z-10">
             <Heart className="text-pink-400 fill-pink-400 mx-auto mb-4" size={32} />
             <h4 className="text-pink-400 font-bold uppercase tracking-widest text-[10px] mb-2">You are invited to the wedding of</h4>
             <h1 className="text-4xl font-serif tracking-tight mb-6">Priya & Arjun</h1>
             <div className="h-px bg-white/20 w-16 mx-auto mb-6" />
             <div className="flex flex-col gap-3 text-xs font-medium text-slate-300">
                <p className="flex items-center justify-center gap-2"><Calendar size={14} className="text-pink-400" /> Saturday, May 15, 2026</p>
                <p className="flex items-center justify-center gap-2"><MapPin size={14} className="text-pink-400" /> The Oberoi Grand, Kolkata</p>
             </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="p-10 pt-12 text-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Will you be attending?</h2>
                  <p className="text-slate-500 text-sm font-medium">Please let us know by April 20, 2026</p>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setAttending(true); setStep(2); }}
                    className="group relative flex items-center justify-between p-6 bg-white border-2 border-slate-100 rounded-3xl hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/5 transition-all text-left"
                  >
                    <div>
                      <span className="block text-lg font-black text-slate-900 mb-0.5">Joyfully Attend</span>
                      <span className="text-xs text-slate-400 font-medium tracking-wide leading-none">I'll be there to celebrate!</span>
                    </div>
                    <CheckCircle className="text-slate-100 group-hover:text-pink-500 transition-colors" size={32} strokeWidth={2.5} />
                  </button>

                  <button 
                    onClick={() => { setAttending(false); setStep(2); }}
                    className="group relative flex items-center justify-between p-6 bg-white border-2 border-slate-100 rounded-3xl hover:border-slate-300 transition-all text-left"
                  >
                    <div>
                      <span className="block text-lg font-black text-slate-900 mb-0.5">Regretfully Decline</span>
                      <span className="text-xs text-slate-400 font-medium tracking-wide leading-none">Sending love from afar</span>
                    </div>
                    <XCircle className="text-slate-100 group-hover:text-slate-400 transition-colors" size={32} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {attending ? (
                  <>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 mb-2">Wonderful!</h2>
                      <p className="text-slate-500 text-sm font-medium">How many guests in total?</p>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                      <button 
                        onClick={() => guestCount > 1 && setGuestCount(c => c - 1)}
                        className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold hover:bg-slate-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-5xl font-black text-slate-900 w-16">{guestCount}</span>
                      <button 
                        onClick={() => guestCount < 10 && setGuestCount(c => c + 1)}
                        className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold hover:bg-slate-200 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-5 bg-pink-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-500/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {loading ? 'Confirming...' : 'Confirm Attendance'}
                        <Send size={20} />
                      </button>
                      <button 
                        onClick={() => setStep(1)}
                        className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                      >
                        Go Back
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-10">
                      <h2 className="text-2xl font-black text-slate-900 mb-2">We'll miss you!</h2>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                        Thank you for letting us know. We appreciate your quick response.
                      </p>
                    </div>
                    <button 
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {loading ? 'Sending...' : 'Send Response'}
                      <Send size={20} />
                    </button>
                    <button 
                        onClick={() => setStep(1)}
                        className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                      >
                        Wait, I can attend!
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Response Received!</h2>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {attending 
                      ? `We can't wait to see you and ${guestCount - 1} others at the wedding!` 
                      : "We've sent your regrets to the couple. Thank you!"}
                  </p>
                </div>
                <div className="pt-6">
                   <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest text-center cursor-pointer hover:bg-indigo-100 transition-colors">
                     Add to my Calendar
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer brand */}
        <div className="p-6 text-center border-t border-slate-50">
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
             Powered by <Heart size={10} className="fill-slate-300" /> WeddingHub
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RSVPPage;
