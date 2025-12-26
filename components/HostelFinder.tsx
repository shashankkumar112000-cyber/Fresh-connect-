
import React, { useState, useEffect } from 'react';
import { Hostel, Advertisement } from '../types';
import { fetchHostels } from '../services/geminiService';
import AdSpotlight from './AdSpotlight';

interface HostelFinderProps {
  university: string;
}

const HostelFinder: React.FC<HostelFinderProps> = ({ university }) => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulated Partner Ads
      const partnerAds: Advertisement[] = [
        {
          name: "Luxe Campus Suites",
          location: `0.5km from ${university}`,
          priceRange: "₹12,000 /mo",
          contact: "contact@luxecampus.com",
          description: "Premium fully-furnished student housing with rooftop cafe and gym.",
          tagline: "Premium Student Living",
          rating: 5,
          isPromoted: true
        },
        {
          name: "The Scholar's Den",
          location: `Walking distance to Campus`,
          priceRange: "₹8,500 /mo",
          contact: "hello@scholarsden.pg",
          description: "Academic-focused environment with 24/7 library and high-speed fiber.",
          tagline: "Study First Culture",
          rating: 4,
          isPromoted: true
        }
      ];
      setAds(partnerAds);

      const data = await fetchHostels(university);
      setHostels(data);
      setLoading(false);
    };
    loadData();
  }, [university]);

  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="flex items-center justify-between mb-10 px-2">
         <div className="p-5 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/80 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] leading-none mb-1.5">Housing Guide</h3>
            <p className="text-[10px] font-bold text-slate-400 opacity-80">Discover safe stays near {university}</p>
         </div>
         <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-emerald-50/50 rounded-full text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Fresh Verified
         </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-10">
        {/* Ad Space */}
        <AdSpotlight ads={ads} />

        {/* Dynamic Search Results */}
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Nearby Discoveries</h3>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
        </div>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-6">
             <div className="relative">
                <div className="absolute inset-0 bg-teal-100/30 blur-2xl rounded-full scale-150 animate-pulse"></div>
                <div className="relative w-10 h-10 border-[4px] border-teal-50 border-t-teal-500 rounded-full animate-spin"></div>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Searching Local Hubs...</p>
          </div>
        ) : hostels.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-12 bg-white/40 rounded-[3rem] border border-slate-100 shadow-sm">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
             </div>
             <p className="text-xs font-bold text-slate-900 tracking-wide uppercase">No listings found in this area.</p>
             <p className="text-[10px] text-slate-400 mt-2 font-medium">Our AI is still mapping this university district.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {hostels.map((hostel, idx) => (
              <div 
                key={idx} 
                className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)] hover:translate-y-[-4px] transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{hostel.name}</h4>
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{hostel.location}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 text-slate-900 text-[10px] font-black rounded-2xl uppercase tracking-widest whitespace-nowrap border border-slate-100">
                    {hostel.priceRange}
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 leading-relaxed font-medium mb-8">
                  {hostel.description}
                </p>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                   <div className="space-y-0.5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Verified Contact</p>
                      <p className="text-[11px] font-bold text-slate-900">{hostel.contact}</p>
                   </div>
                   <button className="p-3.5 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelFinder;
