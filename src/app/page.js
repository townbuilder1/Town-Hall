'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const ButtonLoader = () => (
  <svg className="animate-spin h-3.5 w-3.5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isTrainModalOpen, setIsTrainModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'আসসালামু আলাইকুম! আপনাকে কীভাবে সাহায্য করতে পারি?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const categories = [
    { name: "জরুরি হেল্পলাইন", info: "হাসপাতাল, অ্যাম্বুলেন্স, পুলিশ, ফায়ার সার্ভিস", isLink: true, href: "/emergency" },
    { name: "রক্তদাতা", info: "জরুরি রক্তের গ্রুপ ও ডোনারদের তথ্য", isLink: true, href: "/donors" },
    { name: "শপ ডিরেক্টরি", info: "রেস্টুরেন্ট ও শপ ডিরেক্টরি", isLink: true, href: "/shops" },
    { name: "ট্রেন শিডিউল", info: "ফেনী ট্রেনের সময়সূচী", isLink: false, action: () => setIsTrainModalOpen(true) },
  ];

  const hourlyForecast = [
    { time: '১০:০০ AM', temp: '৩০°C', icon: '🌧️', condition: 'বৃষ্টির সম্ভাবনা' },
    { time: '১১:০০ AM', temp: '৩১°C', icon: '⛅', condition: 'মেঘলা' },
    { time: '১২:০০ PM', temp: '৩২°C', icon: '☀️', condition: 'রোদ' },
    { time: '০১:০০ PM', temp: '৩৩°C', icon: '☀️', condition: 'রোদ' },
    { time: '০২:০০ PM', temp: '৩২°C', icon: '⛅', condition: 'মেঘলা' },
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
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || "সার্ভারে সাময়িক সমস্যা হচ্ছে।" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "সার্ভারে সাময়িক সমস্যা হচ্ছে।" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans transition-all duration-700 ease-out ${
      isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
    } ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                TH
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight block leading-none">TownHallBD</span>
                <span className="text-[10px] text-emerald-600 font-semibold tracking-wider">ফেনী লোকাল হাব</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
              <Link href="/" className="text-emerald-600 border-b-2 border-emerald-600 pb-1">হোম</Link>
              <Link href="/emergency" className={`${isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'} transition`}>জরুরি ডিরেক্টরি</Link>
              <Link href="/shops" className={`${isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'} transition`}>শপ ডিরেক্টরি</Link>
              <Link href="/places" className={`${isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'} transition`}>দর্শনীয় স্থান</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <>
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z"/></svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
                  <span>Dark</span>
                </>
              )}
            </button>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm">
              লগইন
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 space-y-6">
            
            <div className={`p-8 rounded-3xl border relative overflow-hidden transition ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
            }`}>
              <div className="max-w-md relative z-10">
                <h1 className={`text-2xl sm:text-3xl font-black leading-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ফেনী শহরের ডিজিটাল ডিরেক্টরি
                </h1>
                <p className={`text-xs sm:text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  জরুরি সেবা, রক্তদাতা, ট্রেন শিডিউল এবং শহরের প্রয়োজনীয় সকল তথ্য।
                </p>

                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-sm border border-slate-200">
                  <div className="pl-3 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="কী খুঁজছেন?" 
                    className="w-full text-xs text-slate-800 focus:outline-none px-2"
                  />
                  <button 
                    type="submit"
                    disabled={isSearching}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold px-5 py-2 rounded-lg transition shrink-0 flex items-center gap-2 min-w-[75px] justify-center"
                  >
                    {isSearching ? <ButtonLoader /> : "খুঁজুন"}
                  </button>
                </form>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat, idx) => {
                const Card = (
                  <div 
                    style={{ transitionDelay: `${idx * 100}ms` }}
                    className={`p-4 rounded-2xl border flex flex-col justify-between h-36 transition-all duration-500 transform ${
                      isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    } ${
                      isDark 
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200/80 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{cat.name}</h3>
                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cat.info}</p>
                    </div>
                    <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                      প্রবেশ করুন →
                    </span>
                  </div>
                );

                return cat.isLink ? (
                  <Link key={idx} href={cat.href}>{Card}</Link>
                ) : (
                  <div key={idx} onClick={cat.action} className="cursor-pointer">{Card}</div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-5 rounded-3xl border transition ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-0.5">আবহাওয়া পূর্বাভাস</h4>
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>ফেনী, বাংলাদেশ</h3>
                  </div>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    আজ
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">⛅</span>
                    <div>
                      <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>৩১°C</div>
                      <div className="text-[11px] text-slate-400">আংশিক মেঘলা</div>
                    </div>
                  </div>
                  <div className="text-right text-[11px] space-y-0.5 text-slate-500 dark:text-slate-400">
                    <div>অনুভূত: <span className="font-semibold text-slate-700 dark:text-slate-200">৩৫°C</span></div>
                    <div>আর্দ্রতা: <span className="font-semibold text-slate-700 dark:text-slate-200">৭৮%</span></div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-[10px] font-semibold text-slate-400 mb-2">প্রতি ঘণ্টার পূর্বাভাস</div>
                  <div className="flex justify-between items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {hourlyForecast.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col items-center p-1.5 rounded-xl border min-w-[58px] shrink-0 ${
                          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                        }`}
                      >
                        <span className="text-[9px] text-slate-400">{item.time}</span>
                        <span className="text-sm my-0.5">{item.icon}</span>
                        <span className={`text-[11px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.temp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">ফেনী ম্যাপ</h4>
                <div className="w-full h-full min-h-[160px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <iframe 
                    src="https://maps.google.com/maps?q=Feni&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                    className="w-full h-full border-0" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            
            <div className={`p-5 rounded-3xl border relative overflow-hidden transition ${
              isDark ? 'bg-slate-900 border-emerald-500/30' : 'bg-emerald-900 text-white border-emerald-800'
            }`}>
              <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                SPONSORED
              </span>
              <h3 className="text-base font-bold mb-1 text-white">আপনার বিজ্ঞাপন দিন</h3>
              <p className="text-xs text-slate-300 mb-4">ফেনী টাউন হলের মাধ্যমে আপনার ব্যবসার প্রচারণা বাড়ান।</p>
              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition">
                যোগাযোগ করুন
              </button>
            </div>

            <div className={`p-5 rounded-3xl border transition ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>দর্শনীয় স্থান</h3>
                <Link href="/places" className="text-xs text-emerald-600 font-semibold hover:underline">সব দেখুন</Link>
              </div>

              <div className="space-y-3">
                <div className={`p-2.5 rounded-xl border flex items-center gap-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 font-bold rounded-lg shrink-0 flex items-center justify-center text-xs">
                    MP
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>মুহুরী প্রজেক্ট</h4>
                    <p className="text-[10px] text-slate-400">ছাগলনাইয়া, ফেনী</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className={`border-t py-6 mt-12 transition ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Town Builder. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:underline">গোপনীয়তা নীতি</Link>
            <Link href="/terms" className="hover:underline">শর্তাবলী</Link>
            <Link href="/contact" className="hover:underline">যোগাযোগ</Link>
          </div>
        </div>
      </footer>

      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 z-50 group"
        aria-label="Toggle Assistant"
      >
        {isChatOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {isChatOpen && (
        <div className={`fixed bottom-22 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-[360px] h-[460px] border rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse"></div>
              <div>
                <h4 className="text-xs font-bold tracking-wider">TOWN HALL AI</h4>
                <p className="text-[10px] text-emerald-100 font-medium">Digital Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white text-xs font-bold">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-none' 
                    : isDark ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none' : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`text-xs rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-2 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                  <ButtonLoader />
                  <span>উত্তর তৈরি হচ্ছে...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className={`p-3 border-t flex gap-2 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="প্রশ্ন লিখুন..."
              className={`flex-1 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600 transition ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
            <button 
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow-sm flex items-center justify-center min-w-[60px]"
            >
              {isLoading ? <ButtonLoader /> : "Send"}
            </button>
          </form>
        </div>
      )}

      {isTrainModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`border rounded-3xl w-full max-w-lg p-6 shadow-2xl relative ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ফেনী স্টেশন ট্রেনের সময়সূচী
              </h3>
              <button onClick={() => setIsTrainModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">বন্ধ করুন</button>
            </div>
            
            <div className="space-y-2.5">
              <div className={`p-3 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>সোনার বাংলা এক্সপ্রেস (৭৮৭)</h4>
                  <p className="text-[11px] text-slate-400">ঢাকা ➔ চট্টগ্রাম | সময়: সকাল ১০:৪৫</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">মঙ্গলবার বন্ধ</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}