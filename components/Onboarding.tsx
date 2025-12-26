
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onRegister: (profile: Omit<UserProfile, 'id' | 'joinedAt'>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    branch: '',
    isNewAdmission: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.university && formData.branch && formData.isNewAdmission) {
      onRegister(formData);
    } else if (!formData.isNewAdmission) {
      alert("Fresh Connect is exclusively for newly admitted students.");
    } else {
      alert("Please provide all details to start connecting.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="reveal glass-morphism w-full max-w-xl p-8 sm:p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center mb-12">
          <div className="animate-float mb-8">
            <div className="w-44 h-44 sm:w-56 sm:h-56 p-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/60 flex items-center justify-center transition-transform hover:scale-105 duration-500">
              <img 
                src="logo.png" 
                alt="Fresh Connect Logo" 
                className="w-full h-full object-contain drop-shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/10b981/ffffff?text=FC';
                }}
              />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-3 text-center">
            Fresh Connect
          </h1>
          <p className="text-emerald-600 font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] text-center">
            The Safe Space for Your New Chapter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid gap-4">
            <div className="relative group">
              <input
                type="text"
                required
                className="w-full px-7 py-5 bg-white/60 border border-slate-200/60 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-semibold"
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="relative group">
              <input
                type="text"
                required
                className="w-full px-7 py-5 bg-white/60 border border-slate-200/60 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-semibold"
                placeholder="University"
                value={formData.university}
                onChange={e => setFormData({ ...formData, university: e.target.value })}
              />
            </div>

            <div className="relative group">
              <input
                type="text"
                required
                className="w-full px-7 py-5 bg-white/60 border border-slate-200/60 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-300 text-slate-900 font-semibold"
                placeholder="Branch / Major"
                value={formData.branch}
                onChange={e => setFormData({ ...formData, branch: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white/40 border border-white/60 rounded-[2rem]">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="admission-check"
                className="w-6 h-6 rounded-lg border-slate-200 text-emerald-600 focus:ring-emerald-500/20 transition-all cursor-pointer accent-emerald-500"
                checked={formData.isNewAdmission}
                onChange={e => setFormData({ ...formData, isNewAdmission: e.target.checked })}
              />
            </div>
            <label htmlFor="admission-check" className="text-[11px] font-bold text-slate-600 leading-relaxed cursor-pointer select-none">
              I certify that I am a newly admitted student for the upcoming session.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-6 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-[0.25em] text-xs rounded-3xl shadow-2xl shadow-slate-200 hover:translate-y-[-4px] transition-all active:scale-[0.98]"
          >
            Start Your Journey
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-200/30 flex justify-center items-center gap-8 opacity-40">
           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Private</div>
           <div className="w-1 h-1 rounded-full bg-slate-300"></div>
           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified</div>
           <div className="w-1 h-1 rounded-full bg-slate-300"></div>
           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Peer-to-Peer</div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
