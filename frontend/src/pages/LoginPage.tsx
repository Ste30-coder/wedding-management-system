import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles, LogIn, ChevronLeft, PartyPopper } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useWeddingStore } from '../store/useWeddingStore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user, wedding } = response.data;

      localStorage.setItem('wedding_auth_token', access_token);
      localStorage.setItem('wedding_user', JSON.stringify(user));

      if (wedding) {
        const { setWedding, setActiveSide } = useWeddingStore.getState();
        setWedding(
          wedding.id,
          wedding.name,
          wedding.sides?.bride || '',
          wedding.sides?.groom || ''
        );

        if (wedding.sides?.bride) {
          setActiveSide('BRIDE', wedding.sides.bride);
        }
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || 'Login failed. Check your data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Branding Side */}
      <div className="w-full md:w-[55%] bg-[#3b0764] relative overflow-hidden flex flex-col justify-between p-12 md:p-24 text-white min-h-[450px] md:min-h-screen">
        {/* Subtle Background Ornament */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none bg-center bg-no-repeat bg-cover scale-110"
          style={{ backgroundImage: `url('/wedding_login_bg.png')`, filter: 'brightness(0.6)' }}
        />

        {/* Logo Section */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <PartyPopper className="text-yellow-400" size={24} />
          </div>
          <span className="text-3xl font-bold tracking-tight">ShaadiFlow</span>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 max-w-2xl mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[5.5rem] font-bold leading-[1.1] tracking-tight"
          >
            The Digital <br />
            <span className="text-[#facc15]">Concierge</span> for Your <br />
            Special Day.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 mt-8 text-xl md:text-2xl max-w-lg font-medium leading-relaxed"
          >
            Manage your wedding guests effortlessly. From RSVPs to seating charts, orchestrate every detail with regal precision.
          </motion.p>
        </div>

        {/* Stats Card Overlay (Matches image exactly) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 mt-auto bg-white/10 backdrop-blur-xl border border-white/15 rounded-[2.5rem] p-7 max-w-md flex items-center gap-6 shadow-2xl"
        >
          <div className="flex -space-x-4 overflow-hidden">
            <img className="inline-block h-14 w-14 rounded-full ring-4 ring-[#3b0764] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="Avatar 1" />
            <img className="inline-block h-14 w-14 rounded-full ring-4 ring-[#3b0764] object-cover" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="Avatar 2" />
            <div className="h-14 w-14 rounded-full ring-4 ring-[#3b0764] bg-[#facc15] flex items-center justify-center text-[11px] font-black text-white uppercase italic">VIP</div>
          </div>
          <div>
            <p className="text-[1.3rem] font-bold">1,240 Guests Managed</p>
            <p className="text-[13px] text-white/50 uppercase tracking-[0.2em] font-bold mt-1">Trusted by elite planners worldwide</p>
          </div>
        </motion.div>
      </div>

      {/* Right Login Side */}
      <div className="w-full md:w-[45%] flex flex-col items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white rounded-[3.5rem] p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50"
        >
          <div className="mb-12">
            <h2 className="text-[2.5rem] font-bold text-slate-900 leading-tight">Welcome Back</h2>
            <p className="text-slate-500 text-lg font-medium mt-2">Continue managing your celebration.</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-3xl text-[11px] font-bold uppercase tracking-widest border border-rose-100 animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wide ml-1">Wedding Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3b0764] transition-colors" size={22} />
                <input
                  type="email"
                  placeholder="planner@wedding.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-[#f1f5f9] border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3b0764]/20 focus:bg-white transition-all text-slate-900 font-medium text-lg placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Secure Passkey</label>
                <button type="button" className="text-[11px] font-extrabold text-[#3b0764] hover:text-purple-950 transition-colors">Forgot Access?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3b0764] transition-colors" size={22} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-[#f1f5f9] border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3b0764]/20 focus:bg-white transition-all text-slate-900 font-medium text-lg placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-5 h-5 rounded-lg border-slate-300 text-[#3b0764] focus:ring-[#3b0764]/20"
              />
              <label htmlFor="remember" className="text-lg font-medium text-slate-500 cursor-pointer">Remember this device</label>
            </div>

            <button
              disabled={loading}
              className={`w-full py-6 rounded-3xl font-bold text-[1.4rem] shadow-[0_10px_20px_rgba(59,7,100,0.2)] hover:shadow-[0_15px_30px_rgba(59,7,100,0.3)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#3b0764] text-white'
                }`}>
              {loading ? 'Authenticating...' : (
                <>
                  Login <LogIn size={24} className="ml-1" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-6 text-slate-400 font-bold tracking-[0.3em]">OR</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-6 border-2 border-[#facc15]/50 rounded-3xl font-bold text-[1.4rem] text-slate-900 hover:bg-[#fefce8] hover:border-[#facc15] transition-all flex items-center justify-center gap-4"
          >
            <Sparkles className="text-[#facc15] fill-[#facc15]/10" size={24} />
            Create Wedding
          </button>

          <p className="text-center mt-12 text-lg font-medium text-slate-500">
            Need assistance? <button className="text-[#3b0764] hover:text-purple-800 font-bold underline underline-offset-4 decoration-2 decoration-[#3b0764]/20">Contact Concierge</button>
          </p>
        </motion.div>

        {/* Home Link for desktop (subtle) */}
        <Link to="/" className="mt-12 flex items-center gap-3 text-slate-400 hover:text-slate-600 transition-colors">
          <ChevronLeft size={20} />
          <span className="text-xs font-bold uppercase tracking-[0.2em] leading-none">Back to Website</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;


