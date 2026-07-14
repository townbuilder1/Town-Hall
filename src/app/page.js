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
    { name: "জরুরি হেল্পলাইন", info: "হাসপাতাল, অ্যাম্বুলেন্স, police, ফায়ার সার্ভিস", icon: "📞", color: "text-rose-400", bg: "bg-rose-500/10", isLink: true, href: "/emergency" },
    { name: "লাইভ রক্তদাতা", info: "জরুরি রক্তের গ্রুপ ও ডোনার কন্টাক্ট লিস্ট", icon: "🩸", color: "text-red-400", bg: "bg-red-500/10", isLink: true, href: "/donors" },
    { name: "ফেনীর ট্রেনের সময়সূচী", info: "ঢাকা-চট্টগ্রাম রুটের আন্তঃনগর ট্রেনের শিডিউল", icon: "🚆", color: "text-amber-400", bg: "bg-amber-500/10", isLink: false, action: () => setIsTrainModalOpen(true) },
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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans relative">
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-emerald-400">TOWN HALL</span>
            <span className="text-[10px] text-slate-400 tracking-widest -mt-1 font-bold uppercase">ফেনী লোকাল হাব</span>
          </div>
          <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 font-medium">
            By Town Builder
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12 mt-4">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 bg-clip-text text-transparent mb-4">
            THE TOWN HALL
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            ফেনী শহরের নাগরিকদের জন্য একটি সমন্বিত ডিজিটাল ডিরেক্টরি। প্রয়োজনীয় লোকাল সেবা, যোগাযোগ এবং তথ্য এখন এক ক্লিকে।
          </p>
        </div>

        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-slate-850 to-slate-800 border border-dashed border-emerald-500/40 text-center cursor-pointer hover:border-emerald-400 transition shadow-lg">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full mb-2 inline-block">Sponsored</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-200">আপনার ব্যবসা বা প্রতিষ্ঠানের বিজ্ঞাপন দিন এখানে!</h2>
          <p className="text-slate-400 text-xs mt-1">ফেনী শহরের হাজারো মানুষের কাছে পৌঁছাতে আজই আমাদের সাথে যোগাযোগ করুন।</p>
        </div>

        <div className="mb-10 p-5 rounded-2xl bg-slate-850 border border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-3xl animate-pulse">
              🌤️
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded">লোকাল নোটিশ</span>
              <h3 className="text-base font-bold text-slate-200 mt-1">আজকের ফেনী শহরের আবহাওয়া</h3>
              <p className="text-slate-400 text-xs mt-0.5">আংশিক মেঘলা আকাশ, হালকা বাতাস ও ভ্যাপসা গরম থাকতে পারে। বৃষ্টিপাতের সম্ভাবনা ২০%।</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-center min-w-[120px]">
            <span className="text-2xl font-black text-cyan-400 block">32°C</span>
            <span className="text-[10px] text-slate-400 font-medium">রিয়েল-টাইম ফিল</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {categories.map((item, index) => {
            if (item.isLink) {
              return (
                <Link key={index} href={item.href} className="block">
                  <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 hover:bg-slate-800 transition cursor-pointer shadow-md h-full">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color} mb-3 font-bold text-lg`}>
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-slate-200 mb-1">{item.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.info}</p>
                  </div>
                </Link>
              );
            }

            return (
              <div key={index} onClick={item.action} className="bg-slate-850 border border-slate-800 rounded-2xl p-5 hover:bg-slate-800 transition cursor-pointer shadow-md">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color} mb-3 font-bold text-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">{item.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.info}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-200 mb-2 flex items-center gap-2"><span>🛍️</span> ফেনী শপ ডিরেক্টরি</h3>
              <p className="text-xs text-slate-400 mb-4">শহরের সেরা দোকান, রেস্টুরেন্ট এবং লোকাল ব্র্যান্ডগুলোর তালিকা।</p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 flex justify-between items-center">
                  <span className="text-xs font-semibold text-amber-400">🔥 Grand Restaurant (Featured)</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-bold">Open</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center opacity-60">
                  <span className="text-xs font-semibold text-slate-300">📱 Local Gadget Zone</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">Closed</span>
                </div>
              </div>
            </div>
            <button className="w-full text-center text-xs text-emerald-400 font-semibold bg-emerald-500/5 border border-emerald-500/20 py-2 rounded-xl mt-4 hover:bg-emerald-500/10 transition">সব দোকান দেখুন →</button>
          </div>

          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-200 mb-2 flex items-center gap-2"><span>🏛️</span> ইতিহাস ও দর্শনীয় স্থান</h3>
              <p className="text-xs text-slate-400 mb-4">ফেনীর গৌরবময় ইতিহাস, ঐতিহ্য এবং বিখ্যাত দর্শনীয় স্থানগুলোর মেগা গাইডলাইন।</p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                  🌊 মুহুরী প্রজেক্ট (সেচ ও বায়ু বিদ্যুৎ)
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                  🏰 শমশের গাজীর কেল্লা ও ঐতিহ্যবাহী মিষ্টি
                </div>
              </div>
            </div>
            <Link href="/places" className="block w-full text-center text-xs text-purple-400 font-semibold bg-purple-500/5 border border-purple-500/20 py-2 rounded-xl mt-4 hover:bg-purple-500/10 transition">
               সবগুলো স্থান ও খাবারের ইতিহাস দেখুন →
            </Link>
          </div>

          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-md">
            <h3 className="text-base font-bold text-slate-200 mb-2 flex items-center gap-2"><span>🗺️</span> ফেনী শহর লাইভ ম্যাপ</h3>
            <p className="text-xs text-slate-400 mb-4">গুগল ম্যাপের মাধ্যমে সরাসরি ফেনী শহরের অবস্থান দেখে নিন।</p>
            <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
              <iframe 
                src="https://maps.google.com/maps?q=Feni&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0 grayscale invert opacity-80" 
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
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-2xl shadow-2xl hover:scale-105 transition z-50 text-slate-950 font-bold"
      >
        {isChatOpen ? '✕' : '🤖'}
      </button>

      {/* CHAT WINDOW WINDOW */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-slate-850 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">ASSISTANT</h4>
              <p className="text-[10px] text-emerald-400 font-medium">Town Hall Assistant</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/40">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none' 
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 text-slate-400 text-xs rounded-2xl rounded-tl-none px-4 py-2.5 animate-pulse">
                  অ্যাসিস্ট্যান্ট টাইপ করছে...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="কিছু জিজ্ঞেস করুন..."
              className="flex-1 bg-slate-850 border border-slate-800 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* TRAIN MODAL */}
      {isTrainModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-850 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>🚆</span> ফেনী স্টেশন ট্রেনের সময়সূচী
              </h3>
              <button onClick={() => setIsTrainModalOpen(false)} className="text-slate-400 hover:text-slate-100 text-sm font-bold bg-slate-800 px-2.5 py-1 rounded-lg">বন্ধ করুন</button>
            </div>
            <p className="text-xs text-slate-400 mb-4">ফেনী স্টেশন দিয়ে যাতায়াতকারী প্রধান প্রধান আন্তঃনগর ট্রেনের তালিকা নিচে দেওয়া হলো। টিকিট কাটার জন্য সরাসরি রেলভয়ের অফিশিয়াল সাইট ভিジット করুন।</p>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">সোনার বাংলা এক্সপ্রেস (৭৮৭)</h4>
                  <p className="text-[11px] text-slate-400">ঢাকা থেকে চট্টগ্রাম | ফেনী পৌঁছায়: সকাল ১০:৪৫</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded font-bold">মঙ্গলবার বন্ধ</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">মহানগর গোধূলী (৭০৪)</h4>
                  <p className="text-[11px] text-slate-400">চট্টগ্রাম থেকে ঢাকা | ফেনী পৌঁছায়: বিকেল ০৪:১৫</p>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-bold">প্রতিদিন চলে</span>
              </div>
            </div>
            <a 
              href="https://eticket.railway.gov.bd" 
              target="_blank" 
              rel="noreferrer"
              className="block w-full text-center text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl mt-4 transition"
            >
              অনলাইনে টিকিট কাটুন (রেলওয়ে ওয়েবসাইট) →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}