import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Zap, 
  CheckCircle, 
  ChevronRight,
  Heart,
  Layout,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Heart className="text-white fill-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">WeddingHub</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 dark:text-slate-400">
          <a href="#features" className="hover:text-pink-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-pink-600 transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-pink-600 transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold text-slate-900 dark:text-white px-4 py-2 hover:bg-slate-200/50 dark:hover:bg-slate-900 rounded-xl transition-all">
            Login
          </Link>
          <Link to="/login" className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
            Create Wedding
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trusted by over 5,000+ Couples</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8"
        >
          Transform Your Guest List <br />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">Into a Seamless Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-12"
        >
          Automate RSVPs, manage family sides effortlessly, and send beautiful WhatsApp reminders. 
          The only wedding platform designed for large-scale celebrations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
            Start Your Free Trial <ChevronRight size={20} />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            Watch Demo
          </button>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 40 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.4 }}
           className="mt-20 relative w-full max-w-5xl group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
              alt="Dashboard Preview" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent flex items-center justify-center">
               <div className="w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                  <Zap size={32} fill="white" />
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-pink-500 uppercase tracking-widest mb-3">Premium Features</h2>
          <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Everything you need to stay organized</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Users className="text-pink-500" />, 
              title: "Dual Side Management", 
              desc: "Manage Bride and Groom guest lists separately with designated family members as managers." 
            },
            { 
              icon: <MessageSquare className="text-indigo-500" />, 
              title: "WhatsApp Automation", 
              desc: "Send unique RSVP links and automated reminders directly to guests via WhatsApp." 
            },
            { 
              icon: <Layout className="text-purple-500" />, 
              title: "Live RSVP Tracking", 
              desc: "Watch your guest count update in real-time with beautiful dashboards and analytics." 
            },
            { 
              icon: <Zap className="text-amber-500" />, 
              title: "Instant Check-in", 
              desc: "Digital guest list for the venue entry to ensure only invited guests join the celebration." 
            },
            { 
              icon: <Smartphone className="text-emerald-500" />, 
              title: "Mobile Friendly", 
              desc: "Manage everything on the go. Your guests can RSVP from any device in seconds." 
            },
            { 
              icon: <CheckCircle className="text-blue-500" />, 
              title: "Secure & Private", 
              desc: "Advanced encryption ensures your guest data and wedding details are always protected." 
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 px-8 max-w-5xl mx-auto">
        <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-indigo-600/20 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to start planning?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of happy couples who made their wedding planning stress-free with WeddingHub.
            </p>
            <Link to="/login" className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3">
              Get Started for Free <ChevronRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-200 dark:border-slate-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
           <Heart className="text-pink-500 fill-pink-500" size={16} />
           <span className="text-sm font-bold text-slate-900 dark:text-white">Made for your special day</span>
        </div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">&copy; 2026 WeddingHub Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
