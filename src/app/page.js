'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isTrainModalOpen, setIsTrainModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'আসসালামু আলাইকুম! ফেনী টাউন হলের ডিজিটাল অ্যাসিস্ট্যান্টে আপনাকে স্বাগতম। আপনাকে কীভাবে সাহায্য করতে পারি?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const categories = [
    { name: "জরুরি হেল্পলাইন", info: "হাসপাতাল, অ্যাম্বুলেন্স, police, ফায়ার সার্ভিস", icon: "📞", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", isLink: true, href: "/emergency" },
    { name: "লাইভ রক্তদাতা", info: "জরুরি রক্তের গ্রুপ ও ডোনার কন্টাক্ট লিস্ট", icon: "🩸", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", isLink: true, href: "/donors" },
    { name: "ফেনীর ট্রেনের সময়সূচী", info: "ঢাকা-চট্টগ্রাম রুটের আন্তঃনগর ট্রেনের শিডিউল", icon: "🚆", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", isLink: false, action: () => setIsTrainModalOpen(true) },
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    let sessionId = localStorage.getItem("jarvis_session_id");
    if (!sessionId) {
      sessionId = "session_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("jarvis_session_id", sessionId);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, sessionId: sessionId })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || "Service Temporary Unavailable." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Service Temporary Unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans relative selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Background Subtle Glow Accent */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">TOWN HALL</span>
            <span className="text-[9px] text-slate-400 tracking-widest -mt-1 font-extrabold uppercase">ফেনী লোকাল হাব</span>
          </div>
          <span className="text-xs bg-slate-800/80 hover:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-slate-300 font-medium transition cursor-default">
            By Town Builder
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center mb-8 mt-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full mb-4 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ১০০% ডিজিটাল ফেনী সিটিকে লাইভ অভিজ্ঞতা দিন
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
            THE <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">TOWN HALL</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            ফেনী শহরের নাগরিকদের জন্য একটি সমন্বিত ডিজিটাল ডিরেক্টরি। প্রয়োজনীয় লোকাল সেবা, যোগাযোগ এবং তথ্য এখন এক ক্লিকে।
          </p>
        </div>

        {/* ==================== 🌟 PREMIUM AD SLOT 1: HERO BILLBOARD ==================== */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-emerald-950/30 border-2 border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 text-center relative overflow-hidden group shadow-2xl shadow-emerald-950/30">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl shadow-md tracking-wider">
            ⭐ PREMIUM AD SLOT
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          
          <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full mb-3 inline-block">
            High Priority Banner
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">আপনার ব্র্যান্ডের বড় প্রিমিয়াম বিজ্ঞাপন দিন এখানে!</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg mx-auto">ফেনী শহরের প্রতিদিনের হাজার হাজার ভিজিটরের সামনে সর্বপ্রথমে পৌঁছান।</p>
          
          <button className="mt-4 text-xs bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            প্রিমিয়াম স্লট বুক করুন →
          </button>
        </div>

        {/* LOCAL NOTICE & WEATHER */}
        <div className="mb-8 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🌤️
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">লোকাল নোটিশ</span>
              <h3 className="text-base font-bold text-slate-200 mt-1">আজকের ফেনী শহরের আবহাওয়া</h3>
              <p className="text-slate-400 text-xs mt-0.5">আংশিক মেঘলা আকাশ, হালকা বাতাস ও ভ্যাপসা গরম থাকতে পারে। বৃষ্টিপাতের সম্ভাবনা ২০%।</p>
            </div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 px-5 py-2.5 rounded-2xl text-center min-w-[120px] shadow-inner">
            <span className="text-2xl font-black text-cyan-400 block">32°C</span>
            <span className="text-[10px] text-slate-400 font-medium">রিয়েল-টাইম ফিল</span>
          </div>
        </div>

        {/* SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {categories.map((item, index) => {
            const CardContent = (
              <div className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 hover:bg-slate-850/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 h-full flex flex-col justify-between group">
                <div>
                  <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${item.bg} ${item.color} mb-4 font-bold text-xl group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mb-1 group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.info}</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <span>অ্যাক্সেস করুন</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );

            return item.isLink ? (
              <Link key={index} href={item.href} className="block">{CardContent}</Link>
            ) : (
              <div key={index} onClick={item.action}>{CardContent}</div>
            );
          })}
        </div>

        {/* ==================== 🔹 NORMAL AD SLOT 1: MID-PAGE BANNER ==================== */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-bold uppercase border border-slate-700">Normal Ad</span>
            <div>
              <h4 className="text-xs font-bold text-slate-200">লোকাল শপ বা ছোট প্রতিষ্ঠানের বিজ্ঞাপন স্পেস</h4>
              <p className="text-[11px] text-slate-400">সাধ্যের মধ্যে সেরা দামে ফেনীবাসীকে আপনার সেবা জানান।</p>
            </div>
          </div>
          <button className="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap">
            বিজ্ঞাপন রেট দেখুন →
          </button>
        </div>

        {/* DIRECTORY & MAP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Shop Directory */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700/80 transition-all">
            <div>
              <h3 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2"><span>🛍️</span> ফেনী শপ ডিরেক্টরি</h3>
              <p className="text-xs text-slate-400 mb-4">শহরের সেরা দোকান, রেস্টুরেন্ট এবং লোকাল ব্র্যান্ডগুলোর তালিকা।</p>
              
              <div className="space-y-2.5">
                
                {/* 🌟 PREMIUM AD IN-FEED (Featured Shop Slot) */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-slate-900 border border-amber-500/40 flex justify-between items-center relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-black uppercase">Featured</span>
                    <span className="text-xs font-bold text-amber-300">🔥 Grand Restaurant</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">Open</span>
                </div>

                {/* 🔹 NORMAL AD IN-FEED */}
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 flex justify-between items-center hover:border-slate-700 transition">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">Ad</span>
                    <span className="text-xs font-medium text-slate-300">আপনার শপ লিস্ট করুন</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold cursor-pointer">Add Shop</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 flex justify-between items-center opacity-60">
                  <span className="text-xs font-semibold text-slate-300">📱 Local Gadget Zone</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">Closed</span>
                </div>
              </div>
            </div>
            <button className="w-full text-center text-xs text-emerald-400 font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 py-2.5 rounded-xl mt-4 transition">
              সব দোকান দেখুন →
            </button>
          </div>

          {/* History Section */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700/80 transition-all">
            <div>
              <h3 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2"><span>🏛️</span> ইতিহাস ও দর্শনীয় স্থান</h3>
              <p className="text-xs text-slate-400 mb-4">ফেনীর গৌরবময় ইতিহাস, ঐতিহ্য এবং বিখ্যাত দর্শনীয় স্থানগুলোর মেগা গাইডলাইন।</p>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs text-slate-300 font-medium hover:border-slate-700 transition">
                  🌊 মুহুরী প্রজেক্ট (সেচ ও বায়ু বিদ্যুৎ)
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs text-slate-300 font-medium hover:border-slate-700 transition">
                  🏰 শমশের গাজীর কেল্লা ও ঐতিহ্যবাহী মিষ্টি
                </div>
              </div>
            </div>
            <Link href="/places" className="block w-full text-center text-xs text-purple-400 font-bold bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 py-2.5 rounded-xl mt-4 transition">
              সবগুলো স্থান ও খাবারের ইতিহাস দেখুন →
            </Link>
          </div>

          {/* Map Section */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-lg hover:border-slate-700/80 transition-all">
            <h3 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2"><span>🗺️</span> ফেনী শহর লাইভ ম্যাপ</h3>
            <p className="text-xs text-slate-400 mb-4">গুগল ম্যাপের মাধ্যমে সরাসরি ফেনী শহরের অবস্থান দেখে নিন।</p>
            <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-800 shadow-inner relative group">
              <iframe 
                src="https://maps.google.com/maps?q=Feni&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0 grayscale invert opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </main>

      {/* FLOATING CHATBOT TOGGLE BUTTON */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 flex items-center justify-center text-2xl shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 z-50 text-slate-950 font-bold"
      >
        {isChatOpen ? '✕' : '🤖'}
      </button>

      {/* CHAT WINDOW */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-[380px] h-[520px] bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fade-in">
          <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <h4 className="text-xs font-black tracking-wider text-white">TOWN HALL AI</h4>
                <p className="text-[10px] text-emerald-400 font-medium">Digital Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/30">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-500 text-slate-950 font-bold rounded-tr-none shadow-md shadow-emerald-500/10' 
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 border border-slate-700/60 text-slate-400 text-xs rounded-2xl rounded-tl-none px-4 py-2.5 animate-pulse">
                  অ্যাসিস্ট্যান্ট টাইপ করছে...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/80 flex gap-2">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="কিছু জিজ্ঞেস করুন..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-md active:scale-95"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* TRAIN MODAL */}
      {isTrainModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>🚆</span> ফেনী স্টেশন ট্রেনের সময়সূচী
              </h3>
              <button onClick={() => setIsTrainModalOpen(false)} className="text-slate-400 hover:text-slate-100 text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">বন্ধ করুন</button>
            </div>
            <p className="text-xs text-slate-400 mb-4">ফেনী স্টেশন দিয়ে যাতায়াতকারী প্রধান প্রধান আন্তঃনগর ট্রেনের তালিকা নিচে দেওয়া হলো।</p>
            
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">সোনার বাংলা এক্সপ্রেস (৭৮৭)</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">ঢাকা ➔ চট্টগ্রাম | ফেনী পৌঁছায়: সকাল ১০:৪৫</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-bold">মঙ্গলবার বন্ধ</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">মহানগর গোধূলী (৭০৪)</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">চট্টগ্রাম ➔ ঢাকা | ফেনী পৌঁছায়: বিকেল ০৪:১৫</p>
                </div>
                <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded-full font-bold">প্রতিদিন চলে</span>
              </div>
            </div>

            <a 
              href="https://eticket.railway.gov.bd" 
              target="_blank" 
              rel="noreferrer"
              className="block w-full text-center text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl mt-5 transition shadow-lg shadow-amber-500/10 active:scale-95"
            >
              অনলাইনে টিকিট কাটুন (রেলওয়ে ওয়েবসাইট) →
            </a>
          </div>
        </div>
      )}

    </div>
  );
}