
import React from 'react';
import { Advertisement } from '../types';

interface AdSpotlightProps {
  ads: Advertisement[];
}

const AdSpotlight: React.FC<AdSpotlightProps> = ({ ads }) => {
  if (ads.length === 0) return null;

  return (
    <div className="mb-12 animate-slide-up">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Featured Stays</h3>
        </div>
        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full">
          Sponsored
        </span>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x snap-mandatory">
        {ads.map((ad, idx) => (
          <div 
            key={idx}
            className="snap-center shrink-0 w-[300px] sm:w-[400px] group relative bg-white rounded-[2.5rem] p-6 border border-emerald-100 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)] transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* Visual Flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-125 duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < ad.rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 leading-tight">{ad.name}</h4>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{ad.tagline}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl">
                   <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">{ad.location}</span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Starting from</p>
                   <p className="text-lg font-black text-slate-900">{ad.priceRange}</p>
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-200">
                  Book Tour
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdSpotlight;
