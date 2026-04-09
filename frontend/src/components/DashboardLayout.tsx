import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWeddingStore } from '../store/useWeddingStore';
import {
  Users,
  Send,
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  Zap,
  Calendar,
  MessageSquare,
  PartyPopper
} from 'lucide-react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeSide, setActiveSide } = useWeddingStore();
  const navigate = useNavigate();
  const location = useLocation();

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

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Guests', path: '/guests' },
    { icon: <Send size={20} />, label: 'Campaigns', path: '/campaigns' },
    { icon: <MessageSquare size={20} />, label: 'RSVP Analytics', path: '/rsvps' },
    { icon: <Calendar size={20} />, label: 'Events', path: '/events' },
    { icon: <Zap size={20} />, label: 'Automations', path: '/automations' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] dark:bg-slate-950 flex font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white dark:bg-slate-900 border-r border-[#eef2f6] dark:border-slate-800 flex flex-col fixed h-full z-30">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <PartyPopper className="text-[#3b0764]" size={24} />
            </div>
            <div>
              <h1 className="font-extrabold text-[#3b0764] text-xl leading-tight">ShaadiFlow</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">The Digital Concierge</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all group ${isActive
                      ? 'bg-indigo-50 text-[#3b0764]'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    }`}
                >
                  <div className={`${isActive ? 'text-[#3b0764]' : 'text-slate-300 group-hover:text-slate-400'}`}>
                    {item.icon}
                  </div>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer - Profile Section */}
        <div className="mt-auto p-4">
          <div className="bg-[#f1f5f9] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3b0764] flex items-center justify-center text-xs font-black text-white">AK</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Ananya Kapoor</p>
              <p className="text-[10px] font-medium text-slate-400">Premium Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[280px]">
        {/* Header */}
        <header className="h-[100px] bg-white/80 backdrop-blur-md border-b border-[#eef2f6] px-10 flex items-center justify-between sticky top-0 z-20">
          {/* Side Switcher Pill */}
          <div className="flex bg-[#f1f5f9] p-1.5 rounded-full border border-slate-200">
            {['All', 'Bride Side', 'Groom Side'].map((tab) => {
              const isSelected = (tab === 'All' && !activeSide) || (tab === 'Bride Side' && activeSide === 'BRIDE') || (tab === 'Groom Side' && activeSide === 'GROOM');
              return (
                <button
                  key={tab}
                  onClick={() => {
                    if (tab === 'All') setActiveSide('BRIDE', ''); // Fallback for 'All'
                    else if (tab === 'Bride Side') setActiveSide('BRIDE', '');
                    else if (tab === 'Groom Side') setActiveSide('GROOM', '');
                  }}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${isSelected
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search & Profile */}
          <div className="flex items-center gap-8">
            <div className="relative group min-w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3b0764] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search guests..."
                className="w-full pl-12 pr-6 py-3 bg-[#f8fafc] border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3b0764]/10 focus:bg-white focus:border-[#3b0764]/20 transition-all text-sm font-medium text-slate-800"
              />
            </div>

            <div className="flex items-center gap-4 pl-8 border-l border-slate-200">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#facc15] flex items-center justify-center text-white font-bold shadow-lg shadow-yellow-500/10 border-2 border-white">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=facc15&color=fff&bold=true`}
                    className="w-full h-full rounded-full"
                    alt="User"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

