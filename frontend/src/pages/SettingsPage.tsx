import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  MessageSquare, 
  FileText, 
  Users, 
  ShieldCheck, 
  UserCircle,
  Eye,
  Copy
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const navItems = [
    { icon: <MessageSquare size={20} />, label: 'WhatsApp API', active: true },
    { icon: <FileText size={20} />, label: 'Templates', active: false },
    { icon: <Users size={20} />, label: 'Team', active: false },
    { icon: <ShieldCheck size={20} />, label: 'Side Access', active: false },
    { icon: <UserCircle size={20} />, label: 'Account', active: false },
  ];

  const teamMembers = [
    { name: 'Riya Sharma', email: 'riya@family.com', role: 'BRIDESMAID', access: 'BRIDE SIDE', color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Rohan Mehta', email: 'rohan@groom.com', role: 'GROOMSMAN', access: 'GROOM SIDE', color: 'bg-amber-100 text-amber-700' },
    { name: 'Vikram Singh', email: 'vikram@concierge.io', role: 'PLANNER', access: 'FULL ACCESS', color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-12 pb-24">
        {/* Page Header */}
        <div>
          <h1 className="text-[2.5rem] font-bold text-slate-900 tracking-tight leading-none">Settings</h1>
          <p className="text-slate-500 text-lg font-medium mt-2">Configure your digital concierge and team access.</p>
        </div>

        <div className="flex gap-12 items-start">
          {/* Inner Navigation */}
          <nav className="w-64 space-y-2 flex-shrink-0">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                  item.active 
                    ? 'bg-white shadow-[0_4px_10px_rgba(59,7,100,0.08)] text-[#3b0764] ring-1 ring-slate-100' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`${item.active ? 'text-[#3b0764]' : 'text-slate-300'}`}>
                  {item.icon}
                </div>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Main Content Panels */}
          <div className="flex-1 space-y-10">
            {/* WhatsApp API Setup Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-[#eef2f6] shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                 <div>
                   <h2 className="text-2xl font-bold text-slate-800 tracking-tight">WhatsApp API Setup</h2>
                   <p className="text-slate-500 font-medium mt-1">Connect your business account to automate guest communications.</p>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Connected
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">API KEY</label>
                    <div className="relative group">
                       <input 
                         type="password" 
                         value="sk_live_51Mvw2S.................." 
                         readOnly
                         className="w-full pl-6 pr-14 py-4 bg-[#f8fafc] border-none rounded-2xl text-slate-900 font-medium text-lg focus:outline-none"
                       />
                       <button className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                          <Eye size={20} />
                       </button>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">WEBHOOK URL</label>
                    <div className="flex items-center gap-3">
                       <div className="flex-1 px-6 py-4 bg-[#f8fafc] border-none rounded-2xl text-slate-900 font-medium text-lg leading-none truncate">
                          https://api.shaadiflow.com/hooks/v1/wh_921029381
                       </div>
                       <button className="flex items-center gap-2 px-6 py-4 bg-slate-100/80 hover:bg-slate-200 transition-all text-slate-700 font-bold rounded-2xl">
                          <Copy size={18} /> Copy
                       </button>
                    </div>
                 </div>
              </div>
            </div>

            {/* Team Management Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-[#eef2f6] shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                 <div>
                   <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Team Management</h2>
                   <p className="text-slate-500 font-medium mt-1">Manage bridesmaids, groomsmen, and planning assistants.</p>
                 </div>
                 <button className="flex items-center gap-2 text-[#3b0764] font-bold hover:underline">
                    <Users size={18} /> Invite Member
                 </button>
              </div>

              <table className="w-full">
                 <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                       <th className="text-left pb-5 font-black">NAME</th>
                       <th className="text-left pb-5 font-black">ROLE</th>
                       <th className="text-left pb-5 font-black">SIDE ACCESS</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {teamMembers.map((member, i) => (
                       <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="py-5">
                             <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                   <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`} alt={member.name} />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800">{member.name}</p>
                                   <p className="text-[11px] text-slate-400 font-medium">{member.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="py-5">
                             <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                                {member.role}
                             </span>
                          </td>
                          <td className="py-5">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${member.color} bg-opacity-50`}>
                                {member.access}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-10 left-[280px] right-10 p-6 z-40">
           <div className="max-w-[1600px] mx-auto flex items-center justify-end gap-6">
              <span className="text-sm font-bold text-slate-400">Last saved 2 minutes ago</span>
              <button className="bg-[#3b0764] text-white px-12 py-5 rounded-[1.5rem] font-bold text-lg hover:shadow-2xl hover:shadow-indigo-900/30 active:scale-95 transition-all">
                 Save Changes
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
