
import React, { useState, useEffect } from 'react';
import { UserProfile, PeerGroup } from '../types';
import { storageService } from '../services/storageService';
import ChatRoom from './ChatRoom';
import HostelFinder from './HostelFinder';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentGroup, setCurrentGroup] = useState<PeerGroup | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'hostels'>('chat');

  useEffect(() => {
    refreshGroup();
  }, [user.id]);

  const refreshGroup = () => {
    const group = storageService.getCurrentGroup(user.id);
    setCurrentGroup(group);
  };

  const handleChangeGroup = () => {
    if (confirm("Would you like to explore a different peer circle?")) {
      storageService.changeGroup(user.id);
      refreshGroup();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-10 animate-fade-in relative">
      {/* Immersive Dynamic Navigation */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
        <nav className="p-2 glass-morphism border-white/60 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-between">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 px-6 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
              activeTab === 'chat' 
                ? 'bg-slate-900 text-white shadow-xl scale-[1.02]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Peer Chat
          </button>
          <button
            onClick={() => setActiveTab('hostels')}
            className={`flex-1 py-4 px-6 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
              activeTab === 'hostels' 
                ? 'bg-emerald-600 text-white shadow-xl scale-[1.02]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Fresh Stays
          </button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col pt-28 max-w-6xl mx-auto w-full">
        {/* Branding & User Reveal */}
        <div className="reveal flex flex-col md:flex-row items-center md:items-end justify-between mb-10 gap-6 px-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="w-20 h-20 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl flex items-center justify-center p-3 border border-white/80 transition-transform hover:rotate-3">
              <img src="logo.png" alt="FC" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">
                {activeTab === 'chat' ? 'Connected Circle' : 'Campus Living'}
              </h2>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {user.university} <span className="mx-1 text-slate-200">/</span> {user.branch}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/40 p-3 pr-4 rounded-[2rem] border border-white/60 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-700 font-black text-sm border border-white">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-black text-slate-900 leading-none">{user.name}</p>
              <button onClick={onLogout} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors mt-1">Sign Out</button>
            </div>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="reveal flex-1 glass-morphism rounded-[3.5rem] p-4 sm:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col relative">
          {/* Subtle logo watermark in corner */}
          <img src="logo.png" alt="" className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] pointer-events-none select-none" />
          
          <div className="flex-1 relative z-10 flex flex-col h-full">
            {activeTab === 'chat' ? (
              currentGroup ? (
                <ChatRoom 
                  group={currentGroup} 
                  user={user} 
                  onMessageSent={refreshGroup}
                  onChangeGroup={handleChangeGroup}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                     <div className="absolute inset-0 bg-emerald-100/30 blur-2xl rounded-full scale-150 animate-pulse"></div>
                     <div className="relative w-16 h-16 border-[5px] border-emerald-50 border-t-emerald-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Finding your people...</p>
                </div>
              )
            ) : (
              <HostelFinder university={user.university} />
            )}
          </div>
        </div>

        <footer className="py-12 flex flex-col items-center gap-4 opacity-30">
           <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-slate-300"></div>
              <img src="logo.png" alt="" className="w-6 h-6 grayscale" />
              <div className="h-[1px] w-12 bg-slate-300"></div>
           </div>
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-900">
             Fresh Connect • Admission Hub 2024
           </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
