
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, PeerGroup } from '../types';
import { storageService } from '../services/storageService';

interface ChatRoomProps {
  group: PeerGroup;
  user: UserProfile;
  onMessageSent: () => void;
  onChangeGroup: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ group, user, onMessageSent, onChangeGroup }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [group.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      storageService.sendMessage(group.id, {
        senderId: user.id,
        senderName: user.name,
        text: inputText.trim()
      });
      setInputText('');
      onMessageSent();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Group Status Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-4">
           <div className="flex -space-x-2">
             {group.members.slice(0, 3).map((m, i) => (
               <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-emerald-100 text-emerald-600' : i === 1 ? 'bg-teal-100 text-teal-600' : 'bg-green-100 text-green-600'}`}>
                 {m.slice(0, 1).toUpperCase()}
               </div>
             ))}
             {group.members.length > 3 && (
               <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                 +{group.members.length - 3}
               </div>
             )}
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/40">
             {group.members.length} peers connected
           </p>
        </div>
        <button 
          onClick={onChangeGroup}
          className="text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 bg-white border border-emerald-50 rounded-xl hover:bg-emerald-50 text-emerald-600 transition-all shadow-sm"
        >
          Shuffle Peers
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-6 px-2">
        {group.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
             <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
             </div>
             <p className="text-xs font-bold text-emerald-900 tracking-wide uppercase">Say hello to your new classmates</p>
          </div>
        ) : (
          group.messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.senderId === user.id ? 'items-end' : 'items-start'} animate-slide-up`}
            >
              <div className="max-w-[85%] sm:max-w-[70%]">
                <div className={`flex items-center gap-2 mb-1 px-2 ${msg.senderId === user.id ? 'justify-end' : ''}`}>
                   <span className="text-[9px] font-black text-emerald-900 uppercase tracking-widest opacity-30">
                     {msg.senderId === user.id ? 'You' : msg.senderName}
                   </span>
                   <span className="text-[8px] font-bold text-emerald-200">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
                <div 
                  className={`px-6 py-4 rounded-3xl text-sm font-semibold leading-relaxed shadow-sm transition-all hover:shadow-md ${
                    msg.senderId === user.id 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white text-emerald-950 rounded-tl-none border border-emerald-50'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Stunning Input Field */}
      <div className="pt-6 border-t border-emerald-50/50">
        <form onSubmit={handleSend} className="relative group">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full pl-6 pr-20 py-5 bg-white border border-emerald-100 rounded-[2rem] focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all shadow-sm placeholder:text-emerald-200 text-emerald-950 font-bold"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 top-2 bottom-2 px-8 bg-emerald-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-950 transition-all disabled:opacity-20 active:scale-95 shadow-lg shadow-emerald-900/20"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
