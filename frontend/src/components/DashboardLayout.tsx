import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWeddingStore } from '../store/useWeddingStore';
import SideSwitcher from './SideSwitcher';
import { 
  Users, 
  Send, 
  MessageSquare, 
  Bell, 
  LayoutDashboard,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeSide, weddingName } = useWeddingStore();
  const navigate = useNavigate();

  // Get real user info from storage
  let user = { fullName: 'Guest User' };
  const userJson = localStorage.getItem('wedding_user');
  
  if (userJson && userJson !== 'undefined') {
    try {
      user = JSON.parse(userJson);
    } catch (e) {
      console.error('Failed to parse user storage', e);
    }
  }
  
  const initials = user.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);

  const isBride = activeSide === 'BRIDE';

  const handleLogout = () => {
    localStorage.removeItem('wedding_auth_token');
    localStorage.removeItem('wedding_user');
    localStorage.removeItem('wedding-storage'); // Clear persisted Zustand store (stale weddingId)
    navigate('/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Guest Management', path: '/guests' },
    { icon: <Send size={20} />, label: 'Campaigns', path: '/campaigns' },
    { icon: <MessageSquare size={20} />, label: 'RSVPs', path: '/rsvps' },
    { icon: <Bell size={20} />, label: 'Reminders', path: '/reminders' },
  ];

  const currentPath = window.location.pathname;

  const secondaryItems = [
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Support', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex transition-all duration-700">
      {/* Dynamic Background Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] ${
            isBride ? 'bg-pink-600' : 'bg-indigo-600'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${isBride ? '#db2777' : '#4f46e5'} 0%, transparent 40%), 
                             radial-gradient(circle at 80% 70%, ${isBride ? '#9d174d' : '#3730a3'} 0%, transparent 40%)`
          }}
        />
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-64 glass-effect border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 cursor-pointer ${
              isBride ? 'bg-pink-500 shadow-pink-500/20' : 'bg-indigo-500 shadow-indigo-500/20'
            }`} onClick={() => navigate('/dashboard')}>
              <Users className="text-white" size={24} />
            </div>
            <div className="cursor-pointer" onClick={() => navigate('/dashboard')}>
              <h1 className="font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight -mb-0.5">Wedding Hub</h1>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Premium SaaS</span>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                    isActive 
                      ? (isBride ? 'bg-pink-100/50 text-pink-700 shadow-sm' : 'bg-indigo-100/50 text-indigo-700 shadow-sm')
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <div className={`transition-colors ${isActive ? (isBride ? 'text-pink-600' : 'text-indigo-600') : 'group-hover:text-slate-700'}`}>
                    {item.icon}
                  </div>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-1">
          <div className="h-px bg-slate-200 dark:bg-slate-800 mb-6 mx-2" />
          {secondaryItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100 transition-all"
            >
              <div className="text-slate-400">{item.icon}</div>
              {item.label}
            </button>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all mt-4"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative z-20">
        <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 block">
              Dashboard Overview
            </span>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                {weddingName}
              </h1>
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                isBride ? 'bg-pink-100 text-pink-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                Live Event
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <SideSwitcher />
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
              <div className={`w-10 h-10 rounded-full ring-2 ring-white dark:ring-slate-900 flex items-center justify-center font-bold text-white shadow-md ${
                isBride ? 'bg-pink-500' : 'bg-indigo-500'
              }`}>
                {initials}
              </div>
              <div className="hidden lg:block text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">{user.fullName}</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">Wedding Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
